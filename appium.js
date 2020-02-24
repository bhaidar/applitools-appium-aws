"use strict";

;(async () => {

    const webdriver = require("selenium-webdriver");
    const LOCAL_APPIUM = "http://127.0.0.1:4723/wd/hub";

    // Initialize the eyes SDK and set your private API key.
    const { Eyes, Target, FileLogHandler, BatchInfo, StitchMode } = require("@applitools/eyes-selenium");

    const batchInfo = new BatchInfo("AWS Device Farm");
    batchInfo.id = process.env.BATCH_ID
    batchInfo.setSequenceName('AWS Device Farm Batches');
    
    // Initialize the eyes SDK
    let eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setLogHandler(new FileLogHandler(true));
    eyes.setForceFullPageScreenshot(true)
    eyes.setStitchMode(StitchMode.CSS)
    eyes.setHideScrollbars(true)
    eyes.setBatch(batchInfo);

    const capabilities = {
        platformName: 'Android',
        deviceName: 'Android Emulator',
        browserName: 'Chrome',
        waitforTimeout: 30000,
        commandTimeout: 30000,
    };
    
    // Open browser.
    let driver = new webdriver
        .Builder()
        .usingServer(LOCAL_APPIUM)
        .withCapabilities(capabilities)
        .build();

    try {
        // Start the test
        await eyes.open(driver, 'Vuejs.org Conferences', 'Appium on Android');

        await driver.get('https://us.vuejs.org/');

        // Visual checkpoint #1.
        await eyes.check('Home Page', Target.window());

        // display title of the page
        await driver.getTitle().then(function (title) {
            console.log(title)
        });

        // locate and click the burger button
        await driver.wait(webdriver.until.elementLocated(webdriver.By.tagName('button.navbar__burger')), 2000).click();
        
        // locate and click the hyperlink with href='/#location' inside the second nav element
        await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//nav[2]/ul/li[3]/a[contains(text(), 'Location')]")), 2000).click();

        const h2 = await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("(//h2[@class='section-title'])[4]")), 2000);
        console.log(await h2.getText());

        // Visual checkpoint #2.
        await eyes.check('Home Loans', Target.window());

        // Close Eyes
        await eyes.close();
    } catch (error) {
        console.log(error);
    } finally {
        // Close the browser.
        await driver.quit();

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abort();
    }
})();