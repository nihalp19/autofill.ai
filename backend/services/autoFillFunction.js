import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Configure Stealth Plugin
const stealth = StealthPlugin();
stealth.enabledEvasions.delete('iframe.contentWindow');
stealth.enabledEvasions.delete('media.codecs');
puppeteer.use(stealth);

export const autoFillFunction = async (url, questionsWithAnswers) => {
    // Launch browser with recommended flags
    const browser = await puppeteer.launch({
        headless: false, // set to 'new' for headless mode, but manual login is easier with false
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        userDataDir: 'C:/Users/NIHAL/AppData/Local/puppeteer_profile',
        args: [
            '--disable-blink-features=AutomationControlled',
            '--disable-infobars',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security'
        ],
        defaultViewport: null
    });

    const page = await browser.newPage();

    // Set a realistic user agent and remove webdriver property
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36');
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    // Go to Google login page for manual sign-in
    await page.goto('https://accounts.google.com', { waitUntil: 'networkidle2' });
    console.log('Please sign in manually in the opened browser window.');

    // Wait for user to complete login
    try {
        // Wait for Gmail/Google Account avatar as login confirmation
        await page.waitForSelector('a[href*="SignOutOptions"]', { timeout: 120000 });
        console.log('Login detected, continuing...');
    } catch {
        console.log('Timeout waiting for manual login, continuing anyway...');
    }

    // Go to the Google Form
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Helper: Random delay to mimic human behavior
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // Fill out the form
    const questionDivs = await page.$$('div[role="listitem"]');

    for (let i = 0; i < questionsWithAnswers.length; i++) {
        const q = questionsWithAnswers[i];
        const { type, answer } = q;
        const container = questionDivs[i];
        if (!container) continue;

        try {
            if (type === 'short_answer') {
                const input = await container.$('input[type="text"], input[type="email"]');
                if (input) {
                    await input.click({ clickCount: 3 });
                    await input.type(answer, { delay: 50 });
                }
            }

            if (type === 'paragraph') {
                const textarea = await container.$('textarea');
                if (textarea) {
                    await textarea.click({ clickCount: 3 });
                    await textarea.type(answer, { delay: 50 });
                }
            }

            if (type === 'multiple_choice') {
                await page.evaluate((idx, ans) => {
                    function getLabelText(el) {
                        // Prefer aria-label if present
                        if (el.getAttribute('aria-label')) return el.getAttribute('aria-label').trim();
                        // Otherwise, find deepest span/div with text
                        const candidates = el.querySelectorAll('span, div, label');
                        for (const c of candidates) {
                            const t = c.textContent.trim();
                            if (t.length > 0) return t;
                        }
                        return el.textContent.trim();
                    }
                    const containers = Array.from(document.querySelectorAll('div[role="listitem"]'));
                    const radios = containers[idx].querySelectorAll('div[role="radio"]');
                    const match = Array.from(radios).find(r => {
                        const label = getLabelText(r).toLowerCase();
                        return label === ans.toLowerCase() || label.includes(ans.toLowerCase()) || ans.toLowerCase().includes(label);
                    });
                    if (match) match.click();
                }, i, answer);
            }

            if (type === 'checkboxes') {
                await page.evaluate((idx, ans) => {
                    function getLabelText(el) {
                        if (el.getAttribute('aria-label')) return el.getAttribute('aria-label').trim();
                        const candidates = el.querySelectorAll('span, div, label');
                        for (const c of candidates) {
                            const t = c.textContent.trim();
                            if (t.length > 0) return t;
                        }
                        return el.textContent.trim();
                    }
                    const containers = Array.from(document.querySelectorAll('div[role="listitem"]'));
                    const checkboxes = containers[idx].querySelectorAll('div[role="checkbox"]');
                    Array.from(checkboxes).forEach(c => {
                        const label = getLabelText(c).toLowerCase();
                        if (Array.isArray(ans)) {
                            if (ans.some(a => label === a.toLowerCase() || label.includes(a.toLowerCase()) || a.toLowerCase().includes(label))) {
                                c.click();
                            }
                        } else {
                            if (label === ans.toLowerCase() || label.includes(ans.toLowerCase()) || ans.toLowerCase().includes(label)) {
                                c.click();
                            }
                        }
                    });
                }, i, answer);
            }

            if (type === 'dropdown') {
                const dropdown = await container.$('[role="listbox"]');
                if (dropdown) {
                    await dropdown.click();
                    await page.waitForSelector('[role="option"]', { timeout: 5000 });
                    // Find the option using case-insensitive, partial match
                    const options = await page.$$('[role="option"]');
                    for (const opt of options) {
                        const text = await (await opt.getProperty('innerText')).jsonValue();
                        if (
                            text.trim().toLowerCase() === answer.toLowerCase() ||
                            text.trim().toLowerCase().includes(answer.toLowerCase()) ||
                            answer.toLowerCase().includes(text.trim().toLowerCase())
                        ) {
                            await opt.click();
                            break;
                        }
                    }
                }
            } 0
        } catch (err) {
            console.warn('Submit button not found or click failed:', err.message);
        }

    }
}