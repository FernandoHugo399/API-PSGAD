import { Request, Response } from 'express'
import { db } from '../../database/db'

class DeleteCategoryController {
  public async DeleteCategory (req: Request, res: Response) {
    if (!req.params.id) return res.status(200).send({ error: 'All data has not been filled in. { id }', message: 'Id da categoria não foi passada' })
    try {
      const deleteResult = await db.query('delete from categoria where id_categoria = $1', [req.params.id])
      if (deleteResult.rowCount === 0) return res.status(200).send({ error: 'the category does not exist', message: 'Esta categoria não existe' })

      return res.status(200).send({ message: 'Categoria Deletada com sucesso' })
    } catch (err) {
      return res.status(400).send({ error: err, message: 'Não foi possivel deletar a categoria' })
    }
  }
}

export default new DeleteCategoryController()
