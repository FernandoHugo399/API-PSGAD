import { Request, Response } from 'express'
import { db } from '../../database/db'

class AllCompletedOrders {
  public async completedOrders (req: Request, res: Response) {
    try {
      const resul = await db.query(`select pedido.id_pedido ,cliente.nome as nome_cliente, pedido.valor_total AS valor_total_pedido, produto.nome AS produto,
      produto.preco AS preco_unitario, item_pedido.quantidade, item_pedido.preco_total AS preco_itens, pedido.data_pedido from item_pedido
      inner join pedido
      on pedido.id_pedido = item_pedido.id_pedido
      inner join produto
      on item_pedido.id_produto = produto.id_produto
      inner join cliente
      on pedido.id_cliente = cliente.id_cliente
      where pedido.status = 'concluido'
      order by id_pedido`)

      return res.status(200).send({ length: resul.rowCount, pedidos: resul.rows })
    } catch (err) {
      return res.status(200).send({ error: 'Ocorreu um erro: ' + err, message: 'Ocorreu um erro interno, tente novamente' })
    }
  }
}
export default new AllCompletedOrders()
