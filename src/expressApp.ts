import express, { NextFunction } from 'express'
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

app.use((err: Error, req: any, res: any, next: NextFunction): any => {
  console.error(err.stack)
  res.status(500).send({ error: true, message: 'Somethng went wrong!' })
  next(err)
})

export default app
