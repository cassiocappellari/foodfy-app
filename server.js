const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public/styles'))
server.use(express.static('public/assets'))
server.use(express.static('public/scripts'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server
})

server.get('/', function(req, res){
    return res.render('index')
})

server.get('/recipes', function(req, res){
    return res.render('recipes')
})

server.get('/about', function(req, res){
    return res.render('about')
})

server.listen(5000, function(){
    console.log('server is running')
})