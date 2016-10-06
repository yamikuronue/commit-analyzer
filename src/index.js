const { parseRawCommit } = require('conventional-changelog/lib/git')

module.exports = function (pluginConfig, {commits}, cb) {
  let type = null

  commits

  .map((commit) => parseRawCommit(`${commit.hash}\n${commit.message}`))

  .filter((commit) => !!commit)

  .every((commit) => {
    if (commit.breaks.length) {
      type = 'major'
      return false
    }

    if (commit.type === 'feat' || commit.type === 'Feature') type = 'minor'

    if (!type && commit.type === 'fix') type = 'patch'

    return true
  })

  cb(null, type)
}
