var key = 'todoList';
export default{
	fetch(){
		return JSON.parse(localStorage.getItem(key));
	},
	set(items){
		localStorage.setItem(key, JSON.stringify(items));
	}
}