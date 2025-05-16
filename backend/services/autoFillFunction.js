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
    for (const q of questionsWithAnswers) {
        const { type, answer } = q;
        try {
            if (type === 'short_answer') {
                await page.waitForSelector('input[type="text"]', { timeout: 5000 });
                const input = await page.$('input[type="text"]');
                if (input) {
                    await input.click({ clickCount: 3 });
                    await input.type(answer, { delay: 50 });
                }
            }

            if (type === 'paragraph') {
                await page.waitForSelector('textarea', { timeout: 5000 });
                const textarea = await page.$('textarea');
                if (textarea) {
                    await textarea.click({ clickCount: 3 });
                    await textarea.type(answer, { delay: 50 });
                }
            }

            if (type === 'multiple_choice') {
                await page.evaluate((ans) => {
                    const radios = Array.from(document.querySelectorAll('div[role="radio"]'));
                    const match = radios.find(r => r.textContent.trim() === ans);
                    if (match) match.click();
                }, answer);
            }

            if (type === 'checkboxes') {
                await page.evaluate((ans) => {
                    const checkboxes = Array.from(document.querySelectorAll('div[role="checkbox"]'));
                    checkboxes.forEach(c => {
                        if (ans.includes(c.textContent.trim())) c.click();
                    });
                }, answer);
            }

            if (type === 'dropdown') {
                await page.waitForSelector('[role="listbox"]', { timeout: 5000 });
                await page.click('[role="listbox"]');
                await page.waitForSelector('[role="option"]', { timeout: 5000 });
                // Use XPath for exact text matching
                const [option] = await page.$x(`//div[@role="option"][contains(., "${answer}")]`);
                if (option) await option.click();
            }

            await delay(1000 + Math.random() * 1000); // Random delay between questions
        } catch (err) {
            console.warn(`Error filling ${type} with answer ${answer}:`, err.message);
        }
    }

    try {
        const [submitButton] = await page.$x('//span[contains(text(), "Submit")]/ancestor::div[@role="button"]');
        if (submitButton) await submitButton.click();
        console.log('Form submitted!');
    } catch (err) {
        console.warn('Submit button not found or click failed:', err.message);
    }

};