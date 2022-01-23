import { Request, Response } from 'express'
import { db } from '../../database/db'

class PendingOrdersController {
  public async PendingOrders (req: Request, res: Response) {
    try {
      const resul = await db.query(`select pedido.id_pedido, cliente.nome, pedido.data_pedido, pedido.valor_total, pedido.status from pedido
      inner join cliente
      on pedido.id_cliente = cliente.id_cliente
      where status = 'pendente'
      order by data_pedido desc`)

      return res.status(200).send({ pedidos: resul })
    } catch (err) {
      return res.status(200).send({ error: 'Ocorreu um erro: ' + err })
    }
  }
}

export default new PendingOrdersController()
