const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/mongo-todo')

//create schema
let newItem = new mongoose.Schema({
		userinput: {type: String, required: true},
		completed :{type:Boolean, default:false}
	})
//create model
let InputModel = mongoose.model('todomodel', newItem)

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
app.post('/update', function(req, res) {
	InputModel.update( //.findByIdAndUpdate(req.body.task._id,)
		{ _id : req.body.task._id },
		{ $set: {
			completed: req.body.task.completed
		} },
		{ new: true },
		function(err, update) {
			console.log(update)
			if (err) {
				res.status(500).send(err);
				return console.log(err)
			}
			res.send(update)
		}
	)
})


app.post('/newtask', function(req, res){

	console.log(req.body);
	let newItem = {
		userinput: req.body.newItem.userinput,
		completed: req.body.newItem.completed
	}
	new InputModel(newItem).save(function(err, addedTask){
		if (err) {
			res.status(500).send(err);
			return console.log(err);
		}
		res.status(200).send(addedTask);
	})
})

app.post('/delete', function(req, res) {
	console.log(req.body)
	InputModel.findOneAndRemove(
		{_id: req.body.id},
		function(err, removedTask){
		if(err) {
	        res.status(500).send(err);
	        return console.log(err);
		}
		console.log('successfully removed task', removedTask)
		res.send(removedTask)
	})
})


app.listen(8080, function(){
    console.log('server listening on port 8080')
})
