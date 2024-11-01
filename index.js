import puppeteer from "puppeteer";
import nodemailer from "nodemailer";
const URL = "";

(async () => {
	// Launch the browser and open a new page
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
	});
	const page = await browser.newPage();
	// Navigate to the target URL
	await page.goto(process.env.URL); // replace with your actual URL

	// Wait for the element with the specific ID to be rendered
	const selector = await page.waitForSelector("#\\38 460802 a"); // Use the ID to target the element
	const anchorText = await page.$eval("#\\38 460802 a", (el) => el.innerText);
	if (anchorText != "Sold Out") {
		// Send Email Notification
		const transporter = nodemailer.createTransport({
			service: "gmail", // Use Gmail's SMTP service
			auth: {
				user: process.env.EMAIL_ADDRESS, // Your Gmail address
				pass: process.env.APP_PASSWORD,
			},
		});
		// Define the email options
		const mailOptions = {
			from: process.env.EMAIL_ADDRESS, // Sender address
			to: process.env.TO_ADDRESS, // Recipient address
			subject: "CHECK PATREON", // Subject line
			text: "There is a spot available!", // Plain text body
		};

		// Send the email
		transporter.sendMail(mailOptions, function (error, info) {});
	}
	await browser.close();
})();
