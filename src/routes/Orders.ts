import { Router } from 'express'
import AllCompletedOrdersController from '../controllers/orders/AllCompletedOrdersController'
import pendingOrdersController from '../controllers/orders/pendingOrdersController'
import Verify from '../middlewares/Verify'

const router = Router()

router.get('/pending', Verify.AuthVerify, pendingOrdersController.PendingOrders)
router.get('/completed', Verify.AuthVerify, AllCompletedOrdersController.completedOrders)
export { router }
