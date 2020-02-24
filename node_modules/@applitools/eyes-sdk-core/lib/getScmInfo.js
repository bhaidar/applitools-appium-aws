'use strict'

const {
  GeneralUtils: {pexec, cachify},
} = require('@applitools/eyes-common')

async function doGetScmInfo(parentBranchName, _opts) {
  const {stdout} = await pexec(
    `HASH=$(git merge-base HEAD ${parentBranchName}) && git show -q --format=%cI $HASH`,
    _opts,
  )
  return stdout && stdout.replace(/\s/g, '')
}

module.exports = cachify(doGetScmInfo, true)
