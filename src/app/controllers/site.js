// const recipes = require('../data')
const data = require('../../../data.json')

module.exports = {
    index(req, res){
        return res.render('site/recipes/index', {items: data.recipes})
    },
    recipes(req, res){
        return res.render('site/recipes/recipes', {items: data.recipes})
    },
    about(req, res){
        return res.render('site/about/about')
    },
    details(req, res){
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

        return res.render('site/recipes/details', {item: recipe})
    }
}