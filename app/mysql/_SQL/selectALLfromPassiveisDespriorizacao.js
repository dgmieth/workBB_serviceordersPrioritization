var mysql = require('../mysql')
//==================================================================================
//            SELECIONA TODOS OS PROTOCOLOS PASSIVEIS DE DESPRIORIZACAO 
//==================================================================================
module.exports = (callback)=>{
    mysql.query(`SELECT 
                    t.id,
                    t.PROTOCOLO ,
                    t.ETAPA,
                    t.DET_SERV_NOME,
                    t.DT_INICIO ,
                    t.DT_PRAZO_SLA ,
                    t.DT_CONCLUSAO ,
                    t.DT_PRAZO_CLIENTE ,
                    t.priorizadaEm ,
                    t.priorizadaPor 
                FROM priorizacaoProtocolos.view_passiveisDespriorizacao t`,
                (error,results)=>{
                    if(error){
                        callback({error: 'no data returned'},undefined)
                    }else {
                        callback(undefined, results)
                    }

    })
}