const Recipe = require('../../models/Admin/Recipe')
const File = require('../../models/Admin/File')
const RecipeFiles = require('../../models/Admin/RecipeFiles')

module.exports = {
    async index(req, res){
        let results = await Recipe.all()
        const recipes = results.rows

        let fileResults = await RecipeFiles.getAllFiles()
        const fileIds = fileResults

        const recipeFiles = fileIds.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public/images", "")}`
        }))
        const images = recipeFiles

        return res.render('admin/recipes/recipes', {recipes, images})
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
        let recipeResults = await Recipe.find(req.params.id)
        const recipe = recipeResults.rows[0]

        if(!recipe) return res.send('Recipe not found!')

        let chefResults = await Recipe.chefsSelectOptions()
        const options = chefResults.rows

        results = await RecipeFiles.getFilesIds(recipe.id)
        const fileIds = results.rows

        const filesPromises = fileIds.map(id => RecipeFiles.getFiles(id.file_id))
        const files = await Promise.all(filesPromises)

        const recipeFiles = files[0].rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public/images", "")}`
        }))

        const images = recipeFiles[0]

        return res.render('admin/recipes/edit', {recipe, chefOptions: options, images})
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
    async put(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        await Recipe.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)
    },
    async delete(req, res){
        await Recipe.deleteRecipeId(req.body.id)
        await Recipe.deleteRecipeFIle(req.body.id)
        await Recipe.deleteRecipe(req.body.id)
        
        return res.redirect(`/admin/recipes`)
    }
}