import { IPendentOrder } from './../../models/Order'
import { Request, Response } from 'express'
import { db } from '../../database/db'

class PendingOrdersController {
  public async PendingOrders (req: Request, res: Response): Promise<Response> {
    try {
      const order = await db.query(`select pedido.id_pedido, cliente.nome, pedido.data_pedido, pedido.valor_total, pedido.status from pedido
      inner join cliente
      on pedido.id_cliente = cliente.id_cliente
      where status = 'pendente'
      order by data_pedido`)

      const orderFormated = order.rows.map((order: IPendentOrder) => {
        return {
          id_order: order.id_pedido,
          client_name: order.nome,
          order_date: order.data_pedido,
          total_value: order.valor_total,
          status: order.status
        }
      })
      return res.status(200).send({ length: order.rowCount, orders: orderFormated })
    } catch (err) {
      return res.status(200).send({ error: 'Ocorreu um erro: ' + err, message: 'Ocorreu um erro interno, tente novamente' })
    }
  }
}

export default new PendingOrdersController()
