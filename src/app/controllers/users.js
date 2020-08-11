// const recipes = require('../data')
const data = require('../../../data.json')

exports.index = function(req, res){
    return res.render('users/index', {items: data.recipes})
}

exports.recipes = function(req, res){
    return res.render('users/recipes', {items: data.recipes})
}

exports.about = function(req, res){
    return res.render('users/about')
}

exports.details = function(req, res) {
    const {id} = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return id == recipe.id
    })

    if(!foundRecipe) {
        res.send('Recipe not found!')
    }

    const recipe = {
        ...foundRecipe
    }

    return res.render('users/details', {item: recipe})
}