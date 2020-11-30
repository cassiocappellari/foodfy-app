const db = require('../../../config/db')

module.exports = {
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
    }
}