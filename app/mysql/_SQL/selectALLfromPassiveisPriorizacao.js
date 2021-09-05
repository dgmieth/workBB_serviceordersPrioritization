var mysql = require('../mysql')
//==================================================================================
//               SELECIONA TODOS OS PROTOCOLOS PASSIVEIS DE PRIORIZACAO
//==================================================================================
module.exports = (callback)=>{
    mysql.query(`SELECT 
                    t.id,
                    t.PROTOCOLO, 
                    t.mci_principal,	
                    t.etapa_nome, 
                    t.det_serv_nome, 
                    t.DT_INICIO, 
                    t.DT_PRAZO_SLA, 
                    t.DT_CONCLUSAO, 
                    t.DT_PRAZO_CLIENTE
                FROM priorizacaoProtocolos.view_passiveisPriorizacao t `,
                (error,results)=>{
                    if(error){
                        callback({error: 'no data returned'},undefined)
                    }else {
                        callback(undefined, results)
                    }

    })
}