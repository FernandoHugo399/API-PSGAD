import { Router } from 'express'
import LoginController from '../controllers/auth/LoginController'
import Verify from '../middlewares/Verify'

const router = Router()

router.post('/login', LoginController.Login)
router.get('/', Verify.AuthVerify, (req, res) => {
  return res.status(200).send({ message: 'Access relesead' })
})

export { router }
