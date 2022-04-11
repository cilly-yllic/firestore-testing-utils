const core = require('@actions/core')
const execute = require('../utils/exec')

const run = async () => {
  const version = await execute('jq -r .version package.json')
  core.setOutput('tag-name', version.trim())
}

run()
