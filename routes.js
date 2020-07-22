const express = require('express')
const routes = express.Router()
const recipes = require('./data')

routes.get('/', function(req, res){
    return res.render('index', {items: recipes})
})

routes.get('/recipes', function(req, res){
    return res.render('recipes', {items: recipes})
})

routes.get('/about', function(req, res){
    return res.render('about')
})

routes.get('/details/:id', function(req, res) {
    const recipeId = req.params.id

    const recipe = recipes.find(function(recipe){
        return recipe.id == recipeId
    })

    if(!recipe) {
        res.send('Recipe not found!')
    }

    return res.render('details', {item: recipe})
})

module.exports = routes