//express para o servidor web
const express = require('express')
const session = require('express-session')
const https = require('https')
const fs = require('fs')
const path = require('path')
const hbs = require('hbs')

//outras variáveis
const portHttp = 4014   
const portHttps = 4015
var key = fs.readFileSync(__dirname + '/ssl/key.pem','utf-8')
var cert = fs.readFileSync(__dirname + '/ssl/server.crt','utf-8')
const credentials = {
    key: key,
    cert: cert
}
const viewsPaths = path.join(__dirname,  '../templates/views')
const partialsPaths = path.join(__dirname,  '../templates/partials')
const publicPath = path.join(__dirname,  '../public')
//configurando a views no hbs
hbs.registerPartials(partialsPaths)

//criando aplicativo app do express
const app = express()

//configurando a session
const store = new session.MemoryStore()
//importando middlewares
const validador = require('./validador/validador')
const pool = require('./mysql/mysql')
//configurado ao app()
app.use(session({
    secret: "protPriorizados",
    name: "painelPriorizados",
    resave: true,
    saveUninitialized: true,
    store: store
}))
app.set('view engine', 'hbs')
app.set('views', viewsPaths)
app.use(express.static(publicPath))
app.use(express.urlencoded())
app.use(express.json())
app.use(validador.validaToken)
//outras informações
const appInfo = require('./appInfo')
//outras funções

