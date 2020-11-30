const Site = require('../../models/Site/Site')
const {date} = require('../../../lib/useful')

module.exports = {
    index(req, res){
        Site.all(function(recipes){
            return res.render('site/recipes/index', {recipes})
        })           
    },
    recipes(req, res){
        Site.all(function(recipes){
            return res.render('site/recipes/recipes', {recipes})
        })
    },
    chefs(req, res){
        Site.allChefs(function(chefs){
            return res.render('site/chefs/chefs', {chefs})
        })
    },
    show(req, res) {
        Site.findChefs(req.params.id, function(chef) {
            if(!chef) return res.send('Chef not found!')

            Site.findChefTotalRecipes(chef.id, function(recipe){

                Site.findChefRecipes(chef.id, function(recipes){

                    chef.created_at = date(chef.created_at).format
        
                    return res.render('site/chefs/details', {chef, recipe, recipes})
                })
            })
        })
    },
    search(req, res){
        const {filter} = req.query

        Site.findByRecipes(filter, function(recipes){
            return res.render('site/recipes/search', {recipes, filter})
            })
    },
    about(req, res){
        return res.render('site/about/about')
    },
    details(req, res){
        Site.findRecipes(req.params.id, function(recipe){
            if(!recipe) return res.send('Recipe not found!')

            return res.render('site/recipes/details', {recipe})
        })

    }
}