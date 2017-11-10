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
		}
    },
	methods: {
	postNewTask: function(event){
		event.preventDefault()
		// $().serialize() will grab all the named inputs in the form, and put their values into a url-encoded string
		$.post('/newtask', {newItem: this.newItem}, (data) => {
			// console.log(this.newitem)
			this.listoftasks.push(data);

		})
	}

	},

})
