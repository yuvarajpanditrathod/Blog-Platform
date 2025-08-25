const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");

async function runTests() {
    const driver = new Builder().forBrowser("chrome").build();

    try {
        console.log("Running Register Button and Form Validation Tests...");

        // Navigate to the Register page
        await driver.get("http://localhost:3000/register");
        console.log("Navigated to Register page.");

        // Fill in the form fields
        await driver.findElement(By.xpath('//input[@placeholder="Enter username"]')).sendKeys("01fe23bcs425");
        console.log("Filled in Username.");

        await driver.findElement(By.xpath('//input[@placeholder="example@kletech.ac.in"]')).sendKeys("01fe23bcs425@kletech.ac.in");
        console.log("Filled in Email.");

        await driver.findElement(By.xpath('//input[@placeholder="6+ strong character"]')).sendKeys("123456");
        console.log("Filled in Password.");

        await driver.findElement(By.xpath('//input[@placeholder="Confirm password"]')).sendKeys("123456");
        console.log("Filled in Confirm Password.");

        // Locate the Register button
        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));

        // Ensure the button is visible and clickable
        const isButtonDisplayed = await registerButton.isDisplayed();
        console.log(`Register button is ${isButtonDisplayed ? "visible" : "not visible"}.`);

        const isButtonEnabled = await registerButton.isEnabled();
        console.log(`Register button is ${isButtonEnabled ? "enabled" : "not enabled"}.`);

        if (!isButtonDisplayed || !isButtonEnabled) {
            throw new Error("Register button is not ready for interaction.");
        }

        // Scroll to the button and click it
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", registerButton);
        await driver.executeScript("arguments[0].click();", registerButton);
        console.log("Clicked the Register button.");

        // Sleep for 2 seconds to ensure the form submission is processed
        await driver.sleep(2000);

        // Log current URL before waiting for redirection
        const currentUrlBeforeRedirection = await driver.getCurrentUrl();
        console.log("Current URL before redirection:", currentUrlBeforeRedirection);

        // Wait for redirection to the desired URL
        const expectedUrl = "http://localhost:3000";
        await driver.wait(until.urlIs(expectedUrl), 10000); // Increased timeout to 10 seconds
        const currentUrl = await driver.getCurrentUrl();
        console.log("Current URL after registration:", currentUrl);

        if (currentUrl === expectedUrl) {
            console.log("Test passed: Redirected to the correct URL.");
        } else {
            console.log("Test failed: Unexpected redirection URL.");
        }
    } catch (err) {
        console.error("Test failed with error:", err);

        // Capture a screenshot in case of error
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync("error_screenshot.png", screenshot, "base64");
        console.log("Screenshot captured: error_screenshot.png");
    } finally {
        // Close the browser
        await driver.quit();
        console.log("Browser closed.");
    }
}

// Execute the test
runTests();
