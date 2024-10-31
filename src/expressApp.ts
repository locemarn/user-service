import express from 'express'
import usersRouter from './api/routes/user.routes'
import loginRouter from './api/routes/login.routes'
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'everything works well.',
  })
})

app.use('/users', usersRouter)
app.use('/login', loginRouter)

export default app
