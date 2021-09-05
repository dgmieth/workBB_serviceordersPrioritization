var mysql = require('../mysql')
const registraLog = require('./registraLog')
//==================================================================================
//                      DESPRIORIZA PROTOCOLOS SELECIONADOS
//==================================================================================
module.exports = (array,matricula,callback)=>{
    mysql.query(`
                UPDATE priorizacaoProtocolos.t202_operacoesBBTSPriorizadas t 
                LEFT JOIN priorizacaoProtocolos.t100_demandaBBTSPriorizadas tdb ON tdb.idProt = t.idProtOriginario 
                SET t.excluded = 1,
                    t.excludedIn = CURRENT_TIMESTAMP,
                    t.excludedBy = '${matricula}',
                    tdb.excluded = 1,
                    tdb.excludedIn = CURRENT_TIMESTAMP,
                    tdb.excludedBy = '${matricula}'        
                WHERE t.nr_unico IN (SELECT 
                                        to2.NR_UNICO 
                                    FROM demandas_gs.t100_demanda td 
                                    LEFT JOIN demandas_gs.t105_operacao to2 ON to2.t100_demanda_ID = td.ID
                                    WHERE td.id in (${array.array}))
                ;`,
                (error,results)=>{
                    if(error){
                        callback({error: 'no data returned'},undefined)
                    }else {
                        registraLog(matricula,'Despriozação de protocolos',(error,successo)=>{
                            if(error){
                                callback({error: 'no data returned'},undefined)
                            }else{
                                callback(undefined, {success: 'registro(s) salvo(s)'})
                            }
                        })
                    }
    })
}