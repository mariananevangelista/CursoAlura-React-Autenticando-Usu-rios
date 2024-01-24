
import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"
import { useState } from "react"
import api from "../../api"
import { usePersistirToken } from "../../hooks"


import imagemPrincipal from './assets/login.png'

import './ModalLoginUsuario.css'

interface PropsModalLoginUsuario{ //typescript
    aberta: boolean
    aoFechar: () => void
    aoEfetuarLogin: () => void
}

const ModalLoginUsuario = ({aberta, aoFechar, aoEfetuarLogin}:PropsModalLoginUsuario) =>{
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const setToken = usePersistirToken() //chamada do custom token, retorna uma função

    const aoSubmmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const user = {
            email,
            senha
        }

        api.post('public/login', user)
            .then((response) =>{ //logado com sucesso, no then temos acesso à  resposta como parâmetro
                setToken(response.data.access_token) //passando o parâmetro para o hook, o token é guardado no local strorage
                setEmail('')
                setSenha('')
                aoEfetuarLogin()

            })
            .catch((error) =>{ //erro de login, no catch temos acesso à resposta como parâmetro
                if(error?.response?.data?.message){
                    alert(error.response.data.message)
                } else {
                    alert('Aconteceu um erro inesperado')

                }
            })

        console.log(user)

    }

    return(
        <AbModal
            titulo="Login"
            aberta={aberta}
            aoFechar={aoFechar}
        >
            <section className="corpoModalLogin">
                <figure>
                    <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
                </figure>
                <form onSubmit={aoSubmmit}>
                    <AbCampoTexto
                        label="Email"
                        value={email}
                        onChange={setEmail}
                    
                    />

                    <AbCampoTexto
                        label="Senha"
                        value={senha}
                        onChange={setSenha}
                    />

                    <footer className="acoes">
                        <AbBotao texto="Fazer Login"/>
                    </footer>

                </form>   

            </section>

        </AbModal>
    )
}

export default ModalLoginUsuario