
import {Router} from 'express'
import { InseriFilmes , alterarImagem } from '../repository/filmeRepository.js';

import multer from 'multer'

const server = Router();
const upload = multer({dest: 'storage/capaFilmes'})

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

server.put("/filme/:id/capa",upload.single('capa'), async(req,resp)=>{
    try {
        const {id}=req.params;
        const imagem= req.file.path;

        const resposta= await alterarImagem(imagem,id);

        if(resposta != 1){
            throw new Error('A imagem não foi encontrada ;-;');
        }

        resp.status(204).send()
    } catch (err) {
        resp.status(406).send({
            erro:err.message
        })
    }
})

export default server;
