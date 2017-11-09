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
    	newitem: {
			userinput: '',
		}
    },
	methods: {
	postNewTask: function(event){
		event.preventDefault()
		// $().serialize() will grab all the named inputs in the form, and put their values into a url-encoded string
		$.post('/newtask', {newitem: this.newitem}, (data) => {
			// console.log(this.newitem)
			this.listoftasks.push(data);
			console.log('successful post')
		})
	}

	},

})
