var mainVm = new Vue({
    el: '#app',
    data: {
    	newitem: {
			userinput: '',
		}
    },
	methods: {
	postNewTask: function(event, res){
		event.preventDefault()
		// $().serialize() will grab all the named inputs in the form, and put their values into a url-encoded string
		$.post('/newtask', mainVm.newitem, (data) => {
			console.log(this.newitem)
			console.log(res)
		})
	}
	},

})
