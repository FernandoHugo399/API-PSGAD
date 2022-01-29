import { Request, Response } from 'express'
import { db } from '../../database/db'

class AllCategoriesController {
  public async AllCategoriesController (req: Request, res: Response) {
    try {
      const categories = await db.query('select * from categoria order by id_categoria desc')
      return res.status(200).send({ length: categories.rowCount, categories: categories.rows })
    } catch (err) {
      return res.status(400).send({ error: err, message: 'Ocorreu um erro ao listar os categorias' })
    }
  }
}

export default new AllCategoriesController()
