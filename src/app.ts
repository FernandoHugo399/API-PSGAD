import express from 'express'
import dotenv from 'dotenv'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()
      this.middlewares()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      dotenv.config()
    }

    private routes (): void {
      this.express.use('/', (req, res) => {
        res.send('Hello World!')
      })
    }
}

export default new App().express
