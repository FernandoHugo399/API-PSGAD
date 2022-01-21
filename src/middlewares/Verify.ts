import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface request extends Request{
    userId?: string
}

declare let process : {
  env: {
    SECRET_JWT: string
  }
}

class AuthVerify {
  public async AuthVerify (req: request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) { return res.status(200).send({ authError: 'No token provided', message: 'Token não informado' }) }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isTokenValid: any = jwt.verify(authHeader, process.env.SECRET_JWT)
      req.userId = isTokenValid.id

      return next()
    } catch (err) {
      return res.status(200).send({ authError: 'Invalid Token: ' + err, message: 'Token inválido' })
    }
  }
}

export default new AuthVerify()
