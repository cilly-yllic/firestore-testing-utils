const exec = require('@actions/exec')

const execute = async command => {
  let log = ''
  const options = {}
  options.listeners = {
    stdout: data => {
      log += data.toString()
    },
    stderr: data => {
      log += data.toString()
    },
  }
  await exec.exec(command, null, options)
  return log
}

module.exports = execute
