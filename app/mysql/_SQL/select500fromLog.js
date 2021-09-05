var mysql = require('../mysql')
//==================================================================================
//                  SELECIONA 500 REGISTROS MAIS RECENTES DO LOG 
//==================================================================================
module.exports = (callback)=>{
    mysql.query(`SELECT 
                    t.id ,
                    t.databaseUser ,
                    t.description ,
                    t.currentTimeStamp 
                FROM priorizacaoProtocolos.view_get500Log t`,
                (error,results)=>{
                    if(error){
                        callback({error: 'no data returned'},undefined)
                    }else {
                        callback(undefined, results)
                    }

    })
}