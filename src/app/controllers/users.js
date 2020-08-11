// const recipes = require('../data')
const data = require('../../../data.json')

module.exports = {
    index(req, res){
        return res.render('users/index', {items: data.recipes})
    },
    recipes(req, res){
        return res.render('users/recipes', {items: data.recipes})
    },
    about(req, res){
        return res.render('users/about')
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

        return res.render('users/details', {item: recipe})
    }
}