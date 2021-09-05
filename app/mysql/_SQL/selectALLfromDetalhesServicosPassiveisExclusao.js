var mysql = require('../mysql')
//==================================================================================
//            SELECIONA TODOS OS DET SERVICOS PASSIVEIS DE EXCLUSAO 
//==================================================================================
module.exports = (callback)=>{
    mysql.query(`SELECT 
                    t.ID,
                    t.idDetServ,
                    t.NOME ,
                    t.NOME_REDUZIDO,
                    t.AREA,
                    t.alocadoEm,
                    t.alocadoPor
                    FROM priorizacaoProtocolos.view_detalhesServicosPassiveisExclusao t`,
                (error,results)=>{
                    if(error){
                        callback({error: 'no data returned'},undefined)
                    }else {
                        callback(undefined, results)
                    }

    })
}