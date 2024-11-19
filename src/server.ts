import expressApp from './expressApp'
import dotenv from 'dotenv'
import config from './configs'

dotenv.config()

const PORT = config.app.port

export const StartServer = async () => {
  expressApp.listen(PORT, () => console.info(`Server running on port: ${PORT}`))

  process.on('uncaughtException', async (err) => {
    console.error('uncaughtException', err)
    process.exit(1)
  })

  process.on('unhandledRejection', async (err) => {
    console.error('unhandledRejection', err)
    process.exit(1)
  })
}

StartServer().then(() => console.info('user-service is up.'))
