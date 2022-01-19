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

    if (!authHeader) { return res.status(401).send({ error: 'No token provided' }) }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isTokenValid: any = jwt.verify(authHeader, process.env.SECRET_JWT)
      console.log(isTokenValid)
      req.userId = isTokenValid.id
      console.log(req.userId)

      return next()
    } catch (err) {
      return res.status(400).send({ message: 'Invalid Token: ' + err })
    }
  }
}

export default new AuthVerify()
