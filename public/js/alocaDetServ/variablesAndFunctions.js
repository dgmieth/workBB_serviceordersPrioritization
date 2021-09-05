//====================================================================================================
//                                 alocarDetServ.hbs
//====================================================================================================
//====================================================================================================
//                                           VAR
//====================================================================================================
var chekcId = 0;
const alocarBtn = document.getElementById('alocarBtn')
const limparSelecaoBtn = document.getElementById('limparSelecaoBtn')
//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Trata objeto retornado da rota de servicos
//----------------------------------------------------------------------------------------------------
function tratarRelatorio(data){
    table = $('#table-det-serv-passiveis-alocacao').DataTable({
        //configurando layout da tabela
        dom: 'lftipr',
        bScrollInfinite: true,
        bScrollCollapse: true,
        fixedHeader: true,
        paging: false,
        deferRender: true,
        data: data,
        orderCellsTop: true,
        autoWidth:false,
        //configurando filtros da tabela

        //customizando o tamanho das colunas 
        fixedColumns:   {
            leftColumns: 2
        },
        columnDefs: [
            {  "targets": 0, className:"select-checkbox", orderable: false},
            {  "targets": 1},
            {  "targets": 2},
            {  "targets": 3},
            {  "targets": 4}
        ],
        columns: [
            {data: null, className: 'text-center',
                "width":"5%",
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                    chekcId += 1
                    return '<input type="checkbox" id="check_' + chekcId + '" class="check" name="check" value="'+ false +'" style="pointer-events:none">';
                },
            },
            {data: 'idDetServ', class:'d-none',"width":"0"},
            {data: 'NOME',"width":"35%"},
            {data: 'NOME_REDUZIDO', class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell',"width":"30%"},
            {data: 'AREA',"width":"30%"}
        ]  
    }),
    $('#table-det-serv-passiveis-alocacao tbody').on( 'click', 'tr', function () {
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
    var contador = $('#table-det-serv-passiveis-alocacao').DataTable().rows('.selected').count()
    if(contador>0){
        enableButtons(true)
        alocarBtn.innerText = `Alocar para BBTS (${contador})`
        limparSelecaoBtn.innerText = `Limpar Seleção (${contador})`
    }else{
        alocarBtn.innerText = `Alocar para BBTS`
        limparSelecaoBtn.innerText = `Limpar Seleção`
        enableButtons(false)
    }
}
function enableButtons(value){
    if(value){
        alocarBtn.classList.remove('disabled')
        limparSelecaoBtn.classList.remove('disabled')
    }else{
        alocarBtn.classList.add('disabled')
        limparSelecaoBtn.classList.add('disabled')
    }
    alocarBtn.disabled = !value
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