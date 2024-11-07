// import { Connector } from '@google-cloud/cloud-sql-connector'
// import pg from 'pg'
// import dotenv from 'dotenv'

// dotenv.config()

// const connector = new Connector()
// const connectionString = process.env.INSTANCE_CONNECTION_NAME || ''

// async function connectToDatabase() {
//   try {
//     const clientOpts = await connector.getOptions({
//       instanceConnectionName: connectionString,
//       ipType: 'PUBLIC',
//     } as unknown as any)

//     const pool = new pg.Pool({
//       ...clientOpts,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       database: process.env.DB_NAME,
//     })
//     return pool
//   } catch (error) {
//     console.error('Error connecting to the database:', error)
//   }
// }

// export default connectToDatabase
