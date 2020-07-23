const recipes = require('../data')

exports.index = function(req, res){
    return res.render('recipes', {items: recipes})
}

exports.recipes = function(req, res){
    return res.render('recipes', {items: recipes})
}

exports.about = function(req, res){
    return res.render('about')
}

exports.details = function(req, res) {
    const recipeId = req.params.id

    const recipe = recipes.find(function(recipe){
        return recipe.id == recipeId
    })

    if(!recipe) {
        res.send('Recipe not found!')
    }

    return res.render('details', {item: recipe})
}