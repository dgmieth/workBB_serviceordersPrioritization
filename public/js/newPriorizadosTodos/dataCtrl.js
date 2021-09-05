class DataCtrl {
    constructor(){
        this.areas = []
        this.gerecs = []
        this.protocolos = []
        this.gerenciamentoPriorizadosPorGerec = []
        this.tempDataObj = {
            fieldOne: '',
            fieldTwo: '',
            period: '',
            areas_gerecs: ''
        }
    }
    //setInitialData
    setInitialData(data){
        this.areas = data.arrayAreas
        this.gerecs = data.arrayGerecs
        this.protocolos= data.todosProtocolosPriorizados
        this.gerenciamentoPriorizadosPorGerec = data.gerenciamentoPriorizadosPorGerec
    }
    //==============================================================================================================
    //==============================================================================================================
    //==============================================================================================================
    //DATA FOR FIRST LEVEL CHARTS
    //returnSelectedData
    returnSelectedData(areas_gerecs_protocolos_gerenciamento_null){
        if(areas_gerecs_protocolos_gerenciamento_null==='areas'){
            return(this.areas)
        }else if(areas_gerecs_protocolos_gerenciamento_null==='gerecs'){
            return(this.gerecs)
        }else if(areas_gerecs_protocolos_gerenciamento_null==='protocolos'){
            return(this.protocolos)
        }else if(areas_gerecs_protocolos_gerenciamento_null==='gerenciamento') {
            return(this.gerenciamentoPriorizadosPorGerec)
        }else if(areas_gerecs_protocolos_gerenciamento_null==null||areas_gerecs_protocolos_gerenciamento_null===''){
            return(this)
        }
    }
    //return areas and geresc as Class Names for UICtrl
    returnDynamicClassNamesFirstLevel(){
        var classNames =[]
        this.areas.forEach(e =>{
            classNames.push(e.fieldOne)
        })
        this.gerecs.forEach(e =>{
            classNames.push(e.fieldOne)
        })
        return(classNames)
    }
    //return areas and gerecs name through index from user interface
    returnAreaOrGerecUsingIndexFirstLevel(areas_gerecs,dataIndex){
        if(areas_gerecs==='areas'){
            return(this.areas[dataIndex].fieldOne)
        }else if (areas_gerecs='gerecs'){
            return(this.gerecs[dataIndex].fieldOne)
        }
    }
    //==============================================================================================================
    //==============================================================================================================
    //==============================================================================================================
    //DATA FOR SECOND LEVEL CHARTS
    returnDataSecondLevelChart(){
        var dataArray = []
        var tempArray =[]
        if(this.tempDataObj.areas_gerecs==='areas'){
            this.areas.filter((e)=>{
                if(e.fieldOne===this.tempDataObj.fieldOne){
                    e.fieldTwo.forEach(fieldTwo =>{
                        tempArray.push(fieldTwo)
                    })
                }
            })
        }else if(this.tempDataObj.areas_gerecs==='gerecs'){
            this.gerecs.filter((e)=>{
                if(e.fieldOne===this.tempDataObj.fieldOne){
                    e.fieldTwo.forEach(fieldTwo =>{
                        tempArray.push(fieldTwo)
                    })
                }
            })
        }
        tempArray.forEach(element => {
            var total = 0
            element.results.forEach(result =>{
                total = total + result.priorizados
            })
            dataArray.push({name: element.fieldTwo, y: total, id: element.fieldTwo, className: `${(this.tempDataObj.areas_gerecs==='areas' ? 'areas' : 'gerecs')} 2ndlevel ${element.fieldTwo}`})
            total = 0
        })
        return(dataArray)
    }
    returnAreaOrGerecUsingIndexSecondLevel(dataIndex){
        const areas_gerecs = this.tempDataObj.areas_gerecs
        const fieldOne = this.tempDataObj.fieldOne
        if(areas_gerecs==='areas'){
            var tempArray =[]
            this.areas.filter(e => {
                if(e.fieldOne===fieldOne){
                    e.fieldTwo.forEach(period => {
                        tempArray.push(period)
                    });
                }
            })
            return(tempArray[dataIndex])
        }else if (areas_gerecs==='gerecs'){
            var tempArray =[]
            this.gerecs.filter(e => {
                if(e.fieldOne===fieldOne){
                    e.fieldTwo.forEach(period => {
                        tempArray.push(period)
                    });
                }
            })
            return(tempArray[dataIndex])
        }
    }
    //return areas and geresc as Class Names for UICtrl
    returnDynamicClassNamesSecondLevel(){
        var classArray = []
        const fieldOne = dataCtrl.getTempDataObj().fieldOne
        if(this.tempDataObj.areas_gerecs==='areas'){
            this.areas.filter((area)=>{
                if(area.fieldOne===fieldOne){
                    area.fieldTwo.forEach(gerec => {
                        classArray.push(gerec.fieldTwo)
                    })
                }
            })
        }
        if(this.tempDataObj.areas_gerecs==='gerecs'){
            this.gerecs.filter((gerec)=>{
                if(gerec.fieldOne===fieldOne){
                    gerec.fieldTwo.forEach(servico => {
                        classArray.push(servico.fieldTwo)
                    })
                }
            })
        }
        return(classArray)
    }
    //==============================================================================================================
    //==============================================================================================================
    //==============================================================================================================
    //DATA FOR THIRD LEVEL CHARTS
    returnDataThirdLevelChart(){
        var returnArray = []
        this.getThirdLevelDataArray().reverse().forEach(e =>{
            returnArray.push({name: e.periodo, y: e.priorizados, id: e.periodo, className: `${(this.tempDataObj.areas_gerecs==='areas' ? 'areas' : 'gerecs')} 3rdlevel ${e.periodo}`})
        })
        return(returnArray)
    }
    returnDynamicClassNamesThirdLevel(){
        return(this.getThirdLevelDataArray().reverse())
    }
    getThirdLevelDataArray(){
        const areas_gerecs = this.tempDataObj.areas_gerecs
        const fOne = this.tempDataObj.fieldOne
        const fTwo = this.tempDataObj.fieldTwo
        var tempArrayOne = []
        var tempArrayTwo = []
        if(areas_gerecs==='areas'){
            this.areas.forEach(area =>{
                if(area.fieldOne===fOne){
                    area.fieldTwo.forEach(fieldTwo =>{
                        tempArrayOne.push(fieldTwo)
                    })
                }
            })
        }else if(areas_gerecs==='gerecs'){
            this.gerecs.forEach(gerec =>{
                if(gerec.fieldOne===fOne){
                    gerec.fieldTwo.forEach(fieldTwo =>{
                        tempArrayOne.push(fieldTwo)
                    })
                }
            })
        }
        tempArrayOne.forEach(fieldTwo =>{
            if(fieldTwo.fieldTwo===fTwo){
                fieldTwo.results.forEach(result =>{
                    tempArrayTwo.push(result)
                })
            }
        })
        return(tempArrayTwo)
    }
    //==============================================================================================================
    //==============================================================================================================
    //==============================================================================================================
    //TEMP DATA 
    //set temp Filter
    setTempDataObj(tempDataObj){
        this.tempDataObj.fieldOne = tempDataObj.fieldOne
        this.tempDataObj.fieldTwo = tempDataObj.fieldTwo
        this.tempDataObj.period = tempDataObj.period
        this.tempDataObj.areas_gerecs = tempDataObj.areas_gerecs
    }
    getTempDataObj(){
        return(this.tempDataObj)
    }
    //==============================================================================================================
    //==============================================================================================================
    //==============================================================================================================
    //FILTER PROTOCOLOS
    filterProtocolos(){
        var tempArrayOne = []
        const tempObj = this.tempDataObj
        this.protocolos.forEach(protocolo =>{
            if(tempObj.areas_gerecs==='areas'){
                if(protocolo.AREA === tempObj.fieldOne && protocolo.NOME_GEREC === tempObj.fieldTwo && protocolo.PERIODO === tempObj.period){
                    tempArrayOne.push(protocolo)
                }
            }else if(tempObj.areas_gerecs==='gerecs'){
                if(protocolo.NOME_GEREC === tempObj.fieldOne && protocolo.SERVICO === tempObj.fieldTwo && protocolo.PERIODO === tempObj.period){
                    tempArrayOne.push(protocolo)
                }
            }
        })
        return(tempArrayOne)
    }
    returnTotalAllowedPrioritizedQty(){
        var total = []
        var protocolos = this.filterProtocolos()
        if(this.tempDataObj.areas_gerecs==='areas'){
            this.gerenciamentoPriorizadosPorGerec.forEach(result =>{
                var usados = 0
                if(result.AREA === this.tempDataObj.fieldOne && result.NOME_GEREC === this.tempDataObj.fieldTwo ){
                    protocolos.forEach(protocolo => {
                        if(protocolo.AREA===result.AREA && protocolo.NOME_GEREC===result.NOME_GEREC&&protocolo.PREF_DEMANDANTE===result.PREFIXO){
                            usados += 1
                        }
                    })
                    total.push({NOME_GEREC: result.NOME_GEREC, prefixo: result.PREFIXO, AREA: result.AREA, MES_DISP: result.LIM_MENSAL,MES_USADO:usados})
                }
            })
        }
        if(this.tempDataObj.areas_gerecs==='gerecs'){
            var ary = []
            let tempOne 
            protocolos.forEach(protocolo =>{
                if(tempOne!==protocolo.AREA){
                    ary.push({NOME_GEREC: protocolo.NOME_GEREC, AREA: protocolo.AREA})
                }
                tempOne = protocolo.AREA
            })
            ary.forEach(e =>{
                this.gerenciamentoPriorizadosPorGerec.forEach(result =>{
                    var usados = 0
                    if(result.AREA === e.AREA && result.NOME_GEREC === e.NOME_GEREC ){
                        protocolos.forEach(protocolo => {
                            if(protocolo.AREA===result.AREA && protocolo.NOME_GEREC===result.NOME_GEREC&&protocolo.PREF_DEMANDANTE===result.PREFIXO){
                                usados += 1
                            }
                        })
                        total.push({NOME_GEREC: result.NOME_GEREC, prefixo: result.PREFIXO, AREA: result.AREA, MES_DISP: result.LIM_MENSAL,MES_USADO:usados})
                    }
                })
            })
        }
        return(total)
    }
}