const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({extended: true}))
server.use(methodOverride('_method'))

server.use(express.static('public/styles'))
server.use(express.static('public/assets'))
server.use(express.static('public/scripts'))

server.set('view engine', 'njk')
server.use(routes)

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function(){
    console.log('server is running')
})