import { AbBotao } from "ds-alurabooks"
import './Pedidos.css'
import { useEffect, useState } from "react"
import { IPedido } from "../../interfaces/IPedido"
import api from "../../api"


const Pedidos = () => {

    const formatCurrency = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'})

    const [pedidos, setPedidos] = useState<IPedido[]>([])
    //interfaces em typescript são como tipos de dados personalizados, semelhante a struct em c++

    useEffect(() => {
        api.get<IPedido[]>('pedidos') //configuração relizada na instância por interceptadores
        .then((resposta) => {
            setPedidos(resposta.data) //salva todos os pedidos retorndos pela api no array pedidos
        })
        .catch((erro) => {
            console.log(erro)
        })
    }, [])


    return(
        <section className="pedidos">
            <h1>Meus Pedidos</h1>
            {pedidos.map((pedido) => (
                <div className="pedido" key={pedido.id}>
                <ul>
                    <li>Pedido: <strong>{pedido.id}</strong></li>
                    <li>Data do Pedido: <strong>{new Date(pedido.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</strong></li>
                    <li>Valor Total: <strong>{formatCurrency.format(pedido.total)}</strong></li>
                    <li>Entrega realizada em: <strong>{new Date(pedido.entrega).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</strong></li>
                </ul>

                <AbBotao texto="Detalhes"/>
            </div>

            ))

            }
        </section>
    )
}

export default Pedidos