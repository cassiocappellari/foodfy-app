const fs = require('fs')
const db = require('../../../config/db')
const {date} = require('../../../lib/useful')
const data = require('../../../../data.json')
const Chef = require('../../models/Admin/Chef')

module.exports = {
    index(req, res){ 
        Chef.all(function(chefs) {
            return res.render('admin/chefs/chefs', {chefs})
        })
    },
    show(req, res){
        Chef.find(req.params.id, function(chef) {
            if(!chef) return res.send('Chef not found!')

            Chef.findTotalRecipes(chef.id, function(recipe){

                chef.created_at = date(chef.created_at).format
    
                return res.render('admin/chefs/details', {chef, recipe})
            })
        })
    },
    edit(req, res){
        Chef.find(req.params.id, function(chef) {
            if(!chef) return res.send('Chef not found!')

            return res.render('admin/chefs/edit', {chef})
        })
    },
    create(req, res){
        return res.render('admin/chefs/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        Chef.create(req.body, function(chefs) {
            return res.redirect(`/admin/chefs/${chefs.id}`)
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
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        Chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res){
        Chef.delete(req.body.id, function() {
            return res.redirect(`/admin/chefs`)
        })
    }
}