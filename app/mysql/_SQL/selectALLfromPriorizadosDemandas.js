var mysql = require('../mysql')
//==================================================================================
//                   SELECIONA TODOS OS PROTOCOLOS DEMANDAS PRIORIZADOS 
//==================================================================================
module.exports = (callback)=>{
    mysql.query(`SELECT 
                    t.PROTOCOLO, 
                    t.servico,	
                    t.detalhe_servico,
                    t.area, 
                    t.etapa, 
                    t.PREF_DEMANDANTE, 
                    t.Gerec, 
                    t.Nome_Gerec, 
                    t.VALOR_NEGOCIO, 
                    t.DT_INICIO, 
                    t.DT_PRAZO_SLA, 
                    t.DT_CONCLUSAO, 
                    t.dt_inclusao_priorizacao
                FROM priorizacaoProtocolos.view_priorizadosDemandas t`,
                (error,results)=>{
                    if(error){
                        callback({error: 'no data returned'},undefined)
                    }else {
                        callback(undefined, results)
                    }

    })
}