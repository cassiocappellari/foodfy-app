const express = require('express')
const routes = express.Router()
const usersRoutes = require('./app/controllers/users')
const adminRoutes = require('./app/controllers/admin')

routes.get('/', usersRoutes.index)
routes.get('/recipes', usersRoutes.recipes)
routes.get('/about', usersRoutes.about)
routes.get('/details/:id', usersRoutes.details)

routes.get('/admin/recipes', adminRoutes.index)
routes.get('/admin/recipes/create', adminRoutes.create)
routes.get('/admin/recipes/:id', adminRoutes.show)
routes.get('/admin/recipes/:id/edit', adminRoutes.edit)

routes.post('/admin/recipes', adminRoutes.post)
routes.put('/admin/recipes', adminRoutes.put)
routes.delete('/admin/recipes', adminRoutes.delete)

module.exports = routes