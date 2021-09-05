//====================================================================================================
//                                passiveisPriorizacao.hbs
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Busca filtros Setados na rota de serviço
//----------------------------------------------------------------------------------------------------
fetch('/selectALLfromPassiveisPriorizacao').then((response)=>{
    response.json().then((data)=>{
        tratarRelatorio(data)
        enablingButton()
        document.getElementById('spinner').style.display = 'none'
        document.getElementById('table-priorizados-todos-wrapper').style.display = 'block'
    })
})