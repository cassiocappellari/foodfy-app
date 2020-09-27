const Recipe = require('../../models/Admin/Recipe')
const File = require('../../models/Admin/File')

module.exports = {
    index(req, res){
        Recipe.all(function(recipes) {
            return res.render('admin/recipes/recipes', {recipes})
        })
    },
    show(req, res){
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send('Recipe not found!')

            return res.render('admin/recipes/details', {recipe})
        })
    },
    edit(req, res){
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send('Recipe not found!')

            Recipe.chefsSelectOptions(function(options){
                return res.render('admin/recipes/edit', {recipe, chefOptions: options})
            })
        })
    },
    create(req, res){
        Recipe.chefsSelectOptions(function(options) {
            return res.render('admin/recipes/create', {chefOptions: options})
        })
    },
    async post(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        
        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({
            ...file
        }))
        await Promise.all(filesPromise)

        return res.redirect(`/admin/recipes/${recipeId}`)
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        Recipe.update(req.body, function() {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res){
        Recipe.delete(req.body.id, function() {
            return res.redirect(`/admin/recipes`)
        })
    }
}