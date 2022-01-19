import { Router } from 'express'
import LoginController from '../controllers/auth/LoginController'
import Verify from '../middlewares/Verify'

const router = Router()

router.use('/login', LoginController.Login)
router.use('/', Verify.AuthVerify, (req, res) => {
  return res.status(201).send({ message: 'Access relesead' })
})

export { router }
