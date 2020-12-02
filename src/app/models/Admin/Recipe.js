const db = require('../../../config/db')
const {date} = require('../../../lib/useful')

module.exports = {
    all() {
        return db.query(`SELECT recipes.*, chefs.name AS chefs_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`)
    },
    create(data) {
        const query = `
            INSERT INTO recipes (
                chef_id,
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
            data.chef,
            data.title,
            data.ingredients,
            data.time,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    find(id) {
        return db.query (`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id])
    },
    findTotalRecipes(id, callback) {
        db.query(`SELECT recipes.*, count(recipes) AS total_recipes
        FROM recipes
        LEFT JOIN recipes ON (recipes.recipe_id = recipes.id)
        WHERE recipes.id = $1
        GROUP BY recipes.id`, [id], function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE recipes SET
            chef_id=($1),
            image=($2),
            title=($3),
            ingredients=($4),
            time=($5),
            preparation=($6),
            information=($7)
        WHERE id = $8
        `

        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.time,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback()
        })
    },
    chefsSelectOptions() {
        return db.query(`SELECT name, id FROM chefs`)
    },
    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database error! ${err}`

            return callback()
        })
    }
}