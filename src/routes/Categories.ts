import { Router } from 'express'
import AllCategoriesController from '../controllers/categories/AllCategoriesController'
import Verify from '../middlewares/Verify'

const router = Router()

router.get('/', Verify.AuthVerify, AllCategoriesController.AllCategoriesController)

export { router }
