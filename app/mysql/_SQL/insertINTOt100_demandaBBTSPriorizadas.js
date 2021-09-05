var mysql = require('../mysql')
const registraLog = require('./registraLog')
//==================================================================================
//                                 PRIORIZA PROTOCOLOS 
//==================================================================================
module.exports = (array,matricula,callback)=>{
    console.log(array)
    mysql.query(`INSERT INTO priorizacaoProtocolos.t202_operacoesBBTSPriorizadas (nr_unico,idProtOriginario,insertedBy)
                SELECT 
                    v.NR_UNICO as nr_unico ,
                    v.t100_demanda_ID as idProtOriginario,
                    '${matricula}' as insertedBy 
                FROM priorizacaoProtocolos.view_passiveisPriorizacao_Extenso v
                WHERE v.t100_demanda_ID IN (${array.array});
                    INSERT INTO t100_demandaBBTSPriorizadas (idProt, priorizadaPor)
                    SELECT
                        t.ID,
                        '${matricula}' AS priorizadaPor 
                    FROM priorizacaoProtocolos.view_passiveisPriorizacao t
                    WHERE t.ID IN (${array.array})`,
                (error,results)=>{
                    if(error){
                        callback({error: 'no data returned'},undefined)
                    }else {
                        registraLog(matricula,'Priorização de protocolos',(error,success)=>{
                            if(error){
                                callback({error: 'no data returned'},undefined)
                            }else{
                                callback(undefined, {success: 'registro(s) salvo(s)'})
                            }
                        })
                    }
    })
}