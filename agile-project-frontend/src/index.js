const ROOT_URL = 'http://localhost:3000'
const PROJECTS_INDEX = `${ROOT_URL}/projects`

document.addEventListener("DOMContentLoaded", () => {
	console.log('test')
	getProjects()
})

getProjects = () => {
	fetch(PROJECTS_INDEX)
		.then(response => response.json())
		.then(object => {
			console.log(object)
		})
}