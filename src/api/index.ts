import axios from "axios";
import { useObterToken } from "../hooks";

const api = axios.create({
    baseURL: 'http://localhost:8000', //porção da url comum a todas as rotas
    headers: {
        Accept: 'application/json', //api será sempre no formatro json
        Content: 'application/json'
    }
}
)

api.interceptors.request.use((config) => { //realiza uma interceptação na api e realiza as configurações
    const token = useObterToken()
    if(token && config.headers){ //se o token existir e se o header da requisição também existir (garantia)
        config.headers.Authorization = `Bearer ${token}` //permissão de acesso ao user autenticado
    }//permite acesso aos dados caso o usuário tenha um token de acesso
    return config
}, (error) => {
    console.log('Erro no interceptor')
    return Promise.reject(error)
})

export default api

//dessa forma não é necssário nrealizar a instância do axios topdas as vezes que for utilizar