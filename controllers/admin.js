const fs = require('fs')
const recipes = require('../data')
const data = require('../data.json')

exports.index = function(req, res){
    return res.render('admin/recipes', {items: data.recipes})
}

exports.show = function(req, res) {
    const {id} = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if(!foundRecipe) {
        res.send('Recipe not found!')
    }

    const recipe = {
        ...foundRecipe
    }

    return res.render('admin/details', {recipe})
}

exports.edit = function(req, res) {
    const {id} = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return id == recipe.id
    })

    if(!foundRecipe) {
        return res.send('Recipe not founded')
    }

    const recipe = {
        ...foundRecipe
    }

    return res.render('admin/edit', {recipe})
}

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

    let id = 1
    const lastMember = data.recipes[data.recipes.length - 1]

    if (lastMember) {
        id = lastMember.id + 1
    }

    data.recipes.push({
        id,
        ...req.body
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write file error!')

        return res.redirect('/recipes')
    })
}

exports.details = function(req, res) {
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

    return res.render('details', {recipe})
}

exports.put = function(req, res) {
    const {id} = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if(id == recipe.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundRecipe) {
        return res.send('Recipe not founded!')
    }

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }

    data.recipes[index] = recipe

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send('Error!')
        }

        return res.redirect(`/admin/recipes/${id}`)
    })
}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredRecipes = data.recipes.filter(function(recipe){
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send('Error!')
        }
    })

    return res.redirect('/recipes')
}