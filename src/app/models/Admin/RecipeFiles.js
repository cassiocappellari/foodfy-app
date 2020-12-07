const db = require('../../../config/db')

module.exports = {
    getAllFiles() {
        return db.query(`
            SELECT * FROM files
        `)
    },
    getFiles(id) {
        return db.query(`
            SELECT * FROM files
            WHERE id = $1
        `, [id])
    },
    getFilesIds(id) {
        return db.query(`
            SELECT file_id FROM recipe_files
            WHERE recipe_id = $1
        `, [id])
    },
    create(recipe_id, file_id) {
        const query = `
            INSERT INTO recipe_files (
                recipe_id,
                file_id
            ) VALUES ($1, $2)
            RETURNING id
        `

        const values = [
            recipe_id,
            file_id
        ]

        return db.query(query, values)
    },
    update(recipe_id, file_id) {
        const query = `
            UPDATE recipe_files SET
                recipe_id=($1),
                file_id=(2)
            WHERE id = $3
        `

        const values = [
            recipe_id,
            file_id
        ]

        return db.query(query, values)
    }
}