import { Request, Response } from 'express'
import { db } from '../../database/db'

class CreateCategoryController {
  public async CreateCategory (req: Request, res: Response): Promise<Response> {
    if (!req.body.nome) return res.status(200).send({ error: 'All data has not been filled in. { nome }', message: 'Preencha os campos' })

    const nome = req.body.nome.trim().toLowerCase()

    if (nome.length > 100) return res.status(200).send({ error: 'the name is too big', message: 'A tag tem um nome muito grande' })

    try {
      const category = await db.query('select * from categoria where nome = $1', [nome])
      if (category.rowCount !== 0) return res.status(200).send({ error: 'The Category already exists', message: 'Esta categoria já existe' })

      await db.query('insert into categoria (nome) values ($1)', [nome])

      return res.status(201).send({ message: 'Categoria criada com sucesso' })
    } catch (err) {
      return res.status(400).send({ error: err, message: 'Ocorreu um erro interno' })
    }
  }
}

export default new CreateCategoryController()
