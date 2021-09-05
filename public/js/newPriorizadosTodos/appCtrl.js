class AppCTRL {
    constructor() {
        this.secondLevelAppStates = {
            none: 'none',
            gerecs: 'gerecs',
            servicos: 'servicos'
        }
        this.secondLevelAppState = this.secondLevelAppStates.none
    }
    //=============================================================================================================
    //=============================================================================================================
    //=============================================================================================================
    //APP STATES
    //setSecondLevelAppState
    setSecondLevelAppState(appState){
        this.secondLevelAppState = appState
        uiCtrl.deleteSecondLevelChart()
    }
    getSecondLevelAppState(){
        return(this.secondLevelAppState)
    }
    getSecondLevelStates(){
        return(this.secondLevelAppStates)
    }
    //=============================================================================================================
    //=============================================================================================================
    //=============================================================================================================
    //ROUTES
    //busca informações na rota
    async fetchSelectPriorizadosTodosNew(dataCtrl, uiCtrl){
        var spinning = uiCtrl.getSpinningWrapper()
        fetch('/selectPriorizadosTodosNew')
        .then(response => {
            return response.json()
        })
        .then(data =>{
            dataCtrl.setInitialData(data)
            spinning.style.display = 'none'
            uiCtrl.createFirstLevelChart(dataCtrl, 'areas')
            uiCtrl.createFirstLevelChart(dataCtrl, 'gerecs')
            uiCtrl.insertIDsInGraphicElementsFirstLevel(dataCtrl)
            this.loadEventListenersFirstLevel(dataCtrl,uiCtrl)
        })
        .catch(err => console.log(err))
    }
    //=============================================================================================================
    //=============================================================================================================
    //=============================================================================================================
    //FIRST LEVEL EVENT LISTENERS
    //loadEventListenersFirstLevel
    loadEventListenersFirstLevel(dataCtrl, uiCtrl){
        dataCtrl.returnDynamicClassNamesFirstLevel().forEach(e =>{
            document.getElementById(e).addEventListener('click',(e)=>{
                this.createSecondLevelChart((e.target.classList.contains(`areas`) ? 'areas' : 'gerecs'), e.target.id, dataCtrl, uiCtrl)
            })
        })
        uiCtrl.returnChart1IDs().forEach(id =>{
            var areas_gerecs
            var dataIndex
            document.getElementById(id).addEventListener('click',(e)=>{
                const targetElement = e.target.classList.contains('highcharts-text-outline') ? e.target.parentElement.parentElement : e.target.parentElement
                if(targetElement.classList.contains('areas1')){
                    areas_gerecs = 'areas'
                }else if(targetElement.classList.contains('gerecs1')){
                    areas_gerecs = 'gerecs'
                }
                if(targetElement.classList.contains('areas1')||targetElement.classList.contains('gerecs1')){
                    if(targetElement.classList.contains('highcharts-label')){
                        var classString = ''
                        Array.from(targetElement.classList).forEach(e =>{
                            classString = `${classString} ${e}`
                        })
                        dataIndex = parseInt((classString.match(/highcharts-data-label-color-\d{1,2}/)[0]).match(/\d{1,2}/)[0])
                        this.createSecondLevelChart(areas_gerecs, dataCtrl.returnAreaOrGerecUsingIndexFirstLevel(areas_gerecs,dataIndex), dataCtrl,uiCtrl)
                    }
                }
                e.preventDefault()
            })
        })
    }
    //createSecondLevelChart
    createSecondLevelChart(areas_gerecs,fieldOne,dataCtrl,uiCtrl){
        this.unloadEventListenersSecondLevel(dataCtrl,uiCtrl)
        if(this.secondLevelAppState!==this.secondLevelAppStates.none){
            uiCtrl.deleteSecondLevelChart()
            this.setSecondLevelAppState(this.secondLevelAppStates.none)
        }
        dataCtrl.setTempDataObj({
            fieldOne : fieldOne,
            fieldTwo: '',
            period: '',
            areas_gerecs: areas_gerecs
        })
        uiCtrl.createSecondLevelChart(dataCtrl,this)
        uiCtrl.insertIDsInGraphicElementsSecondLevel(dataCtrl)
        this.loadEventListenersSecondLevel(dataCtrl,uiCtrl)
    }
    //=============================================================================================================
    //=============================================================================================================
    //=============================================================================================================
    //SECOND LEVEL EVENT LISTENERS
    loadEventListenersSecondLevel(dataCtrl, uiCtrl){
        dataCtrl.returnDynamicClassNamesSecondLevel().forEach(e =>{
            document.getElementById(`2nd@${e}`).addEventListener('click',(e)=>{
                this.createThirdLevelChart((e.target.id.split('@'))[1],undefined,dataCtrl,uiCtrl)
            })
        })
        uiCtrl.returnChart2IDs().forEach(id =>{
            var dataIndex
            document.getElementById(id).addEventListener('click',(e)=>{
                const targetElement = e.target.classList.contains('highcharts-text-outline') ? e.target.parentElement.parentElement : e.target.parentElement
                if(targetElement.classList.contains('areas2')||targetElement.classList.contains('gerecs2')){
                    if(targetElement.classList.contains('highcharts-label')){
                        var classString = ''
                        Array.from(targetElement.classList).forEach(e =>{
                            classString = `${classString} ${e}`
                        })
                        dataIndex = parseInt((classString.match(/highcharts-data-label-color-\d{1,2}/)[0]).match(/\d{1,2}/)[0])
                        this.createThirdLevelChart(undefined,dataIndex,dataCtrl,uiCtrl)
                    }
                }
                e.preventDefault()
            })
        })
    }
    unloadEventListenersSecondLevel(dataCtrl, uiCtrl){
        dataCtrl.returnDynamicClassNamesSecondLevel().forEach(e =>{
            document.getElementById(`2nd@${e}`).removeEventListener('click',(e)=>{
            })
        })
        uiCtrl.returnChart2IDs().forEach(id =>{
            document.getElementById(id).removeEventListener('click', (e)=>{
            })
        })
    }
    //=============================================================================================================
    //=============================================================================================================
    //=============================================================================================================
    //THIRD LEVEL EVENT LISTENERS
    //createThirdLevelChart
    createThirdLevelChart(fieldTwo,dataIndex,dataCtrl,uiCtrl){
       uiCtrl.deleteThirdLevelChart()
       var tempObj = dataCtrl.getTempDataObj()
       var fieldTwo
       if(fieldTwo==undefined){
           fieldTwo = (dataCtrl.returnAreaOrGerecUsingIndexSecondLevel(dataIndex)).fieldTwo
       }else{
           fieldTwo = fieldTwo
       }
       tempObj.fieldTwo = fieldTwo
       tempObj.period = ''
       dataCtrl.setTempDataObj(tempObj)
       uiCtrl.createThirdLevelChart(dataCtrl,this)
       uiCtrl.insertIDsInGraphicElementsThirdLevel(dataCtrl)
       this.loadEventListenersThirdLevel(dataCtrl,uiCtrl)       
   }
    loadEventListenersThirdLevel(dataCtrl, uiCtrl){
        dataCtrl.returnDynamicClassNamesThirdLevel().forEach(e =>{
            document.getElementById(`3rd@${e.periodo}`).addEventListener('click',(e)=>{
                this.setPeriodToTempDataObj(e.target.id.split('@')[1],dataCtrl,uiCtrl)
            })
        })
        uiCtrl.returnChart3IDs().forEach(id =>{
            document.getElementById(id).addEventListener('click',(e)=>{
                const targetElement = e.target.classList.contains('highcharts-text-outline') ? e.target.parentElement.parentElement : e.target.parentElement
                if(targetElement.classList.contains('areas3')||targetElement.classList.contains('gerecs3')){
                    if(targetElement.classList.contains('highcharts-label')){
                        this.setPeriodToTempDataObj((e.target.classList.contains('highcharts-text-outline') ? e.target.childNodes[0].textContent : e.target.childNodes[0].childNodes[0].textContent),dataCtrl,uiCtrl)
                    }
                }
                e.preventDefault()
            })
        })
    }
    setPeriodToTempDataObj(period,dataCtrl, uiCtrl){
        var tempDataObj = dataCtrl.getTempDataObj()
        tempDataObj.period = period
        dataCtrl.setTempDataObj(tempDataObj)
        uiCtrl.createTableResults(dataCtrl,this)
        uiCtrl.scrollToProtocolosTable(0)
    }
}