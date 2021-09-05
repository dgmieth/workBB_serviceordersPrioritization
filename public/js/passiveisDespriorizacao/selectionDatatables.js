//====================================================================================================
//                                passiveisDespriorizacao.hbs
//====================================================================================================
//====================================================================================================
//                                         BOTOES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//              Envia ids de linhas selecionadas para servidor 
//----------------------------------------------------------------------------------------------------
$('#despriorizarBtn').click(function(){
   var idArray = new String()
   var tblData = $('#table-despriorizados-passiveis').DataTable().rows('.selected').data();
    $.each(tblData, function(i, val) {
        idArray = `${idArray}'${tblData[i].id}',`
    })
    idArray = idArray.substring(0,idArray.length-1)
    var dataObj = {
        array: idArray
    }
    document.getElementById('spinner').style.display = 'block'
    document.getElementById('table-despriorizados-todos-wrapper').style.display = 'none'
    setTimeout(() => {
        fetch('/savePassiveisDespriorizacao', {
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
                    fetch('/selectALLfromPassiveisDespriorizacao').then((response) =>{
                        response.json().then((data) => {
                            let table = $('#table-despriorizados-passiveis').DataTable()
                            table.clear()
                            table.rows.add(data).draw()
                            enablingButton()
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
    $('#table-despriorizados-passiveis').DataTable()
        .rows( '.selected' )
        .nodes()
        .to$() 
        .removeClass( 'selected' )
    enablingButton()
})