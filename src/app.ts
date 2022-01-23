import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import { db } from './database/db'
import { router as Auth } from './routes/Auth'
import { router as Order } from './routes/Orders'
import cors from 'cors'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()
      this.middlewares()
      this.routes()
      this.database()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(bodyParser.urlencoded({ extended: false }))
      this.express.use(bodyParser.json())
      this.express.use(cors({
        origin: 'http://localhost:4200',
        allowedHeaders: 'Content-Type, Authorization'
      }))
    }

    private routes (): void {
      this.express.use('/auth', Auth)
      this.express.use('/order', Order)
      this.express.use((req, res) => {
        res.status(404).send({ error: 'not found' })
      })
    }

    private database (): void {
      db.connect().then(() => {
        console.log('Conectado ao postgres')
      }).catch((err) => {
        console.log(err)
      })
    }
}

export default new App().express
