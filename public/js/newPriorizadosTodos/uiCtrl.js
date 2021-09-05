class UICtrl {
    constructor(){
        this.spinningWrapper = document.getElementById('spinning-wrapper')
        this.firstLevelGraphics = document.getElementById('first-level-graphics')
        this.areasChartOneWrapper = document.getElementById('areas-chart-1-wrapper')
        this.areasChartOneChart 
        this.gerecsChartOneWrapper = document.getElementById('gerecs-chart-1-wrapper')
        this.gerecsChartOneChart
        this.secondLevelGraphics = document.getElementById('second-level-graphics')
        this.areasChartTwoWrapper = document.getElementById('areas-chart-2-wrapper')
        this.areasChartTwoChart
        this.gerecsChartTwoWrapper = document.getElementById('gerecs-chart-2-wrapper')
        this.gerecsChartTwoChart
        this.protocolosWrapper = document.getElementById('protocolos-wrapper')
        this.colorObject = {
            areasColor: '#dfdfe0',
            areasLineColor: '#dfdfe04d',
            gerecsColor: '#fde2b9',
            gerecsLineColor: '#fde2b94d'
        }
        this.hichartsTitleHeight = {
            firstLevel: 110,
            secondLevel: 135,
            thirdLevel: 135
        }
    }
    //==============================================================================================================================
    //==============================================================================================================================
    //==============================================================================================================================
    //FIRST LEVEL CHARTS
    //create first level chart
    createFirstLevelChart(dataCtrl,areas_gerecs){
        var dataArray = []
        dataCtrl.returnSelectedData(`${areas_gerecs}`).forEach(element => {
            var total = 0
            element.fieldTwo.forEach(gerec =>{
                gerec.results.forEach(result =>{
                    total = total + result.priorizados
                })
            })
            dataArray.push({name: element.fieldOne, y: total, id: element.fieldOne, className: `${(areas_gerecs==='areas' ? 'areas' : 'gerecs')} 1stlevel ${element.fieldOne}`})
            total = 0
        })
        Highcharts.chart((areas_gerecs === 'areas' ? this.areasChartOneWrapper.id : this.gerecsChartOneWrapper.id),{
            credits: {
                enabled: false
            },
            chart: {
                id: `${areas_gerecs}1`,
                plotBackgroundColor: (areas_gerecs==='areas' ? this.colorObject.areasColor : this.colorObject.gerecsColor),
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: (areas_gerecs==='areas' ? 'Áreas' : 'Gerecs'),
                align: 'center',
                verticalAlign: 'middle',
                fontWeight: 'bold',
                fontColor: 'white',
                y: this.hichartsTitleHeight.firstLevel
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false,
                        distance: 15,
                        style: {
                            fontWeight: 'bold',
                            color: 'black'
                        }
                    },
                    startAngle: -100,
                    endAngle: 100,
                    center: ['50%', '90%'],
                    size: '150%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Priorizações',
                innerSize: '45%',
                data: dataArray,
                dataLabels: {
                    enabled: true,
                    className: `${areas_gerecs}1`
                }
            }]
        })
    }
    //deleteFirstLevelchart
    deleteFirstLevelChart(areas_gerecs){
        areas_gerecs==='areas' ? this.areasChartOneWrapper.childNodes[0].remove() : this.gerecsChartOneWrapper.childNodes[0].remove()
    }
    //==============================================================================================================================
    //==============================================================================================================================
    //==============================================================================================================================
    //SECOND LEVEL CHARTS
    //create second level chart
    createSecondLevelChart(dataCtrl,appCtrl){
        var dataArray = dataCtrl.returnDataSecondLevelChart()
        var areas_gerecs
        if((dataCtrl.getTempDataObj()).areas_gerecs==='areas'){
            areas_gerecs = (dataCtrl.getTempDataObj()).areas_gerecs
            appCtrl.setSecondLevelAppState((appCtrl.getSecondLevelStates()).gerecs)
        }else if ((dataCtrl.getTempDataObj()).areas_gerecs==='gerecs'){
            areas_gerecs = (dataCtrl.getTempDataObj()).areas_gerecs
            appCtrl.setSecondLevelAppState((appCtrl.getSecondLevelStates()).servicos)
        }
        Highcharts.chart((areas_gerecs === 'areas' ? this.areasChartTwoWrapper.id : this.gerecsChartTwoWrapper.id),{
            credits: {
                enabled: false
            },
            chart: {
                id:  `${areas_gerecs}1`,
                plotBackgroundColor: (areas_gerecs==='areas' ? this.colorObject.areasColor : this.colorObject.gerecsColor),
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: dataCtrl.getTempDataObj().fieldOne,
                align: 'center',
                verticalAlign: 'middle',
                y: this.hichartsTitleHeight.secondLevel
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: 10,
                        style: {
                            fontWeight: 'bold',
                            color: 'black'
                        },
                        className: `${areas_gerecs}2`
                    },
                    startAngle: 0,
                    endAngle: 0,
                    center: ['50%', '45%'],
                    size: '70%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Priorizações',
                innerSize: '0%',
                data: dataArray
            }]
        })
    }
    //delete second Level chart
    deleteSecondLevelChart(appCtrl){
        var chartIndex = []
        this.deleteTableResults()
        if(this.areasChartTwoWrapper.childNodes.length>0){
            for (const node of this.areasChartTwoWrapper.childNodes) {
                node.remove()
            }
        }
        if(this.gerecsChartTwoWrapper.childNodes.length > 0){
            for (const node of this.gerecsChartTwoWrapper.childNodes) {
                node.remove()
            }
        }
        if(Highcharts.charts.length > 0){
            Highcharts.charts.forEach((chart,index) =>{
                if(chart.title.textStr!=='Áreas'&&chart.title.textStr!=='Gerecs'){
                    chartIndex.push(index)
                }
            })
            chartIndex.reverse().forEach(index => {
                Highcharts.charts[index].destroy()
                Highcharts.charts.splice(index,1)
            })
        }
    }
    //==============================================================================================================================
    //==============================================================================================================================
    //==============================================================================================================================
    //THIRD LEVEL CHARTS
    //create third level chart
    createThirdLevelChart(dataCtrl,appCtrl){
        var dataArray = dataCtrl.returnDataThirdLevelChart()
        var areas_gerecs
        if((dataCtrl.getTempDataObj()).areas_gerecs==='areas'){
            areas_gerecs = (dataCtrl.getTempDataObj()).areas_gerecs
        }else if ((dataCtrl.getTempDataObj()).areas_gerecs==='gerecs'){
            areas_gerecs = (dataCtrl.getTempDataObj()).areas_gerecs
        }
        Highcharts.chart((areas_gerecs === 'areas' ? this.gerecsChartTwoWrapper.id : this.areasChartTwoWrapper.id),{
            credits: {
                enabled: false
            },
            chart: {
                id:  `${areas_gerecs}3`,
                plotBackgroundColor: (areas_gerecs==='areas' ? this.colorObject.areasColor : this.colorObject.gerecsColor),
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: `Períodos`,
                align: 'center',
                verticalAlign: 'middle',
                y: this.hichartsTitleHeight.thirdLevel
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: 5,
                        style: {
                            fontWeight: 'bold',
                            color: 'black'
                        },
                        className: `${areas_gerecs}3`
                    },
                    startAngle: 0,
                    endAngle: 0,
                    center: ['50%', '45%'],
                    size: '86%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Priorizações',
                innerSize: '0%',
                data: dataArray
            }]
        })
    }
    //delete third level chart
    deleteThirdLevelChart(){
        this.deleteTableResults()
        if(Highcharts.charts.length > 3){
            Highcharts.charts[3].destroy()
            Highcharts.charts.splice(3,1)
        }
    }
    //==============================================================================================================================
    //==============================================================================================================================
    //==============================================================================================================================
    //THIRD LEVEL CHARTS
    createTableResults(dataCtrl,appCtrl){
        this.deleteTableResults()
        const results = dataCtrl.filterProtocolos()
        const totais = dataCtrl.returnTotalAllowedPrioritizedQty()
        var innerTable = ''
        var innerTableTr =''
        var th = ''
        var tr = ''
        var header = ''
        totais.forEach(e =>{
            var color = (e.MES_USADO > e.MES_DISP ? 'bg-danger text-white' : '')
            var strongTextStart = ''
            var strongTextStop = ''
            if(e.MES_USADO>=e.MES_DISP){
                color = 'bg-danger text-white'
                strongTextStart = '<strong>'
                strongTextStop = '</strong>'
            } else if(e.MES_USADO<e.MES_DISP && e.MES_USADO>=(e.MES_DISP-5) && e.MES_DISP>=5){
                color = 'bg-warning text-dark'
                strongTextStart = '<strong>'
                strongTextStop = '</strong>'
            }else{
                color = 'bg-primary text-white'
                strongTextStart = ''
                strongTextStop = ''
            }
            innerTableTr = `
            ${innerTableTr}
            <tr">
                <td class="${color} text-center">${strongTextStart}${e.NOME_GEREC}${strongTextStop}</td>
                <td class="${color} text-center">${strongTextStart}${e.prefixo}${strongTextStop}</td>
                <td class="${color} text-center">${strongTextStart}${e.AREA}${strongTextStop}</td>
                <td class="${color} text-center">${strongTextStart}${e.MES_DISP}${strongTextStop}</td>
                <td class="${color} text-center">${strongTextStart}${e.MES_USADO}${strongTextStop}</td>
            </tr>
            `
        })
        innerTable = `
        ${innerTable}
        <p class="h6 text-center" style="margin:0;margin-bottom:5px;margin-top:15px"><strong>Priorizações dipsoníveis/usadas por Gerec período ${dataCtrl.getTempDataObj().period}</strong></p>
        <div class="container" style="padding:0 300px">
            <table class="table table-sm mx-auto" >
                <thead class="thead-dark">
                    <th class="text-center">Nome GEREC</th>
                    <th class="text-center">Prefixo</th>
                    <th class="text-center">Área</th>
                    <th class="text-center">Priorizações/mês</th>
                    <th class="text-center">Usadas/mês</th>
                </thead>
                <tbody>
                ${innerTableTr}
                </tbody>
            </table>
        </div>
        `
        if(dataCtrl.getTempDataObj().areas_gerecs ==='areas'){
            header = `
            <p class="h5 text-center" style="margin:0!important;margin-top:3px">${dataCtrl.getTempDataObj().fieldOne}</strong></p>
            <p class="h6 text-center" style="margin:0;">Gerec:<strong> ${dataCtrl.getTempDataObj().fieldTwo}</strong></p>
            <p class="h6 text-center" style="margin:0;margin-bottom:3px">Período:<strong> ${dataCtrl.getTempDataObj().period}</strong></p>
            ${innerTable}
            `
            th = `
            <th scope="col">Protocolo</th>
            <th scope="col">Etapa</th>
            <th scope="col">Serviço</th>
            <th scope="col">Data Início</th>
            <th scope="col">Prazo SLA</th>
            <th scope="col">Priorização</th>
            <th scope="col">Demandante</th>
            `
        }else{
            header = `
            <p class="h5 text-center" style="margin:0;margin-top:3px">${dataCtrl.getTempDataObj().fieldOne}</strong></p>
            <p class="h6 text-center" style="margin:0;">Serviço:<strong> ${dataCtrl.getTempDataObj().fieldTwo}</strong></p>
            <p class="h6 text-center" style="margin:0;margin-bottom:3px">Período:<strong> ${dataCtrl.getTempDataObj().period}</strong></p>
            ${innerTable}
            `
            th = `
            <th scope="col">Protocolo</th>
            <th scope="col">Etapa</th>
            <th scope="col">Área</th>
            <th scope="col">Data Início</th>
            <th scope="col">Prazo SLA</th>
            <th scope="col">Priorização</th>
            <th scope="col">Demandante</th>
            `
        }
        //div.innerHTML = `<h1 style="color:black">${dataCtrl.getTempDataObj().period}</h1>`
        results.forEach((result,index) =>{
            var changeableTd = dataCtrl.getTempDataObj().areas_gerecs ==='areas' ? `<td>${result.SERVICO}</td>` : `<td>${result.AREA}</td>`
            if(!(index%2)){
                tr = `${tr}
                <tr style="background-color:${dataCtrl.getTempDataObj().areas_gerecs ==='areas' ? this.colorObject.areasLineColor : this.colorObject.gerecsLineColor}">`
            }else{
                tr = `${tr}
                <tr>`
            }
            tr = `${tr}
                <td scope="row">${result.PROTOCOLO}</td>
                <td>${result.ETAPA}</td>
                ${changeableTd}
                <td>${result.DT_INICIO}</td>
                <td>${result.DT_PRAZO_SLA}</td>
                <td>${result.DT_INCLUSAO_PRIORIZACAO}</td>
                <td>${result.PREF_DEMANDANTE}</td>
            </tr>
            `
        })
        this.protocolosWrapper.innerHTML = `
        <div id="table-results-wrapper" class=".fuild-container" style="border:4px solid ${dataCtrl.getTempDataObj().areas_gerecs ==='areas' ? this.colorObject.areasColor : this.colorObject.gerecsColor};
                                                                        margin:0px 55px 50px 50px;">
            ${header}
            <table class="table table-hover table-sm" style="margin-bottom: 0!important">
                <thead style="background-color:${dataCtrl.getTempDataObj().areas_gerecs ==='areas' ? this.colorObject.areasColor : this.colorObject.gerecsColor}">
                    <tr>
                    ${th}
                    </tr>
                </thead>
                <tbody>
                    ${tr}
                </tbody>
            </table>
        </div>
        `
    }
    deleteTableResults(){
        this.protocolosWrapper.childNodes.forEach(node =>{
            node.remove()
        })
        this.protocolosWrapper.innerHTML = ''
    }
    //==============================================================================================================================
    //==============================================================================================================================
    //==============================================================================================================================
    //interface get/set attributes
    //return chart 1 ids 
    returnChart1IDs(){
        return([this.areasChartOneWrapper.id, this.gerecsChartOneWrapper.id])
    }
    //returnChart2IDs
    returnChart2IDs(){
        return([this.areasChartTwoWrapper.id, this.gerecsChartTwoWrapper.id])
    }
    //returnChart2IDs
    returnChart3IDs(){
        return([this.areasChartTwoWrapper.id, this.gerecsChartTwoWrapper.id])
    }
    //insertIDsInGraphicElementsFirstLevel
    insertIDsInGraphicElementsFirstLevel(dataCtrl){
        dataCtrl.returnDynamicClassNamesFirstLevel().forEach(e =>{
            document.getElementsByClassName(`highcharts-point 1stlevel ${e}`)[0].id = e
        })
    }
    insertIDsInGraphicElementsSecondLevel(dataCtrl){
        dataCtrl.returnDynamicClassNamesSecondLevel().forEach(e =>{
            document.getElementsByClassName(`highcharts-point 2ndlevel ${e}`)[0].id = `2nd@${e}`
        })
    }
    insertIDsInGraphicElementsThirdLevel(dataCtrl){
        dataCtrl.returnDynamicClassNamesThirdLevel().forEach(e =>{
            document.getElementsByClassName(`highcharts-point 3rdlevel ${e.periodo}`)[0].id = `3rd@${e.periodo}`
        })
    }
    //==============================================================================================================================
    //==============================================================================================================================
    //==============================================================================================================================
    // interface manipulation
    changeVisibilitiy(){
        const typeDisplay = this.areasGerecsWrapper.style.display
        if (typeDisplay==='none'){
            this.areasGerecsWrapper.style.display = 'block'
        }else{
            this.areasGerecsWrapper.style.display = 'none'
        }
    }
    getSpinningWrapper(){
        return(this.spinningWrapper)
    }
    scrollToProtocolosTable(){
        this.protocolosWrapper.scrollIntoView()
    }
}