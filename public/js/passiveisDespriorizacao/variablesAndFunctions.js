//====================================================================================================
//                                 passiveisDespriorizacao.hbs
//====================================================================================================
//====================================================================================================
//                                           VAR
//====================================================================================================
var chekcId = 0;
const despriorizarBtn = document.getElementById('despriorizarBtn')
const limparSelecaoBtn = document.getElementById('limparSelecaoBtn')
//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Trata objeto retornado da rota de servicos
//----------------------------------------------------------------------------------------------------
function tratarRelatorio(data){
    table = $('#table-despriorizados-passiveis').DataTable({
        //configurando layout da tabela
        dom: 'lftipr',
        deferRender: true,
        lengthChange: true,
        lengthMenu: [[100, 200, 500, 1000, 2500, -1], [100, 200, 500, 1000, 2500, "All"]],
        fixedHeader: true,
        data: data,
        orderCellsTop: true,
        
        //configurando filtros da tabela

        //customizando o tamanho das colunas 
        fixedColumns:   {
            leftColumns: 2
        },
        columnDefs: [
            {  "targets": 0, className:"select-checkbox", orderable: false, width:"5px"},
            {  "targets": 1},
            {  "targets": 2},
            {  "targets": 3},
            {  "targets": 4},
            {  "targets": 5},
            {  "targets": 6},
            {  "targets": 7},
            {  "targets": 8},
            {  "targets": 9},
            {  "targets": 10}
        ],
        columns: [
            {data: null, className: 'text-center',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                    chekcId += 1
                    return '<input type="checkbox" id="check_' + chekcId + '" class="check" name="check" value="'+ false +'" style="pointer-events:none">';
                },
            },
            {data: 'id', class:'d-none'},
            {data: 'PROTOCOLO'},
            {data: 'ETAPA',class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell'},
            {data: 'DET_SERV_NOME',class:'d-none d-sm-none d-md-table-cell d-lg-table-cell d-xl-table-cell'},
            {
                data: 'DT_INICIO',
                render: function(data){
                    return moment(data).format('DD-MM-YY')
                }
            },
            {
                data: 'DT_PRAZO_SLA', 
                class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell',               
                render: function(data){
                    return moment(data).format('DD-MM-YY')
                }
            },
            {
                data: 'DT_CONCLUSAO',     
                class:'d-none d-sm-none d-md-table-cell d-lg-table-cell d-xl-table-cell',           
                render: function(data){
                    if(data === null){
                        return ''
                    }
                    return moment(data).format('DD-MM-YY')
                }
            },
            {
                data: 'DT_PRAZO_CLIENTE',      
                class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell',           
                render: function(data){
                    return moment(data).format('DD-MM-YY')
                }
            },
            {
                data: 'priorizadaEm',                 
                render: function(data){
                    return moment(data).format('DD-MM-YY')
                }
            },
            {data: 'priorizadaPor',class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell'}

        ]  
    }),
    $('#table-despriorizados-passiveis tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected')
        var inp = document.getElementById(`${$(this).find('td input')[0].id}`)
        var vl = inp.checked
        inp.checked = !vl
        enablingButton()
    } )
    $('#button').click( function () {
        alert(table.rows('.selected').data().length +' row(s) selected' );
    } )
}
//----------------------------------------------------------------------------------------------------
//                                         Enable/disable buttons
//----------------------------------------------------------------------------------------------------
function enablingButton(){
    var contador = $('#table-despriorizados-passiveis').DataTable().rows('.selected').count()
    if(contador>0){
        enableButtons(true)
        despriorizarBtn.innerText = `Despriorizar (${contador})`
        limparSelecaoBtn.innerText = `Limpar Seleção (${contador})`
    }else{
        despriorizarBtn.innerText = `Despriorizar`
        limparSelecaoBtn.innerText = `Limpar Seleção`
        enableButtons(false)
    }
}
function enableButtons(value){
    if(value){
        despriorizarBtn.classList.remove('disabled')
        limparSelecaoBtn.classList.remove('disabled')
    }else{
        despriorizarBtn.classList.add('disabled')
        limparSelecaoBtn.classList.add('disabled')
    }
    despriorizarBtn.disabled = !value
    limparSelecaoBtn.disabled = !value
}
//----------------------------------------------------------------------------------------------------
//                                          Time out para alerts
//----------------------------------------------------------------------------------------------------
function alertTimeOut(){
    setTimeout(()=>{
        $('#successAlert').hide('fade')
        $('#dangerAlert').hide('fade')
        $('#warningAlert').hide('fade')
        document.getElementById('spinner').style.display = 'none'
        document.getElementById('table-despriorizados-todos-wrapper').style.display = 'block'
    },5000)
}