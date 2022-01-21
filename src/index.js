import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
const {config} = dotenv

config()
import jwt from 'jsonwebtoken'
const PORT = process.env.PORT
const CHAVEPRIVADA = process.env.CHAVEPRIVADA

const app = express()
app.use(bodyParser.json())

app.get('/status',
    (req, res) => res.json({ status: "OK" })
)

app.post('/login', (req, res) => {

    const { usuario, senha } = req.body
    if (usuario === 'michael' && senha === '12345') {
        const dadosUsuario = {
            nome: 'michael',
            email: 'oliveiram.michael@gmail.com',
            id: 1,
            iss:1000
        }
        
        jwt.sign(dadosUsuario, CHAVEPRIVADA, (err, token) => {
            if (err) {
                res
                    .status(500)
                    .json({ mensagem: 'Erro ao gerar o JWT' })
                return
            }
            res.set('x-acess-token', token)
            res.end()
        })
    }
    else {
        res.status(401)
        res.end()
    }
})

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`)
})