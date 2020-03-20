const ROOT_URL = 'http://localhost:3000'
const PROJECTS = `${ROOT_URL}/projects`
const statuses = [
	'Backlog',
	'Open',
	'In Progress',
	'Closed'
]

window.addEventListener("DOMContentLoaded", () => {
	drawBoard()
	const projectNav = document.getElementById('projectNav')
	getProjects().then(data => {
		const projects = createProjectCards(data.data)
		projects.forEach(project => {
			const cardItem = `
				<div class="projectCard">
					<p>project id - ${project.id}</p>
					<p>project name - ${project.name}</p>
				</div>
			`
			projectNav.insertAdjacentHTML('beforeend', cardItem)
		})
	})
})

const getProjects = async () => {
	return await (await fetch(PROJECTS)).json()
}

const createProjectCards = (data) => {
	return data.map(project => new Project(project.id, project.attributes.name))
}

const drawBoard = () => {
	const kanban = document.getElementById('kanban')
	statuses.forEach(status => {
		const column = `
			<div class="column">
				<h3 class="columnTitle"><em><u>${status}</u></em></h3>
			</div>
		`
		kanban.insertAdjacentHTML('beforeend', column)
	})
}

class Project {
	constructor(id, name) {
		this.id = id
		this.name = name
	}
}