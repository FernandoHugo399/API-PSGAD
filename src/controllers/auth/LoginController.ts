import { Request, Response } from 'express'
import { db } from '../../database/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

declare let process : {
  env: {
    SECRET_JWT: string
  }
}

class LoginController {
  public async Login (req: Request, res: Response) {
    if (!req.body.email || !req.body.password || typeof req.body.email === undefined || typeof req.body.password === undefined) {
      return res.status(400).send({ error: 'All data has not been filled in. { email, password }' })
    }

    const email = req.body.email.trim()
    const password = req.body.password.toString()

    try {
      const user = await db.query('select * from administrador where email = $1', [email])

      if (user.rowCount === 0) return res.status(400).send({ error: 'User already not exist' })

      bcrypt.compare(password, user.rows[0].senha, (err, result) => {
        if (err) return res.status(500).send({ error: err })

        if (!result) return res.status(401).send({ error: 'Authentication failed' })

        const token = jwt.sign({ id: user.rows[0].id_adm }, process.env.SECRET_JWT, { expiresIn: 60 * 60 * 24 })
        return res.status(200).send({ message: 'User Authenticated', token: token })
      })
    } catch (err) {
      return res.status(400).send({ error: 'Login Failed: ' + err })
    }
  }
}

export default new LoginController()
