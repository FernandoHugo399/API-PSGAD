import { ICompletedOrder } from './../../models/Order'
import { Request, Response } from 'express'
import { db } from '../../database/db'

class AllCompletedOrders {
  public async completedOrders (req: Request, res: Response): Promise<Response> {
    try {
      const order = await db.query(`select pedido.id_pedido ,cliente.nome as nome_cliente, pedido.valor_total AS valor_total_pedido, produto.nome AS produto,
      produto.preco AS preco_unitario, item_pedido.quantidade, item_pedido.preco_total AS preco_itens, pedido.data_pedido from item_pedido
      inner join pedido
      on pedido.id_pedido = item_pedido.id_pedido
      inner join produto
      on item_pedido.id_produto = produto.id_produto
      inner join cliente
      on pedido.id_cliente = cliente.id_cliente
      where pedido.status = 'concluido'
      order by id_pedido`)

      const orderFormated = order.rows.map((order: ICompletedOrder) => {
        return {
          id_order: order.id_pedido,
          client_name: order.nome_cliente,
          total_order: order.valor_total_pedido,
          product: order.produto,
          unit_price: order.preco_unitario,
          amount: order.quantidade,
          order_date: order.data_pedido
        }
      })

      return res.status(200).send({ length: order.rowCount, pedidos: orderFormated })
    } catch (err) {
      return res.status(200).send({ error: 'Ocorreu um erro: ' + err, message: 'Ocorreu um erro interno, tente novamente' })
    }
  }
}
export default new AllCompletedOrders()
