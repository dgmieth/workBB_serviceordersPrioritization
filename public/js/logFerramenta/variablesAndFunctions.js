//====================================================================================================
//                                      logFerramenta.hbs
//====================================================================================================
//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                                     Trata objeto retornado
//----------------------------------------------------------------------------------------------------

function tratarRelatorio(data){
    table = $('#table-log').DataTable({
        //configurando layout da tabela
        paging: false,
        deferRender: true,
        dom: 'Bfrtip',
        bScrollInfinite: true,
        bScrollCollapse: true,
        fixedHeader: true,
        orderCellsTop: true,
        data: data,
        
        //configurando filtros da tabela

        //customizando o tamanho das colunas 
       columnDefs: [
            {  "targets": 0, "width":"100px"},
            {  "targets": 1, "width":"100px"},
            {  "targets": 2, "width":"40px"},
            {  "targets": 3, "width":"40px"}
        ],
        order: [[0, 'desc']],
        columns: [
            {data: 'id', class:"d-none"},
            {data: 'databaseUser', class:"d-table-cell d-sm-table-cell d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'description', class:"d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell"},
            {
                data: 'currentTimeStamp', 
                class: 'd-table-cell d-sm-table-cell d-md-table-cell d-lg-table-cell d-xl-table-cell',
                render: function(data){
                    return moment(data).format('DD-MM-YY')
                }
            },
        ]
        
    })
}