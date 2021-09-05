//====================================================================================================
//                                desalocarDetServ.hbs
//====================================================================================================
//====================================================================================================
//                                         BOTOES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//              Enviar ids de linhas selecionadas para servidor 
//----------------------------------------------------------------------------------------------------
$('#desalocarBtn').click(function(){
   var idArray = new String()
   var tblData = $('#table-det-serv-passiveis-desalocacao').DataTable().rows('.selected').data();
    $.each(tblData, function(i, val) {
        idArray = `${idArray}'${tblData[i].ID}',`
    })
    idArray = idArray.substring(0,idArray.length-1)
    var dataObj = {
        array: idArray
    }
    document.getElementById('spinner').style.display = 'block'
    document.getElementById('table-priorizados-todos-wrapper').style.display = 'none'
    setTimeout(() => {
        fetch('/saveDetSerPassivelExclusao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        }).then((response)=>{
            response.json().then((data) => {
                $(window).scrollTop(0)
                if(data.success){
                    successMsg.innerHTML= data.success
                    $('document').ready(function(){
                        $('#successAlert').show('fade')
                        $('#successAlertCloseBtn').click(function(){
                            $('#successAlert').hide('fade')
                        })
                    })
                }else if(data.error){
                    dangerMsg.innerHTML = data.error
                    $('document').ready(function(){
                        $('#dangerAlert').show('fade')
                        $('#dangerAlertCloseBtn').click(function(){
                            $('#dangerAlert').hide('fade')
                        })
                    })
                }else{
                    warningMsg.innerHTML = data.data
                    $('document').ready(function(){
                        $('#warningAlert').show('fade')
                        $('#warningAlertCloseBtn').click(function(){
                            $('#warningAlert').hide('fade')
                        })
                    })
                }
                alertTimeOut()
                fetch('/selectALLdetSerPassivelExclusao').then((response) =>{
                    response.json().then((data) => {
                        let table = $('#table-det-serv-passiveis-desalocacao').DataTable()
                        table.clear()
                        table.rows.add(data).draw()
                        enablingButton()
                    })
                })
            })
        })
    }, 0);
    
})
//----------------------------------------------------------------------------------------------------
//                      Botao Deselecionar - deselecionar todas as linhas
//----------------------------------------------------------------------------------------------------
$('#limparSelecaoBtn').click(function(){
    var arraySelected = document.getElementsByClassName('selected')
    for (let e of arraySelected){
        var input = e.firstChild.firstChild
        input.checked = false
    }
    $('#table-det-serv-passiveis-desalocacao').DataTable()
        .rows( '.selected' )
        .nodes()
        .to$() 
        .removeClass( 'selected' )
    enablingButton()
})