const ROOT_URL = 'http://localhost:3000'
const PROJECTS_INDEX = `${ROOT_URL}/projects`
let APP

window.addEventListener("DOMContentLoaded", () => {
	APP = document.getElementById('app')
	getProjects().then(data => {
		const projects = createProjectCards(data.data)
		projects.forEach(project => {
			const cardItem = `
				<div class="projectCard">
					<p>${project.id}</p>
					<p>${project.name}</p>
				</div>
			`
			APP.insertAdjacentHTML('beforeend', cardItem)
		})
	})

})

async function getProjects() {
	let response = await fetch(PROJECTS_INDEX)
	let data = await response.json()
	return data
}

const createProjectCards = (data) => {
	let projects = []
	data.forEach(project => {
		const p = new Project(project.id, project.attributes.name)
		projects.push(p)
	})
	return projects
}

class Project {
	constructor(id, name) {
		this.id = id
		this.name = name
	}
}