//funcoes banco de dados
var selectALLfromBBTSProtPriorizados = require('./mysql/_SQL/selectALLfromPriorizadosBBTS')
var selectALLfromPriorizadosDemandas = require('./mysql/_SQL/selectALLfromPriorizadosDemandas')
var selectALLfromPriorizadosTodosAtivos = require('./mysql/_SQL/selectALLfromPriorizadosTodosAtivos')
var selectALLfromPriorizadosTodos = require('./mysql/_SQL/selectALLfromPriorizadosTodos')
var selectALLfromPassiveisPriorizacao = require('./mysql/_SQL/selectALLfromPassiveisPriorizacao')
var insertINTOt100_demandaBBTSPriorizadas = require('./mysql/_SQL/insertINTOt100_demandaBBTSPriorizadas')
var selectALLfromPassiveisDespriorizacao = require('./mysql/_SQL/selectALLfromPassiveisDespriorizacao')
var updatePassiveisDespriorizacao = require('./mysql/_SQL/updatePassiveisDespriorizacao')
var selectALLfromDetalherServicosPassiveisAlocacao = require('./mysql/_SQL/selectALLfromDetalherServicosPassiveisAlocacao')
var selectALLfromDetalhesServicosPassiveisExclusao = require('./mysql/_SQL/selectALLfromDetalhesServicosPassiveisExclusao')
var insertINTOt201_detServPriorizadosBBTS = require('./mysql/_SQL/insertINTOt201_detServPriorizadosBBTS')
var updateDetSerPassiveisExlusao = require('./mysql/_SQL/updateDetSerPassiveisExlusao')
var select500fromLog = require('./mysql/_SQL/select500fromLog')
var selectInfoForPriorizadosTodos = require('./mysql/_SQL/selectInfoForPriorizadosTodos')
//==================================================================================
//==================================================================================
//                                   ROTEAMENTO
//==================================================================================
//==================================================================================
//----------------------------------------------------------------------------------
//                                 ROTAS DAS PAGINAS
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//                                   RELATÓRIOS
//root
app.get('/', (req,res)=>{  
    res.redirect('/dashboard')
})
//dashboard
app.get('/dashboard', (req,res)=>{  
    var data = {
        title: 'Dashboard',
        appInfo,
        tarja: false
    }
    res.render('newPriorizadosTodos', data)
})
//todos ativos
app.get('/todosAtivos', (req,res)=>{  
    var data = {
        title: 'Demandas priorizadas - só protocolos ativos',
        appInfo,
        tarja: true
    }
    res.render('priorizadosTodosAtivos', data)
})
//todos (geral)
app.get('/todos', (req,res)=>{  
    var data = {
        title: 'Demandas priorizadas - relatório completo',
        appInfo,
        tarja: true
    }
    res.render('priorizadosTodos', data)
})
//Demandas
app.get('/priorizadosDemandas', (req,res)=>{  
    var data = {
        title: 'Demandas priorizadas - relatório Demandas',
        appInfo,
        tarja: true
    }
    res.render('priorizadosDemandas', data)
})
//BBTS
app.get('/priorizadosBBTS', (req,res)=>{  
    var data = {
        title: 'Demandas priorizadas - relatório BBTS',
        appInfo,
        tarja: true
    }
    res.render('priorizadosBBTS', data)
})
//----------------------------------------------------------------------------------
//                          Priorizar/Despriorizar BBTS
//passíveis de priorização
app.get('/passiveisPriorizacao', (req,res)=>{  
    var data = {
        title: 'Priorizar - Protocolos Passíveis de Priorização',
        appInfo,
        tarja: true
    }
    res.render('passiveisPriorizacao', data)
})
//passíveis de despriorização
app.get('/passiveisDespriorizacao', (req,res)=>{ 
    res.render('passiveisDespriorizacao', {
        title: 'Despriorizar - Protocolos Passíveis de Despriorização',
        appInfo,
        tarja: true
    })
})
//----------------------------------------------------------------------------------
//                          Configurações ferramenta
//alocar detalhe de serviço para bbts
app.get('/alocarDetServ',  (req,res)=>{  
    res.render('alocarDetServ', {
        title: 'Alocar Detalhe de Serviço para BBTS - lista de detalhes passíveis de alocação',
        appInfo,
        tarja: true
    })
})
//desalocar detalhe de serviço da BBTS
app.get('/desalocarDetServ',  (req,res)=>{  
    res.render('desalocarDetServ', {
        title: 'Exluir Detalhe de Serviço da BBTS - lista de detalhes passíveis de exclusão',
        appInfo,
        tarja: true
    })
})
//mostra 500 mais recentes logs de acesso e configurações
app.get('/logFerramenta',  (req,res)=>{  
    res.render('logFerramenta', {
        title: 'Log - Acessos & Configurações',
        appInfo,
        tarja: true
    })
})
//----------------------------------------------------------------------------------
//                                ROTA DE SERVICOS
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//                                  RELATORIOS
//busca todos os priorizados BBTS + DEMANDAS - protocolos ativos
app.get('/selectALLfromPriorizadosTodosAtivos', (req,res)=> {
    selectALLfromPriorizadosTodosAtivos((error,success)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
//nova rota para todos os priorizados
app.get('/selectPriorizadosTodosNew',(req,res)=>{
    selectInfoForPriorizadosTodos((err,data)=>{
        if(err){
            res.status(500).json(error)
        } else {
            res.status(200).json(data)
        }
    })
})
//busca todos os priorizados BBTS + DEMANDAS - todos protocolos a partir de 2019-01-01 00:00:00
app.get('/selectALLfromPriorizadosTodos', (req,res)=> {
    selectALLfromPriorizadosTodos((error,success)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
//busca todos os priorizados do demandas
app.get('/selectALLfromPriorizadosDemandas', (req,res)=> {
    selectALLfromPriorizadosDemandas((error,success)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
//busca todos os priorizados da BBTS
app.get('/selectALLfromBBTSProtPriorizados', (req,res)=> {
    selectALLfromBBTSProtPriorizados((error,success)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
//----------------------------------------------------------------------------------
//                       PRIORIZAR/DESPRIORIZAR BBTS
//retorna protocolos passíveis de priorização
app.get('/selectALLfromPassiveisPriorizacao', (req,res)=> {
    selectALLfromPassiveisPriorizacao((error,success)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
//prioriza novos protocolos
app.post('/savePassiveisPriorizacao', (req,res)=>{
    insertINTOt100_demandaBBTSPriorizadas(req.body, req.session.chave, (error,success)=> {
        if(error){
            res.status(500).json(error)
        }else{
            res.status(201).json(success)
        }
    })
})
//retorna protocolos passíveis de despriorização
app.get('/selectALLfromPassiveisDespriorizacao', (req,res)=> {
    selectALLfromPassiveisDespriorizacao((error,success)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
//exluir protocolos da lista dos priorizados
app.post('/savePassiveisDespriorizacao', (req,res)=>{
    updatePassiveisDespriorizacao(req.body, req.session.chave, (error,success)=> {
        if(error){
            res.status(500).json(error)
        }else{
            res.status(201).json(success)
        }
    })
})
//----------------------------------------------------------------------------------
//                       CONFIGURAÇÕES FERRAMENTA
//retorna todos os detalhes serviços passíveis
app.get('/selectALLdetSerPassivelAlocacao', (req,res)=> {
    selectALLfromDetalherServicosPassiveisAlocacao((error,success)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
//salva detalhe de serviço
app.post('/saveDetSerPassivelAlocacao', (req,res)=>{
    insertINTOt201_detServPriorizadosBBTS(req.body, req.session.chave, (error,success)=> {
        if(error){
            res.status(500).json(error)
        }else{
            res.status(201).json(success)
        }
    })
})
//retorna todos os detalhes serviços passíveis
app.get('/selectALLdetSerPassivelExclusao', (req,res)=> {
    selectALLfromDetalhesServicosPassiveisExclusao((error,success)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
//salva detalhe de serviço
app.post('/saveDetSerPassivelExclusao', (req,res)=>{
    updateDetSerPassiveisExlusao(req.body, req.session.chave, (error,success)=> {
        if(error){
            res.status(500).json(error)
        }else{
            res.status(201).json(success)
        }
    })
})
//retorna todos os detalhes serviços passíveis
app.get('/select500fromLog', (req,res)=> {
    select500fromLog((error,success)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
//==================================================================================
//==================================================================================
//                            ATIVANDO O SERVIDOR WEB
//==================================================================================
//==================================================================================
https.createServer(credentials,app).listen(portHttps)