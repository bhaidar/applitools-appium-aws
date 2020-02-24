'use strict'

/* eslint-disable no-unused-vars */

/**
 * @ignore
 * @abstract
 */
class ImageOrientationHandler {
  /**
   * @param {IWebDriver} driver
   * @return {Promise<boolean>}
   */
  async isLandscapeOrientation(driver) {
    throw Error('Method is not implemented!')
  }

  /**
   * @param {Logger} logger
   * @param {IWebDriver} driver
   * @param {MutableImage} image
   * @return {Promise<number>}
   */
  async tryAutomaticRotation(logger, driver, image) {
    throw Error('Method is not implemented!')
  }
}

exports.ImageOrientationHandler = ImageOrientationHandler
