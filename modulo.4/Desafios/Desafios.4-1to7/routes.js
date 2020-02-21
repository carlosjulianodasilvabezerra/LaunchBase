const express = require('express')
const routes = express.Router()
const teacher = require('./controllers/teacher')
const students = require('./controllers/students')
routes.get('/', function(req, res){
  return res.redirect('/teachers')
})

routes.get('/teachers', teacher.index)
routes.get('/teachers/create', teacher.create)
routes.get('/teachers/:id', teacher.show)
routes.get('/teachers/:id/edit', teacher.edit)
routes.post('/teachers', teacher.post)
routes.put('/teachers', teacher.put)
routes.delete('/teachers', teacher.delete)





routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students', students.post)
routes.put('/students', students.put)
routes.delete('/students', students.delete)









module.exports = routes