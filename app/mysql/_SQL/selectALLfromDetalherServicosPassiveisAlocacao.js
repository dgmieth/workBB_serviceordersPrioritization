var mysql = require('../mysql')
//==================================================================================
//            SELECIONA TODOS OS DET SERVICOS PASSIVEIS DE ALOCAÇÃO 
//==================================================================================
module.exports = (callback)=>{
    mysql.query(`SELECT 
                    t.idDetServ,
                    t.NOME,
                    t.NOME_REDUZIDO,
                    t.AREA
                FROM priorizacaoProtocolos.view_detalhesServicosPassiveisAlocacao t`,
                (error,results)=>{
                    if(error){
                        callback({error: 'no data returned'},undefined)
                    }else {
                        callback(undefined, results)
                    }

    })
}