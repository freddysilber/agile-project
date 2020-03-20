const ROOT_URL = 'http://localhost:3000'
const PROJECTS_INDEX = `${ROOT_URL}/projects`
let PROJECT_DAT

window.addEventListener("DOMContentLoaded", () => {
	console.log('test')
	// getProjects()
	// getProjects = () => {
	fetch(PROJECTS_INDEX)
		.then(response => response.json())
		.then(object => {
			console.log(object)
			PROJECT_DATA = object
		})
		.catch((error) => {
			console.log('<ERROR>', error)
		})
	// }
	console.log(projectData)
})

// getProjects = () => {
// 	fetch(PROJECTS_INDEX)
// 		.then(response => response.json())
// 		.then(object => {
// 			console.log(object)
// 		})
// } 

const projectData = () => {
	return fetch(`${PROJECTS_INDEX}/test`)
		.then(response => response.json())
		.then(parsed = console.log(parsed))

}