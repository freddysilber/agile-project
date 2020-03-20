const ROOT_URL = 'http://localhost:3000'
const PROJECTS_INDEX = `${ROOT_URL}/projects`

window.addEventListener("DOMContentLoaded", () => {
	console.log('test')
	fetch(PROJECTS_INDEX)
		.then(response => response.json())
		.then(object => {
			console.log(object)
		})
		.catch((error) => {
			console.log('<ERROR>', error)
		})
})