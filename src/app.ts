import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import { db } from './database/db'

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
    }

    private routes (): void {
      this.express.use('/', (req, res) => {
        res.send('Hello World!')
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
