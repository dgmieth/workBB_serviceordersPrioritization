//====================================================================================================
//                                  passiveisPriorizacao.hbs
//====================================================================================================
//====================================================================================================
//                                           VAR
//====================================================================================================
var chekcId = 0;
const priorizarBtn = document.getElementById('priorizarBtn')
const limparSelecaoBtn = document.getElementById('limparSelecaoBtn')
//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Trata objeto retornado da rota de serviços
//----------------------------------------------------------------------------------------------------
function tratarRelatorio(data){
    table = $('#table-priorizados-passiveis').DataTable({
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
            {  "targets": 8}
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
            {data: 'mci_principal',class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell'},
            {data: 'etapa_nome'},
            {data: 'det_serv_nome',class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {
                data: 'DT_INICIO',
                class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell',
                render: function(data){
                    return moment(data).format('DD-MM-YY')
                }
            },
            {
                data: 'DT_PRAZO_SLA',                
                render: function(data){
                    return moment(data).format('DD-MM-YY')
                }
            },
            {
                data: 'DT_CONCLUSAO', 
                class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell',               
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
            }     
        ]  
    }),
    $('#table-priorizados-passiveis tbody').on( 'click', 'tr', function () {
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
    var contador = $('#table-priorizados-passiveis').DataTable().rows('.selected').count()
    if(contador>0){
        enableButtons(true)
        priorizarBtn.innerText = `Priorizar (${contador})`
        limparSelecaoBtn.innerText = `Limpar Seleção (${contador})`
    }else{
        priorizarBtn.innerText = `Priorizar`
        limparSelecaoBtn.innerText = `Limpar Seleção`
        enableButtons(false)
    }
}
function enableButtons(value){
    if(value){
        priorizarBtn.classList.remove('disabled')
        limparSelecaoBtn.classList.remove('disabled')
    }else{
        priorizarBtn.classList.add('disabled')
        limparSelecaoBtn.classList.add('disabled')
    }
    priorizarBtn.disabled = !value
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
        document.getElementById('table-priorizados-todos-wrapper').style.display = 'block'
    },5000)
}