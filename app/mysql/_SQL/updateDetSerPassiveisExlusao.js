var mysql = require('../mysql')
const registraLog = require('./registraLog')
//==================================================================================
//                      EXCLUI DET SERV DA BBTS
//==================================================================================
module.exports = (array,matricula,callback)=>{
    mysql.query(`UPDATE t201_detServPriorizadosBBTS
                SET 
                    excluded = 1,
                    excludedIn = CURRENT_TIMESTAMP,
                    excludedBy = '${matricula}'        
                WHERE id IN (${array.array})`,
                (error,results)=>{
                    if(error){
                        callback({error: 'no data returned'},undefined)
                    }else {
                        registraLog(matricula,'Exclusão de detalhes de serviços da BBTS',(error,successo)=>{
                            if(error){
                                callback({error: 'no data returned'},undefined)
                            }else{
                                callback(undefined, {success: 'registro(s) salvo(s)'})
                            }
                        })
                    }
    })
}