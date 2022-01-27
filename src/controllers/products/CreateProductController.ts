import { bucket } from './../../config/gCloud'
import { Request, Response } from 'express'
import { db } from '../../database/db'

class CreateProductController {
  public async CreateProduct (req: Request, res: Response) {
    let { nome, preco, categoria, descricao } = req.body
    const file = req.file
    if (!nome || !preco || !categoria || !descricao) {
      return res.status(200).send({ error: 'All data has not been filled in. { nome, preco, categoria, descricao }', message: 'Preencha todos os campos' })
    }

    nome = nome.trim()
    preco = preco.trim().toString().replace(',', '.')
    descricao = descricao.trim()

    if (isNaN(Number(preco)) || preco === 0 || preco < 0) {
      return res.status(200).send({ error: 'invalid price', message: 'insira o preço em um formato válido' })
    }

    if (!file) { return res.status(200).send({ error: 'Image not found', message: 'Coloque uma imagem' }) }

    if (file.size > 2 * 1024 * 1024) {
      return res.status(200).send({ error: 'very heavy file', message: 'Este arquivo é muito pesado! max: 2Mb' })
    }

    const format = file.originalname.split('.')
    // eslint-disable-next-line no-empty
    if (format[format.length - 1] === 'png' || format[format.length - 1] === 'jpg' || format[format.length - 1] === 'svg' || format[format.length - 1] === 'jpeg') {} else {
      return res.status(200).send({ error: 'Invalid format', message: 'Coloque a imagem em um formato válido [png, jpeg, jpg, svg]' })
    }

    try {
      const Categories = await db.query('select * from categoria where nome = $1 ', [categoria])
      if (Categories.rowCount === 0) {
        return res.status(200).send({ error: 'Invalid Categorie', message: 'Está categoria não existe' })
      }

      const now = Date.now().toString().substring(0, 10)
      const blob = bucket.file(now + file.originalname)
      const blobStream = blob.createWriteStream()

      blobStream.on('error', (err) => {
        return res.status(200).send({ error: err, message: 'Ocorreu um erro interno' })
      })

      blobStream.on('finish', async () => {
        const produtoValues = [nome, preco, descricao, Categories.rows[0].id_categoria, blob.name]
        db.query(`INSERT INTO produto (nome, preco, descricao, id_categoria, image) values
        ($1, $2, $3, $4, $5)`, produtoValues).then(() => {
          return res.status(200).send({ message: 'Produto criado com sucesso' })
        }).catch((err) => {
          bucket.file(blob.name).delete()
          return res.status(200).send({ error: err, message: 'Ocorreu um erro ao criar o produto' })
        })
      })

      blobStream.end(file.buffer)
    } catch (err) {
      return res.status(400).send({ error: err, message: 'Ocorreu um erro interno' })
    }
  }
}

export default new CreateProductController()
