const express = require('express')
const routes = express.Router()
const siteRoutes = require('./app/controllers/site')
const adminRecipesRoutes = require('./app/controllers/admin/recipes')
const adminChefsRoutes = require('./app/controllers/admin/chefs')

routes.get('/', siteRoutes.index)
routes.get('/recipes', siteRoutes.recipes)
routes.get('/about', siteRoutes.about)
routes.get('/details/:id', siteRoutes.details)

routes.get('/admin/recipes', adminRecipesRoutes.index)
routes.get('/admin/recipes/create', adminRecipesRoutes.create)
routes.get('/admin/recipes/:id', adminRecipesRoutes.show)
routes.get('/admin/recipes/:id/edit', adminRecipesRoutes.edit)
routes.post('/admin/recipes', adminRecipesRoutes.post)
routes.put('/admin/recipes', adminRecipesRoutes.put)
routes.delete('/admin/recipes', adminRecipesRoutes.delete)

routes.get('/admin/chefs', adminChefsRoutes.index)
routes.get('/admin/chefs/create', adminChefsRoutes.create)
routes.get('/admin/chefs/:id', adminChefsRoutes.show)

routes.post('/admin/chefs/chefs', adminChefsRoutes.post)

module.exports = routes