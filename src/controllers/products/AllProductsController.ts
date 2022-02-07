import { IProduct } from './../../models/Product'
import { Request, Response } from 'express'
import { db } from '../../database/db'

class AllProductsController {
  public async AllProductsController (req: Request, res: Response): Promise<Response> {
    try {
      const product = await db.query(`select produto.id_produto, produto.nome, produto.preco, produto.descricao, categoria.nome AS categoria, produto.image from produto
      inner join categoria
      on produto.id_categoria = categoria.id_categoria
      where produto.visibilidade = 1
      order by produto.id_produto desc`)

      const productFormated = product.rows.map((product:IProduct) => {
        return {
          id_product: product.id_produto,
          name: product.nome,
          price: product.preco,
          description: product.descricao,
          category: product.categoria,
          image: product.image
        }
      })

      return res.status(200).send({ length: product.rowCount, products: productFormated })
    } catch (err) {
      return res.status(200).send({ error: err, message: 'Ocorreu um erro ao listar os produtos' })
    }
  }
}

export default new AllProductsController()
