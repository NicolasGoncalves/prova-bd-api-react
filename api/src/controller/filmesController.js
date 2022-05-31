
import {Router} from 'express'
import { InseriFilmes } from '../repository/filmeRepository.js';
const server = Router();

server.post('/Cadastrafilmes', async (req, resp) =>{
    try {
        const filme = req.body;


        if (!filme.nome) {
            throw new Error('Nome do filme é obrigatorio!');
        }

        if (!filme.sinopse) {
            throw new Error('Sinopse do filme é obrigatorio!');
        }

        if(filme.avaliacao == undefined || filme.avaliacao < 0){
          throw new Error ('Avaliação do filme é obrigatorio!')
        }

        if (!filme.lancamento) {
            throw new Error('Lancamento do filme é obrigatorio!');
        }

        if (filme.disponivel == undefined) {
            throw new Error('Campo Disponivel é obrigatorio!');
        }

        if (!filme.usuario) {
            throw new Error('Usuário não logado!');
        }
        

       const filmeInserir = await InseriFilmes(filme);

       resp.send(filmeInserir)
       
    } 
    catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

export default server;
