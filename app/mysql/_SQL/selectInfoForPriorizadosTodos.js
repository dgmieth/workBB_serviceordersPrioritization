const { createPool } = require('mysql')
var mysql = require('../mysql')
//==================================================================================
//                   CRIA OBJETO PARA FRONT END ROTA /todosNew 
//==================================================================================
module.exports = (callback)=> {
	var arrayAreas = []
	var arrayGerecs = []
	var todosProtocolosPriorizados = []
	var gerenciamentoPriorizadosPorGerec = []
    mysql.query(sql,(err,results)=>{
        if(err){
			console.log(err)
            callback(false)
        }else {
			arrayAreas = createInformationArray(results[0],'AREA')
			arrayGerecs = createInformationArray(results[1],'GEREC')
			todosProtocolosPriorizados = results[2]
			gerenciamentoPriorizadosPorGerec = results[3]
            callback(null, {arrayAreas, arrayGerecs, todosProtocolosPriorizados,gerenciamentoPriorizadosPorGerec})
        }
    })
}


function createInformationArray(dataArray,type){
    var finalArray = []
	var fieldOne
	var fieldTwo
	var object = {}
	var objectTwo = {}
	var newObject = false
	dataArray.forEach((element,index)=>{
        //console.log(type==='AREA' ? element.NOME_GEREC : element.area)
		if(fieldOne===(type==='AREA' ? element.area : element.NOME_GEREC)){
			if(fieldTwo===(type==='AREA' ? element.NOME_GEREC : element.SERVICO)){
				objectTwo.results.push({periodo: element.PERIODO, priorizados: element.PRIORIZACOES})
			}else {
				object.fieldTwo.push(objectTwo)
				objectTwo = {}
				objectTwo.fieldTwo = (type==='AREA' ? element.NOME_GEREC : element.SERVICO)
				objectTwo.results = []
				objectTwo.results.push({periodo: element.PERIODO, priorizados: element.PRIORIZACOES})
			}

		}else{
			if(newObject===true){
                object.fieldTwo.push(objectTwo)
				finalArray.push(object)
			}
			object = {}
			object.fieldOne = (type==='AREA' ? element.area : element.NOME_GEREC)
			object.fieldTwo = []
			objectTwo = {}
			objectTwo.fieldTwo = (type==='AREA' ? element.NOME_GEREC : element.SERVICO)
			objectTwo.results = []
			objectTwo.results.push({periodo: element.PERIODO, priorizados: element.PRIORIZACOES})
		}
		fieldOne = (type==='AREA' ? element.area : element.NOME_GEREC)
		fieldTwo = (type==='AREA' ? element.NOME_GEREC : element.SERVICO)
        newObject = true
        if(index === dataArray.length - 1){
            object.fieldTwo.push(objectTwo)
            finalArray.push(object)
        }
	})
	return(finalArray)
}


