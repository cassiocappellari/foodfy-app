const express = require('express')
const routes = express.Router()
const usersRoutes = require('./controllers/users')
const adminRoutes = require('./controllers/admin')

routes.get('/', usersRoutes.index)
routes.get('/recipes', usersRoutes.recipes)
routes.get('/about', usersRoutes.about)
routes.get('/details/:id', usersRoutes.details)

routes.get('/admin/recipes', adminRoutes.index)
routes.post('/admin/recipes', adminRoutes.post)
routes.get('/admin/recipes/create', adminRoutes.create)
/*routes.get('/admin/recipes/:id', adminRoutes.show)
routes.get('/admin/recipes/:id/edit', adminRoutes.edit)*/

module.exports = routes