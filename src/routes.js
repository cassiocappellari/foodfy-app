const express = require('express')
const routes = express.Router()
const siteRoutes = require('./app/controllers/site')
const adminRoutes = require('./app/controllers/admin')

routes.get('/', siteRoutes.index)
routes.get('/recipes', siteRoutes.recipes)
routes.get('/about', siteRoutes.about)
routes.get('/details/:id', siteRoutes.details)

routes.get('/admin/recipes', adminRoutes.index)
routes.get('/admin/recipes/create', adminRoutes.create)
routes.get('/admin/recipes/:id', adminRoutes.show)
routes.get('/admin/recipes/:id/edit', adminRoutes.edit)

routes.post('/admin/recipes', adminRoutes.post)
routes.put('/admin/recipes', adminRoutes.put)
routes.delete('/admin/recipes', adminRoutes.delete)

module.exports = routes