const db = require('../../../config/db')

module.exports = {
    all(callback){
        db.query(`SELECT * FROM recipes`, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    find(id, callback){
        db.query(`
            SELECT *
            FROM recipes
            WHERE id = $1`, [id], function(err, results) {
                if(err) throw `Database error! ${err}`

                callback(results.rows[0])
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

        return res.render('site/recipes/details', {item: recipe})
    }
}