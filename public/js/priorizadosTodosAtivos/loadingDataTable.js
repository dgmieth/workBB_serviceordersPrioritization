//====================================================================================================
//           priorizadosTodosAtivos.hbs
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Busca filtros Setados na rota de serviço
//----------------------------------------------------------------------------------------------------
fetch('/selectALLfromPriorizadosTodosAtivos').then((response)=>{
    response.json().then((data)=>{
        tratarRelatorio(data)
        document.getElementById('spinner').style.display = 'none'
        document.getElementById('table-priorizados-todos-wrapper').style.display = 'block'
    })
})