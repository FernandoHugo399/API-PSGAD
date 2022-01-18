import { Pool } from 'pg'

export const db = new Pool({
  connectionString: process.env.DB_CONNECTION,
  ssl: {
    rejectUnauthorized: false
  }
})
