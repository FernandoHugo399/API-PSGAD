import { Router } from 'express'
import AllProductsController from '../controllers/products/AllProductsController'
import Verify from '../middlewares/Verify'

const router = Router()

router.get('/', Verify.AuthVerify, AllProductsController.AllProductsController)

export { router }
