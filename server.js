const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data')

const server = express()

server.use(express.static('public/styles'))
server.use(express.static('public/assets'))
server.use(express.static('public/scripts'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false
})

server.get('/', function(req, res){
    return res.render('index', {items: recipes})
})

server.get('/recipes', function(req, res){
    return res.render('recipes', {items: recipes})
})

server.get('/about', function(req, res){
    return res.render('about')
})

server.get('/details/:index', function(req, res) {
    const recipeIndex = req.params.index

    const recipeData = recipes.find(function(recipe) {
        
    })


    return res.render('details')
})

server.listen(5000, function(){
    console.log('server is running')
})