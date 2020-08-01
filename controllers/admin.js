const fs = require('fs')
const data = require('../data.json')

exports.index = function(req, res){
    return res.render('admin/recipes', {items: recipes})
}

/*exports.recipes = function(req, res){
    return res.render('recipes', {items: recipes})
}*/

exports.create = function(req, res) {
    return res.render('admin/create')
}

exports.post = function(req, res) {

    const keys = Object.keys(req.body)

    for(let key of keys) {
        if(req.body[key] == '') {
            return res.send('Please, fill all the fields!')
        }
    }

    let {recipeImg, ingredients, recipePrep, addInfo} = req.body

    const id = Number(data.recipes.length + 1)

    data.recipes.push({
        id,
        recipeImg,
        ingredients,
        recipePrep,
        addInfo
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write file error!')

        return res.redirect('/recipes')
    })
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