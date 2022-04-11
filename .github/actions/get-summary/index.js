const core = require('@actions/core')
const execute = require('../utils/exec')

const CI_REG_EXP = /\[ci:[^\]]*]/

const run = async () => {
  const previousTag = core.getInput('previous-tag')
  const summary = await execute(`git log --oneline --pretty=tformat:"%h %s" ${previousTag}..`)
  core.setOutput(
    'summary',
    summary
      .split('\n')
      .filter(s => !s.includes('Merge pull request') && !CI_REG_EXP.test(s))
      .join('\n')
  )
}

run()
