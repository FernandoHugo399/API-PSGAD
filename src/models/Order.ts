/* eslint-disable camelcase */
export interface ICompletedOrder{
    id_pedido: number
    nome_cliente: string
    valor_total_pedido: number
    produto: string
    preco_unitario: number
    quantidade: number
    data_pedido: string
}

export interface IPendentOrder{
    id_pedido: number
    nome: string
    data_pedido: string
    valor_total: number
    status: string
}
