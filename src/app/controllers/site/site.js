const Site = require('../../models/Site/Site')
const Recipe = require('../../models/Admin/Recipe')
const File = require('../../models/Admin/File')
const RecipeFiles = require('../../models/Admin/RecipeFiles')
const {date} = require('../../../lib/useful')

module.exports = {
    async index(req, res){
        let results = await Site.all()
        const recipes = results.rows

        let fileResults = await RecipeFiles.getAllFiles()
        const fileIds = fileResults

        const recipeFiles = fileIds.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public/images", "")}`
        }))
        const images = recipeFiles

        return res.render('site/recipes/index', {recipes, images})          
    },
    async recipes(req, res){
        const results = await Site.all()
        const recipes = results.rows

        let fileResults = await RecipeFiles.getAllFiles()
        const fileIds = fileResults

        const recipeFiles = fileIds.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public/images", "")}`
        }))
        const images = recipeFiles

        return res.render('site/recipes/recipes', {recipes, images})
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
    async details(req, res){
        console.log(req.params.id)
        const result = await Site.findRecipes(req.params.id)
        const recipe = result.rows[0]
        
        return res.render('site/recipes/details', {recipe})
    }
}