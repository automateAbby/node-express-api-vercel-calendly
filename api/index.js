// index.js
const express = require('express')
const {
    chromium
} = require('playwright');

app.use(express.json());

const app = express()
const PORT = 4000

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})

app.post('/submit-form', async (req, res) => {
    try {
        const {
            name,
            email,
            url
        } = req.body;

        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(url); // Replace with your form URL

        // Find input fields and enter values
        await page.fill('#full_name_input', name); // Replace with the selector for the name input field
        await page.fill('#email_input', email); // Replace with the selector for the email input field

        // Submit the form
        const submitButton = await page.$('button[type="submit"]');
        await submitButton.click();

        // Wait for form submission to complete (if necessary)
        await page.waitForNavigation();

        console.log('Form submitted successfully!');
        await browser.close();

        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error('Error submitting the form:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});



// Export the Express API
module.exports = app
