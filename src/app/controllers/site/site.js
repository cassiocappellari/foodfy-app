const Site = require('../../models/Site/Site')

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
    search(req, res){
        const {filter} = req.query

        Site.findBy(filter, function(recipes){
            return res.render('site/recipes/search', {recipes, filter})
            })
    },
    about(req, res){
        return res.render('site/about/about')
    },
    details(req, res){
        Site.find(req.params.id, function(recipe){
            if(!recipe) return res.send('Recipe not found!')

            return res.render('site/recipes/details', {recipe})
        })

    }
}