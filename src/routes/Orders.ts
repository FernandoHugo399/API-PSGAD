import { Router } from 'express'
import pendingOrdersController from '../controllers/orders/pendingOrdersController'
import Verify from '../middlewares/Verify'

const router = Router()

router.get('/pending', Verify.AuthVerify, pendingOrdersController.PendingOrders)

export { router }
