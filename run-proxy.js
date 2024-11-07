require('dotenv').config()
const { exec } = require('child_process')

const instanceConnectionName = process.env.INSTANCE_CONNECTION_NAME

const command = `./cloud-sql-proxy ${instanceConnectionName}`

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`)
    return
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.info('gcloud running!')
})
