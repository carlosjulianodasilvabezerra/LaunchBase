const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(){
    return db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id`)
  },
  create(data){
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso
    ]

    return db.query(query, values)
  },
  find(id){
    return db.query(`
    SELECT chefs.*, count(recipes) AS total_recipes
    FROM chefs
    LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
    WHERE chefs.id = $1
    GROUP BY chefs.id`, [id])
  },
  findChefRecipe(id){
    return db.query(`SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE chefs.id = $1`, [id])
    
  },
  update(data) {
    const query = `
      UPDATE chefs SET
        name=($1),
        avatar_url=($2)
      WHERE id = $3
    `

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ]

    return db.query(query, values)
  },
  delete(id, callback){
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results){
      if(err) throw `Database Error!${err}`

      return callback()
    })
  },
  verifyRecipe(id, callback){
    db.query(`SELECT count(id) as total_recipes FROM recipes WHERE chef_id = $1`, [id], function(err, results){
      if(err) throw `Database Error!${err}`

      return callback(results.rows[0].total_recipes)
    })
  }
}