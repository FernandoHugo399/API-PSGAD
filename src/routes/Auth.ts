import { Router } from 'express'
import LoginController from '../controllers/auth/LoginController'
import Verify from '../middlewares/Verify'

const router = Router()

router.use('/login', LoginController.Login)
router.use('/teste', Verify.AuthVerify, (req, res) => {
  return res.status(200).send('okay')
})

export { router }
