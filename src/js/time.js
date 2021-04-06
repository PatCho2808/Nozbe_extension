export default class Time {
	render() {
		let div = document.getElementById('time');
		let now = new Date();
		div.innerHTML =
			now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
	}
}
