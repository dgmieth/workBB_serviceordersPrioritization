//====================================================================================================
//                                passiveisPriorizacao.hbs
//====================================================================================================
//====================================================================================================
//                                         BOTOES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//              Envia ids de linhas selecionadas para servidor 
//----------------------------------------------------------------------------------------------------
$('#priorizarBtn').click(function(){
   var idArray = new String()
   var tblData = $('#table-priorizados-passiveis').DataTable().rows('.selected').data();
    $.each(tblData, function(i, val) {
        idArray = `${idArray}'${tblData[i].id}',`
    })
    idArray = idArray.substring(0,idArray.length-1)
    var dataObj = {
        array: idArray
    }
    document.getElementById('spinner').style.display = 'block'
    document.getElementById('table-priorizados-todos-wrapper').style.display = 'none'
    setTimeout(() => {
        fetch('/savePassiveisPriorizacao', {
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
                    let table = $('#table-priorizados-passiveis').DataTable()
                    var rows = table.rows('.selected').remove().draw()
                    priorizarBtn.innerText = `Priorizar`
                    limparSelecaoBtn.innerText = `Limpar Seleção`
                    enableButtons(false)
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
    $('#table-priorizados-passiveis').DataTable()
        .rows( '.selected' )
        .nodes()
        .to$() 
        .removeClass( 'selected' )
    enablingButton()
})