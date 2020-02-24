/* eslint-disable no-unused-vars */
'use strict'

require('chromedriver')
const {Builder, Capabilities} = require('selenium-webdriver')
const {Options: ChromeOptions} = require('selenium-webdriver/chrome')
const {
  Eyes,
  ClassicRunner,
  Target,
  ConsoleLogHandler,
  Configuration,
  BatchInfo,
  FileDebugScreenshotsProvider,
} = require('../index')

const url = process.argv[2]
if (!url) {
  throw new Error('missing url argument!')
}

;(async function() {
  console.log('Running Selenium render for', url, '\n')
  const driver = await new Builder()
    .withCapabilities(Capabilities.chrome())
    .setChromeOptions(new ChromeOptions().headless())
    .build()

  const runner = new ClassicRunner()
  const eyes = new Eyes(runner)
  const configuration = new Configuration({
    viewportSize: {width: 1024, height: 768},
  })
  eyes.setConfiguration(configuration)

  if (process.env.APPLITOOLS_SHOW_LOGS) {
    eyes.setLogHandler(new ConsoleLogHandler(true))
  }

  await driver.get(url)
  await eyes.open(driver, 'selenium render', 'selenium render')
  await eyes.check('selenium render', Target.window())
  await eyes.close(false)

  const results = await runner.getAllTestResults(false)
  console.log('\nRender results\n\n', results.getAllResults().toString())
})()
