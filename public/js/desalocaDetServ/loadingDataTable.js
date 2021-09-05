//====================================================================================================
//                                desalocarDetServ.hbs
//====================================================================================================
//====================================================================================================
//           BUSCA QTDE DE REGISTROS PARA CONFIGURAÇCOES ATUAIS NA LOAD DA PAGE SOMENTE
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Busca filtros Setados na rota de serviços
//----------------------------------------------------------------------------------------------------
fetch('/selectALLdetSerPassivelExclusao').then((response)=>{
    response.json().then((data)=>{
        tratarRelatorio(data)
        enablingButton()
        document.getElementById('spinner').style.display = 'none'
        document.getElementById('table-priorizados-todos-wrapper').style.display = 'block'
    })
})