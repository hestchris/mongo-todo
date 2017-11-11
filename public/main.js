var mainVm = new Vue({
    el: '#app',
	beforeCreate () {
		$.get('/list', (currentlist) => {
			console.log(currentlist)
			this.listoftasks = currentlist
		})
	},
    data: {
		listoftasks: [],
    	newItem: {
			userinput: '',
			completed:false
		},
    },
	methods: {
		toggleCompleted: function(task) {
			// var task = task

			task.completed = !task.completed;
			console.log(task)
			// $.post('/update', task, function(updatedlist){
			// 	this.listoftasks.push(updatedlist)
			// 	console.log(updatedlist)
				$.post('/update', {task: task}, (updatedlist) => {
					this.newItem.completed = updatedlist
					$.get('/list', (currentlist) => {
						// console.log(currentlist)
						this.listoftasks = currentlist
				})
			})
		},

		postNewTask: function(event) {
			event.preventDefault()
			// $().serialize() will grab all the named inputs in the form, and put their values into a url-encoded string
			$.post('/newtask', {newItem: this.newItem}, (data) => {
				// console.log(this.newitem)
				this.listoftasks.push(data);
			})
		},

		removeTask: function(task){
	      	var index = this.listoftasks.indexOf(task);
			var id = mainVm.listoftasks[index]._id
			// console.log(index)
	      	this.listoftasks.splice(index, 1);
	      	$.post('/delete', {id:id}, function(removedTask){
	      		console.log(removedTask)

	      	})

		},
	},

})