//==================================================================================
//                          SQL STATEMENT
//==================================================================================
const sql = `
/* busca protocolos por area, GEREC*/
SELECT 
	t1.area,
	t1.NOME_GEREC,
	/*t1.NOME_GEREC,*/
	COUNT(t1.protocolo) as PRIORIZACOES,
	t1.PERIODO
FROM (SELECT 
	t.PREF_DEMANDANTE,
	CASE 
		WHEN t.GEREC IS NOT NULL
		THEN t.GEREC 
		ELSE 'BBTS'
	END as GEREC,
	CASE 
		WHEN t.NOME_GEREC IS NOT NULL
		THEN t.NOME_GEREC 
		ELSE 'Sistema Priozação BBTS'
	END as NOME_GEREC,
	t.PROTOCOLO,
	t.AREA ,
	t.ETAPA,
	t.DT_INICIO ,
	t.DT_INCLUSAO_PRIORIZACAO ,
	CONCAT(CASE
				WHEN MONTH(t.DT_INCLUSAO_PRIORIZACAO) < 10
				THEN CONCAT('0',MONTH(t.DT_INCLUSAO_PRIORIZACAO))
				ELSE MONTH(DT_INCLUSAO_PRIORIZACAO)
			END,'/',YEAR(DT_INCLUSAO_PRIORIZACAO)) AS PERIODO,
	t.DT_PRAZO_SLA ,
	t.SERVICO,
	t.DETALHE_SERVICO,
	t.MATR_RESP,
	t.SIS_PRIORIZACAO 
FROM priorizacaoProtocolos.view_priorizadosTodos t) t1
WHERE t1.PERIODO IS NOT NULL
GROUP BY t1.area, t1.NOME_GEREC, t1.PERIODO
ORDER BY t1.AREA, t1.NOME_GEREC,t1.DT_INCLUSAO_PRIORIZACAO;
/* busca protocolos por GEREC, area*/
SELECT 
	t1.NOME_GEREC,
	t1.SERVICO,
	COUNT(t1.protocolo) as PRIORIZACOES,
	t1.PERIODO
FROM (SELECT 
	t.PREF_DEMANDANTE,
	CASE 
		WHEN t.GEREC IS NOT NULL
		THEN t.GEREC 
		ELSE 'BBTS'
	END as GEREC,
	CASE 
		WHEN t.NOME_GEREC IS NOT NULL
		THEN t.NOME_GEREC 
		ELSE 'Sistema Priozação BBTS'
	END as NOME_GEREC,
	t.PROTOCOLO,
	t.AREA ,
	t.ETAPA,
	t.DT_INICIO ,
	t.DT_INCLUSAO_PRIORIZACAO ,
	CONCAT(CASE
				WHEN MONTH(t.DT_INCLUSAO_PRIORIZACAO) < 10
				THEN CONCAT('0',MONTH(t.DT_INCLUSAO_PRIORIZACAO))
				ELSE MONTH(DT_INCLUSAO_PRIORIZACAO)
			END,'/',YEAR(DT_INCLUSAO_PRIORIZACAO)) AS PERIODO,
	t.DT_PRAZO_SLA ,
	t.SERVICO,
	t.DETALHE_SERVICO,
	t.MATR_RESP,
	t.SIS_PRIORIZACAO 
FROM priorizacaoProtocolos.view_priorizadosTodos t) t1
WHERE t1.PERIODO IS NOT NULL
GROUP BY t1.NOME_GEREC, t1.SERVICO, t1.PERIODO
ORDER BY t1.NOME_GEREC, t1.SERVICO, t1.DT_INCLUSAO_PRIORIZACAO;
/*seleciona todos os protocolos priorizados do demandas*/
SELECT 
	t.PREF_DEMANDANTE,
	CASE 
		WHEN t.GEREC IS NOT NULL
		THEN t.GEREC 
		ELSE 'BBTS'
	END as GEREC,
	CASE 
		WHEN t.NOME_GEREC IS NOT NULL
		THEN t.NOME_GEREC 
		ELSE 'Sistema Priozação BBTS'
	END as NOME_GEREC,
	t.PROTOCOLO,
	t.AREA ,
	t.ETAPA,
	DATE_FORMAT(t.DT_INICIO, '%d/%m/%y') as DT_INICIO ,
	DATE_FORMAT(t.DT_INCLUSAO_PRIORIZACAO, '%d/%m/%y') as DT_INCLUSAO_PRIORIZACAO ,
	CONCAT(CASE
				WHEN MONTH(t.DT_INCLUSAO_PRIORIZACAO) < 10
				THEN CONCAT('0',MONTH(t.DT_INCLUSAO_PRIORIZACAO))
				ELSE MONTH(DT_INCLUSAO_PRIORIZACAO)
			END,'/',YEAR(DT_INCLUSAO_PRIORIZACAO)) AS PERIODO,
    DATE_FORMAT(t.DT_PRAZO_SLA, '%d/%m/%y') as DT_PRAZO_SLA ,
	t.SERVICO,
	t.DETALHE_SERVICO,
	t.MATR_RESP,
	t.SIS_PRIORIZACAO 
FROM priorizacaoProtocolos.view_priorizadosTodos t;
/*seleciona quantos protocolos cada gerec pode priorizar por mês/semana*/
SELECT
	t.Código AS CODIGO,
    t.Gerec AS GEREC,
    t.Prefixo AS PREFIXO,
    t.Nome AS NOME,
    t.Nome_Gerec AS NOME_GEREC,
    t.Area AS AREA,
    t.Lim_Semanal AS LIM_SEMANAL,
    t.Lim_Mensal AS LIM_MENSAL
FROM priorizacaoProtocolos.view_Gerec_Qtd_Lim t;
`