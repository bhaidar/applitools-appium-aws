'use strict'

const {Location, Region, CoordinatesType} = require('@applitools/eyes-common')
const {GetRegion} = require('@applitools/eyes-sdk-core')

const {SelectorByElement} = require('./SelectorByElement')

/**
 * @ignore
 */
class IgnoreRegionByElement extends GetRegion {
  /**
   * @param {WebElement} webElement
   */
  constructor(webElement) {
    super()
    this._element = webElement
  }

  /**
   * @override
   * @param {Eyes} eyes
   * @param {EyesScreenshot} screenshot
   * @return {Promise<Region[]>}
   */
  // eslint-disable-next-line no-unused-vars
  async getRegion(eyes, screenshot) {
    const rect = await this._element.getRect()
    const lTag = screenshot.convertLocation(
      new Location(rect),
      CoordinatesType.CONTEXT_RELATIVE,
      CoordinatesType.SCREENSHOT_AS_IS,
    )

    return [new Region(lTag.getX(), lTag.getY(), rect.width, rect.height)]
  }

  /**
   * @inheritDoc
   * @param {Eyes} eyes
   * @return {Promise<string>}
   */
  async getSelector(eyes) {
    // eslint-disable-line no-unused-vars
    return new SelectorByElement(this._element).getSelector(eyes)
  }
}

exports.IgnoreRegionByElement = IgnoreRegionByElement
