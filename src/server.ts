import expressApp from './expressApp'

const PORT = process.env.PORT ?? 8000

export const StartServer = async () => {
  expressApp.listen(PORT, () => console.info(`Server running on port: ${PORT}`))

  process.on('uncaughtException', async (err) => {
    console.error(err)
    process.exit(1)
  })
}

StartServer().then(() => console.info('user-service is up.'))
