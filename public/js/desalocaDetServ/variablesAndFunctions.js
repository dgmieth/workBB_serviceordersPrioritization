//====================================================================================================
//                                 desalocarDetServ.hbs
//====================================================================================================
//====================================================================================================
//                                           VAR
//====================================================================================================
var chekcId = 0;
const desalocarBtn = document.getElementById('desalocarBtn')
const limparSelecaoBtn = document.getElementById('limparSelecaoBtn')
//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Trata objeto retornado da rota de serviços
//----------------------------------------------------------------------------------------------------
function tratarRelatorio(data){
    table = $('#table-det-serv-passiveis-desalocacao').DataTable({
        //configurando layout da tabela
        dom: 'lftipr',
        bScrollInfinite: true,
        bScrollCollapse: true,
        fixedHeader: true,
        paging: false,
        deferRender: true,
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
            {  "targets": 5}
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
            {data: 'ID', class:'d-none'},
            {data: 'idDetServ', class:'d-none'},
            {data: 'NOME'},
            {data: 'NOME_REDUZIDO', class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {data: 'AREA', class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell'},
            {
                data: 'alocadoEm',                 
                render: function(data){
                    return moment(data).format('DD-MM-YY')
                }
            },
            {data: 'alocadoPor',class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell'}

        ]  
    }),
    $('#table-det-serv-passiveis-desalocacao tbody').on( 'click', 'tr', function () {
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
    var contador = $('#table-det-serv-passiveis-desalocacao').DataTable().rows('.selected').count()
    if(contador>0){
        enableButtons(true)
        desalocarBtn.innerText = `Excluir da BBTS (${contador})`
        limparSelecaoBtn.innerText = `Limpar Seleção (${contador})`
    }else{
        desalocarBtn.innerText = `Exluir da BBTS`
        limparSelecaoBtn.innerText = `Limpar Seleção`
        enableButtons(false)
    }
}
function enableButtons(value){
    if(value){
        desalocarBtn.classList.remove('disabled')
        limparSelecaoBtn.classList.remove('disabled')
    }else{
        desalocarBtn.classList.add('disabled')
        limparSelecaoBtn.classList.add('disabled')
    }
    desalocarBtn.disabled = !value
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