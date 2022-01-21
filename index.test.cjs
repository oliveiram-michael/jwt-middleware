const assert = require('assert')
const axios = require('axios').default
const { log } = require('console')
const jwt = require('jsonwebtoken')
const chai = require('chai')

require('dotenv').config()

describe('Teste da API autenticação JWT', () => {
    describe('Teste metodos de autenticação', () => {
        it('Jwt', async () => {
            let chaveJwt = ''
            const chaveDecoded = ''
            chaveJwt = await axios({
                method: 'post',
                url: 'http://localhost:3333/login',
                data: {
                    usuario: 'michael',
                    senha: '12345',
                    iss: 10000
                }
            }).then((response) => {
                return response.headers['x-acess-token']
            })
            const testeJwt = jwt.verify(chaveJwt, process.env.CHAVEPRIVADA)
            // console.log('testeJwt:', testeJwt)
            chai.expect(testeJwt).to.have.property('nome')
            chai.expect(testeJwt).to.have.property('email').equal('oliveiram.michael@gmail.com')

        })
    })
})