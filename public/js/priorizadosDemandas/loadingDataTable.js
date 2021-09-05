//====================================================================================================
//                                      priorizadosDemandas.hbs
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Busca filtros Setados na rota de serviços
//----------------------------------------------------------------------------------------------------
fetch('/selectALLfromPriorizadosDemandas').then((response)=>{
    response.json().then((data)=>{
        tratarRelatorio(data)
        document.getElementById('spinner').style.display = 'none'
        document.getElementById('table-priorizados-demandas-wrapper').style.display = 'block'
    })
})