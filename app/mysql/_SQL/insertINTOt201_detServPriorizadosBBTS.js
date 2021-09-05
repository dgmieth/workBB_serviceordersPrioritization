var mysql = require('../mysql')
const registraLog = require('./registraLog')
//==================================================================================
//                       ALOCAR DETALHES SERVIÇOS PARA BTTS 
//==================================================================================
module.exports = (array,matricula,callback)=>{
    mysql.query(`INSERT INTO priorizacaoProtocolos.t201_detServPriorizadosBBTS (idDetServ,insertedBy)
                SELECT 
                    t.idDetServ,
                    '${matricula}' as insertedBy 
                FROM priorizacaoProtocolos.view_detalhesServicosPassiveisAlocacao t 
                WHERE t.idDetServ IN (${array.array})`,
                (error,results)=>{
                    if(error){
                        callback({error: 'no data returned'},undefined)
                    }else {
                        registraLog(matricula,'Aloca detalhes de serviços para a BBTS',(error,success)=>{
                            if(error){
                                callback({error: 'no data returned'},undefined)
                            }else{
                                callback(undefined, {success: 'registro(s) salvo(s)'})
                            }
                        })
                    }
    })
}