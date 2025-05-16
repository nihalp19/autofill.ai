import puppeteer from 'puppeteer';
import { z } from 'zod';
import { generateAnswers } from '../services/generateAnswers.js';
import FORM from '../models/form.models.js';
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
            return items.map(item => {
                const questionText = item.querySelector('div[role="heading"]')?.textContent?.trim() || 'Untitled Question';
                let type = 'unknown';
                let options = [];

                if (item.querySelector('input[type="text"]')) {
                    type = 'short_answer';
                }

                if (item.querySelector('textarea')) {
                    type = 'paragraph';
                }

                if (item.querySelector('div[role="radio"]')) {
                    type = 'multiple_choice';
                    options = Array.from(item.querySelectorAll('div[role="radio"]')).map(opt => opt.textContent.trim());
                }

                if (item.querySelector('div[role="checkbox"]')) {
                    type = 'checkboxes';
                    options = Array.from(item.querySelectorAll('div[role="checkbox"]')).map(opt => opt.textContent.trim());
                }

                if (item.querySelector('div[role="listbox"]')) {
                    type = 'dropdown';
                    options = Array.from(item.querySelectorAll('[role="option"]')).map(opt => opt.textContent.trim());
                }

                if (item.querySelector('input[type="date"]') || item.innerHTML.includes('MM') || item.innerHTML.includes('YYYY')) {
                    type = 'date';
                }

                if (item.querySelector('input[type="time"]') || item.innerHTML.includes('AM') || item.innerHTML.includes('PM')) {
                    type = 'time';
                }

                const radios = item.querySelectorAll('div[role="radio"]');
                const numericRadios = Array.from(radios).filter(r => /^\d+$/.test(r.textContent.trim()));
                if (numericRadios.length >= 3 && item.innerHTML.includes('Least') || item.innerHTML.includes('Most')) {
                    type = 'linear_scale';
                    options = numericRadios.map(r => r.textContent.trim());
                }

                if (item.querySelector('table')) {
                    type = 'grid';
                    options = []; // optional: parse rows/columns
                }

                return {
                    question: questionText,
                    type,
                    options,
                    answer: '', // placeholder
                };
            });
        });

        await browser.close();
        const questionsWithAnswers =  await generateAnswers(questions)

        const forms = await FORM.create({
            form : questionsWithAnswers,
            userId : '6825e638f191d7ff8c8dd72e'
        })


        return res.json({ success: true, questions: questionsWithAnswers});
    } catch (error) {
        console.error("Error while extracting questions:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



