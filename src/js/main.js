import '../scss/main.scss';

import Time from './time.js';
import App from './app.js';
import Auth from './auth.js';
import NozbeService from './nozbeService.js';

window.onload = function () {
	const time = new Time();
	time.render();
	let app = new App(new NozbeService(), new Auth());
	app.setupPage();
	document.getElementById('submit_button').addEventListener('click', () => {
		let checkboxes = document.getElementsByName('categories');
		let categoriesToFiltrBy = [];
		checkboxes.forEach(checkbox => {
			if (checkbox.checked) {
				categoriesToFiltrBy.push(checkbox.value);
			}
		});
		app.filter(categoriesToFiltrBy);
	});
};
