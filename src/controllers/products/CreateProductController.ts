import { Request, Response } from 'express'
import { db } from '../../database/db'

class CreateProductController {
  public async CreateProduct (req: Request, res: Response) {
    let { nome, preco, categoria, descricao } = req.body
    console.log(req.body)
    const file = req.file
    console.log(file)
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
    console.log(format[format.length - 1])
    if (format[format.length - 1] === 'png' || format[format.length - 1] === 'jpg' || format[format.length - 1] === 'svg' || format[format.length - 1] === 'jpeg') {
      console.log('valid Format')
    } else {
      return res.status(200).send({ error: 'Invalid format', message: 'Coloque a imagem em um formato válido [png, jpeg, jpg, svg]' })
    }

    try {
      return res.status(200).send('ok')
    } catch (err) {
      return res.status(400).send({ error: err, message: 'Ocorreu um erro interno' })
    }
  }
}

export default new CreateProductController()
