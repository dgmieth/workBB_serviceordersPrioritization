//====================================================================================================
//                                      logFerramenta.hbs
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                               Busca relatorio na rota de serviços
//----------------------------------------------------------------------------------------------------
fetch('/select500fromLog').then((response) =>{
    response.json().then((data) => {
        tratarRelatorio(data)
        document.getElementById('spinner').style.display = 'none'
        document.getElementById('table-priorizados-todos-wrapper').style.display = 'block'
    })
})
