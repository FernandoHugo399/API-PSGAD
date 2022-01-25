import { Request, Response } from 'express'
import { db } from '../../database/db'

class AllProductsController {
  public async AllProductsController (req: Request, res: Response) {
    try {
      const product = await db.query(`select produto.id_produto, produto.nome, produto.preco, produto.descricao, categoria.nome AS categoria, produto.image from produto
      inner join categoria
      on produto.id_categoria = categoria.id_categoria
      where produto.visibilidade = 1
      order by produto.id_produto desc`)
      return res.status(200).send({ length: product.rowCount, products: product.rows })
    } catch (err) {
      return res.status(200).send({ error: err, message: 'Ocorreu um erro ao listar os produtos' })
    }
  }
}

export default new AllProductsController()
