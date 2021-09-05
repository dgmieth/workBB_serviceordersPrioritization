//====================================================================================================
//                                         priorizadosTodosAtivos.hbs
//====================================================================================================
//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Trata objeto retornado da rota de serviços
//----------------------------------------------------------------------------------------------------
function tratarRelatorio(data){
    table = $('#table-priorizados-todos').DataTable({
        //configurando layout da tabela
        dom: 'lftipr',
        deferRender: true,
        lengthChange: true,
        lengthMenu: [[100, 200, 500, 1000,  -1], [100, 200, 500, 1000, "All"]],
        data: data,
        orderCellsTop: true,
        fixedHeader: true,
        
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
            {  "targets": 12},
            {  "targets": 13}
        ],
        columns: [
            {data: 'PROTOCOLO'},
            {data: 'servico', class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {data: 'detalhe_servico', class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {data: 'area', class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {data: 'etapa', class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {data: 'PREF_DEMANDANTE', class:'d-none d-sm-none d-md-none d-lg-none d-xl-table-cell'},
            {data: 'Gerec', class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell'},
            {data: 'Nome_Gerec', class:'d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell'},
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
                data: 'dt_inclusao_priorizacao', 
                
                render: function(data){
                    if(data === null){
                        return ''
                    }
                    return moment(data).format('DD-MM-YY')
                }
            },
            {data: 'SIS_PRIORIZACAO'},          
        ]
        
    })
    
}