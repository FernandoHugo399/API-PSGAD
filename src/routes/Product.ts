import { Router } from 'express'
import AllProductsController from '../controllers/products/AllProductsController'
import CreateProductController from '../controllers/products/CreateProductController'
import Verify from '../middlewares/Verify'
import { upload } from '../middlewares/Multer'

const router = Router()

router.get('/', Verify.AuthVerify, AllProductsController.AllProductsController)

router.post('/', upload.single('file'), CreateProductController.CreateProduct)

export { router }
