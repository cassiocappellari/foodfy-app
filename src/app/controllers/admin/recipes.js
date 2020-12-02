const Recipe = require('../../models/Admin/Recipe')
const File = require('../../models/Admin/File')
const RecipeFiles = require('../../models/Admin/RecipeFiles')

module.exports = {
    async index(req, res){
        let results = await Recipe.all()
        const recipes = results.rows

        return res.render('admin/recipes/recipes', {recipes})
    },
    async show(req, res){
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send('Recipe not found!')

        results = await RecipeFiles.getFilesIds(recipe.id)
        const fileIds = results.rows

        const filesPromises = fileIds.map(id => RecipeFiles.getFiles(id.file_id))
        const files = await Promise.all(filesPromises)

        const recipeFiles = files[0].rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public/images", "")}`
        }))

        const images = recipeFiles[0]

        return res.render('admin/recipes/details', {recipe, images})
    },
    async edit(req, res){
        const recipe = await Recipe.find(req.params.id)
        if(!recipe) return res.send('Recipe not found!')

        const results = await Recipe.chefsSelectOptions()
        const options = results.rows

        return res.render('admin/recipes/edit', {recipe, chefOptions: options})
    },
    async create(req, res){
        const results = await Recipe.chefsSelectOptions()
        options = results.rows

        return res.render('admin/recipes/create', {chefOptions: options})
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

        const filesPromise = req.files.map(file => File.create({...file}))
        const filesResult = await Promise.all(filesPromise)

        const recipeFiles = filesResult.map(file => {
            const fileId = file.rows[0].id
            RecipeFiles.create(recipeId, fileId)
        })
        await Promise.all(recipeFiles)

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