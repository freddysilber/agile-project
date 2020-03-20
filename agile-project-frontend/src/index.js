const ROOT_URL = 'http://localhost:3000'
const PROJECTS = `${ROOT_URL}/projects`
let APP // <div class="app"></div>

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
	return await (await fetch(PROJECTS)).json()
}

const createProjectCards = (data) => {
	return data.map(project => new Project(project.id, project.attributes.name))
}

class Project {
	constructor(id, name) {
		this.id = id
		this.name = name
	}
}