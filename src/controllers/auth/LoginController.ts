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
      return res.send({
        error: 'All data has not been filled in. { email, password }',
        message: 'Preencha todos os campos'
      })
    }

    const email = req.body.email.trim()
    const password = req.body.password.toString()

    try {
      const user = await db.query('select * from administrador where email = $1', [email])

      if (user.rowCount === 0) return res.status(200).send({ error: 'Authentication failed', message: 'Email ou Senha incorretos' })

      bcrypt.compare(password, user.rows[0].senha, (err, result) => {
        if (err) return res.status(200).send({ error: err })

        if (!result) return res.status(200).send({ error: 'Authentication failed', message: 'Email ou Senha incorretos' })

        const token = jwt.sign({ id: user.rows[0].id_adm }, process.env.SECRET_JWT, { expiresIn: 60 * 60 * 24 })
        return res.status(200).send({ message: 'User Authenticated', token: token })
      })
    } catch (err) {
      return res.status(200).send({ error: 'Login Failed: ' + err, message: 'Ocorreu um erro interno' })
    }
  }
}

export default new LoginController()
