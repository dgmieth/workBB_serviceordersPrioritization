//====================================================================================================
//                                passiveisDespriorizacao.hbs
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Busca filtros Setados na rota de serviços
//----------------------------------------------------------------------------------------------------
fetch('/selectALLfromPassiveisDespriorizacao').then((response)=>{
    response.json().then((data)=>{
        tratarRelatorio(data)
        enablingButton()
        document.getElementById('spinner').style.display = 'none'
        document.getElementById('table-despriorizados-todos-wrapper').style.display = 'block'
    })
})