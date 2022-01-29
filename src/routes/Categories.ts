import { Router } from 'express'
import CreateCategoriesController from '../controllers/categories/CreateCategoriesController'
import AllCategoriesController from '../controllers/categories/AllCategoriesController'
import Verify from '../middlewares/Verify'
import DeleteCategoriesController from '../controllers/categories/DeleteCategoriesController'

const router = Router()

router.get('/', Verify.AuthVerify, AllCategoriesController.AllCategoriesController)
router.post('/', Verify.AuthVerify, CreateCategoriesController.CreateCategory)
router.delete('/', Verify.AuthVerify, DeleteCategoriesController.DeleteCategory)

export { router }
