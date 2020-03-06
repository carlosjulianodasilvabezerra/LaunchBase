const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(){
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`)
  },
  create(data){
    const query = `
      INSERT INTO recipes (
        image,
        title,
        ingredients,
        preparation,
        information,
        chef_id,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparations,
      data.informations,
      data.chef,
      date(Date.now()).iso
    ]

    return db.query(query, values)
  },
  find(id){

    console.log('inside find', id)
    return db.query(`SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    WHERE recipes.id = $1`, [id])
  },
  findBy(filter){
    return db.query(`
    SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.title ILIKE '%${filter}%'`)
  },
  update(data, callback) {
    const query = `
      UPDATE recipes SET
        image=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5),
        chef_id=($6)
      WHERE id = $7
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparations,
      data.informations,
      data.chef,
      data.id
    ]

    return db.query(query, values)
  },
  delete(id){
    return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
  },
  chefsSelectOptions(callback){
    return db.query(`SELECT name, id FROM chefs`)
  }
}