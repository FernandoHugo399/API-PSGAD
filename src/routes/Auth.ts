import { Router } from 'express'
import LoginController from '../controllers/auth/LoginController'
import Verify from '../middlewares/Verify'

const router = Router()

router.post('/login', LoginController.Login)
router.get('/', Verify.AuthVerify, (req, res) => {
  res.send({ message: 'ok' })
})

export { router }
