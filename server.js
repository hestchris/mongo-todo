var express = require('express')
var bodyParser = require('body-parser')
var mongo = require('mongodb')

var app = express()

var MongoClient = mongo.MongoClient

MongoClient.connect('mongodb://localhost:27017/mongo-todo', function(err, db){
	if (err) {
        console.log('failed to connect to mongo')
        console.log(err)
		}
		else {
	        console.log("connected to mongo!")
	    }

	app.use(express.static('./public'))
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

	app.post('/newtask', function(req, res){
		console.log(req.body)
		db.collection('todo').insert(req.body, function(err){
			if (err) {
				console.log(err)
				res.send('there was an error')
			}
			else {
				res.send('your data was sent successfully')
			}
		})
		// req.body.animalAge = parseInt(req.body.animalAge)
		// db.collection('animals').insert(req.body, function(err){
		// 	if (err){
		// 		console.log(err)
		// 		res.send('oops, something went wrong.')
		// 	}
		// 	else {
		// 		res.send('got your data!')

			// }
		})




	app.listen(8080, function(){
        console.log('server listening on port 8080')
    })
})
