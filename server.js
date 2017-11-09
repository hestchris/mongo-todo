const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

//connect to mongoose
mongoose.connect('mongodb://localhost/mongo-todo')

//create schema
let NewTask = new mongoose.Schema({
		input: {type: String, required: true}
	})
//create model
let InputModel = mongoose.model('todomodel', NewTask)

//
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//get all the current to do items in the db
app.get('/list', function(req, res){
	InputModel.find(
		{},
		function(err, userinput) {
			if(err) {
				res.status(500).send(err)
				return console.log(err)
			}
			res.status(200).send(userinput)
		}
	)
})
app.post('/newtask', function(req, res){

	console.log(req.body);
	let newTask = {
		input: req.body.userinput
	}
})






app.listen(8080, function(){
    console.log('server listening on port 8080')
})
