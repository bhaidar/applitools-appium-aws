'use strict'

/* eslint-disable no-unused-vars */

/**
 * @ignore
 * @abstract
 */
class RegionVisibilityStrategy {
  /**
   * @param {PositionProvider} positionProvider
   * @param {Location} location
   * @return {Promise}
   */
  async moveToRegion(positionProvider, location) {
    throw new TypeError('The method is not implemented!')
  }

  /**
   * @param {PositionProvider} positionProvider
   * @return {Promise}
   */
  async returnToOriginalPosition(positionProvider) {
    throw new TypeError('The method is not implemented!')
  }
}

exports.RegionVisibilityStrategy = RegionVisibilityStrategy
