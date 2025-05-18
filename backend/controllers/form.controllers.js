import puppeteer from 'puppeteer';
import { z } from 'zod';
import { generateAnswers } from '../services/generateAnswers.js';
import FORM from '../models/form.models.js';
import { autoFillFunction } from '../services/autoFillFunction.js';


// Define schema
const urlSchema = z.object({
    url: z.string().url("Invalid URL").min(1, "URL is required"),
});


export const extractQuestions = async (req, res) => {
    try {
        const { url } = req.body;

        const result = urlSchema.safeParse({ url });
        if (!result.success) {
            const errors = result.error.errors.map(e => e.message);
            return res.status(400).json({ success: false, message: 'Validation failed', errors });
        }

        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const questions = await page.$$eval('div[role="listitem"]', items => {
            // Helper to get the deepest non-empty text node in an element
            function getDeepText(node) {
                if (!node) return "";
                if (node.childNodes.length === 0) return node.textContent.trim();
                for (let child of node.childNodes) {
                    const text = getDeepText(child);
                    if (text) return text;
                }
                return "";
            }

            // Helper to extract option text from a radio/checkbox element
            function extractOptionText(optionDiv) {
                // Try ARIA label first (Google Forms sometimes uses this)
                if (optionDiv.getAttribute('aria-label')) {
                    return optionDiv.getAttribute('aria-label').trim();
                }
                // Try to find a visible span/div with text
                let text = '';
                const candidates = optionDiv.querySelectorAll('span, div, label');
                for (const el of candidates) {
                    const t = el.textContent.trim();
                    if (t.length > 0) {
                        text = t;
                        break;
                    }
                }
                // Fallback to deep text
                if (!text) text = getDeepText(optionDiv);
                return text;
            }

            return items.map(item => {
                const questionText = item.querySelector('div[role="heading"]')?.textContent?.trim() || 'Untitled Question';
                let type = 'unknown';
                let options = [];

                if (item.querySelector('table')) {
                    type = 'grid';
                }
                else if (
                    item.querySelectorAll('div[role="radio"]').length >= 3 &&
                    (item.innerHTML.includes('Least') || item.innerHTML.includes('Most'))
                ) {
                    type = 'linear_scale';
                    options = Array.from(item.querySelectorAll('div[role="radio"]')).map(extractOptionText).filter(Boolean);
                }
                else if (item.querySelector('div[role="radio"]')) {
                    type = 'multiple_choice';
                    options = Array.from(item.querySelectorAll('div[role="radio"]')).map(extractOptionText).filter(Boolean);
                }
                else if (item.querySelector('div[role="checkbox"]')) {
                    type = 'checkboxes';
                    options = Array.from(item.querySelectorAll('div[role="checkbox"]')).map(extractOptionText).filter(Boolean);
                }
                else if (item.querySelector('div[role="listbox"]')) {
                    type = 'dropdown';
                }
                else if (item.querySelector('textarea')) {
                    type = 'paragraph';
                }
                else if (item.querySelector('input[type="text"]') || item.querySelector('input[type="email"]')) {
                    type = 'short_answer';
                }
                else if (
                    item.querySelector('input[type="date"]') ||
                    (item.innerHTML.includes('MM') && item.innerHTML.includes('YYYY'))
                ) {
                    type = 'date';
                }
                else if (
                    item.querySelector('input[type="time"]') ||
                    item.innerHTML.includes('AM') || item.innerHTML.includes('PM')
                ) {
                    type = 'time';
                }

                return {
                    question: questionText,
                    type,
                    options,
                    answer: '', // placeholder for answer
                };
            });
        });


        await browser.close();
        const questionsWithAnswers = await generateAnswers(questions)

        await autoFillFunction(url, questionsWithAnswers)

        const isUrlFound = await FORM.findOne({ url: url })

        if (!isUrlFound) {
            const forms = await FORM.create({
                url,
                form: questionsWithAnswers,
                userId: '6825e638f191d7ff8c8dd72e'
            })
        } 

        return res.json({ success: true, message : "Form Filled SuccessFully",questions: questionsWithAnswers });
    } catch (error) {
        console.error("Error while extracting questions:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



