import { con } from './connection.js'

export function login( email, senha ){
    let comando =
        `select id_usuario 		id ,
            nm_usuario		    nome ,
            ds_email		    email
            from tb_usuario
            where ds_email 		= ?
            and ds_senha		= ? `
    
}