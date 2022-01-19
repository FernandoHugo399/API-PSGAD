import { Router } from 'express'
import LoginController from '../controllers/auth/LoginController'

const router = Router()

router.use('/login', LoginController.Login)

export { router }
