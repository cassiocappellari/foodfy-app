const fs = require('fs')
const db = require('../../../config/db')
const {date} = require('../../../lib/useful')
const data = require('../../../../data.json')

module.exports = {
    index(req, res){
        return res.render('admin/recipes/recipes', {items: data.recipes})
    },
    show(req, res){
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

        return res.render('admin/recipes/details', {recipe})
    },
    edit(req, res){
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

        return res.render('admin/recipes/edit', {recipe})
    },
    create(req, res){
        return res.render('admin/recipes/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        const query = `
            INSERT INTO recipes (
                image,
                title,
                ingredients,
                time,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            req.body.image,
            req.body.title,
            req.body.ingredients,
            req.body.time,
            req.body.preparation,
            req.body.information,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            return res.redirect(`/admin/details/${results.rows[0].id}`)
        })

        
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

        return res.render('/recipes/details', {recipe})
    },
    put(req, res){
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
    },
    delete(req, res){
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

        return res.redirect('/recipes/recipes')
    }
}