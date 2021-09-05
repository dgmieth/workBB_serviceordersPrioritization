//====================================================================================================
//                                         priorizadosDemandas.hbs
//====================================================================================================
//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Trata objeto retornado da rota de serviço
//----------------------------------------------------------------------------------------------------
function tratarRelatorio(data){
    table = $('#table-priorizados-demandas').DataTable({
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
            {  "targets": 0},
            {  "targets": 1},
            {  "targets": 2},
            {  "targets": 3},
            {  "targets": 4},
            {  "targets": 5},
            {  "targets": 6},
            {  "targets": 7},
            {  "targets": 8, type: 'currency'},
            {  "targets": 9},
            {  "targets": 10},
            {  "targets": 11},
            {  "targets": 12}
        ],
        columns: [
            {data: 'PROTOCOLO'},
            {data: 'SERVICO', class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {data: 'DETALHE_SERVICO', class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {data: 'AREA', class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {data: 'ETAPA'},
            {data: 'PREF_DEMANDANTE', class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {data: 'GEREC', class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell'},
            {data: 'NOME_GEREC', class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell'},
            {
                data: 'VALOR_NEGOCIO',
                class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell',
                render: $.fn.dataTable.render.number(',','.',2,'R$')
            },
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
                data: 'DT_INCLUSAO_PRIORIZACAO', 
                render: function(data){
                    if(data === null){
                        return ''
                    }
                    return moment(data).format('DD-MM-YY')
                }
            }          
        ]
        
    })
}