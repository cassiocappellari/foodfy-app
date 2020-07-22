const express = require('express')
const routes = express.Router()
const recipeRoutes = require('./controllers/recipes')

routes.get('/', recipeRoutes.index)
routes.get('/recipes', recipeRoutes.recipes)
routes.get('/about', recipeRoutes.about)
routes.get('/details/:id', recipeRoutes.details)

routes.get('/admin/recipes', recipeRoutes.index)
routes.get('/admin/recipes/create', recipeRoutes.create)
routes.get('/admin/recipes/:id', recipeRoutes.show)
routes.get('/admin/recipes/:id/edit', recipeRoutes.edit)

module.exports = routes