//====================================================================================================
//                                         priorizadosBBTS.hbs
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Busca filtros Setados na rota /retornaFiltrosSetados
//----------------------------------------------------------------------------------------------------
fetch('/selectALLfromBBTSProtPriorizados').then((response)=>{
    response.json().then((data)=>{
        tratarRelatorio(data)
        document.getElementById('spinner').style.display = 'none'
        document.getElementById('table-priorizados-todos-wrapper').style.display = 'block'
    })
})