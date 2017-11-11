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
				$.post('/update', {completed: this.completed}, (updatedlist) => {
					this.newItem.completed = updatedlist
				$.get('/list', (currentlist) => {
					// console.log(currentlist)
					this.listoftasks = currentlist
				})
			})
		},

		birthday: function(evt) {
	            evt.preventDefault();
	            $.post('/birthday', {birthdayAnimal: this.birthdayAnimal}, (dataFromServer) => {
	                this.animals = dataFromServer;
	            });
	        },



		postNewTask: function(event) {
			event.preventDefault()
			// $().serialize() will grab all the named inputs in the form, and put their values into a url-encoded string
			$.post('/newtask', {newItem: this.newItem}, (data) => {
				// console.log(this.newitem)
				this.listoftasks.push(data);
			})
		},

	},

})
