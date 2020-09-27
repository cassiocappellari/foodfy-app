const express = require('express')
const routes = express.Router()
const siteRoutes = require('./app/controllers/site/site')
const adminRecipesRoutes = require('./app/controllers/admin/recipes')
const adminChefsRoutes = require('./app/controllers/admin/chefs')
const multer = require('./app/middlewares/multer')

routes.get('/', siteRoutes.index)
routes.get('/recipes', siteRoutes.recipes)
routes.get('/chefs', siteRoutes.chefs)
routes.get('/search', siteRoutes.search)
routes.get('/about', siteRoutes.about)
routes.get('/details/:id', siteRoutes.details)
routes.get('/chefs/:id', siteRoutes.show)

routes.get('/admin/recipes', adminRecipesRoutes.index)
routes.get('/admin/recipes/create', adminRecipesRoutes.create)
routes.get('/admin/recipes/:id', adminRecipesRoutes.show)
routes.get('/admin/recipes/:id/edit', adminRecipesRoutes.edit)

routes.post('/admin/recipes', multer.array("photos", 5), adminRecipesRoutes.post)
routes.put('/admin/recipes', multer.array("photos", 5), adminRecipesRoutes.put)
routes.delete('/admin/recipes', adminRecipesRoutes.delete)

routes.get('/admin/chefs', adminChefsRoutes.index)
routes.get('/admin/chefs/create', adminChefsRoutes.create)
routes.get('/admin/chefs/:id', adminChefsRoutes.show)
routes.get('/admin/chefs/:id/edit', adminChefsRoutes.edit)

routes.post('/admin/chefs', adminChefsRoutes.post)
routes.put('/admin/chefs', adminChefsRoutes.put)
routes.delete('/admin/chefs', adminChefsRoutes.delete)

module.exports = routes