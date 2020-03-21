//  Project > Task > Status
//  Project > Tasks < Status
const ROOT_URL = 'http://localhost:3000'
const PROJECTS = `${ROOT_URL}/projects`
const STATUSES = [
	'Backlog',
	'Open',
	'In Progress',
	'Closed'
]

window.addEventListener("DOMContentLoaded", () => {
	const projectNav = document.getElementById('projectNav')
	// GHETTO RENDERING LIFECYCLE
	drawBoard()
	getProjects().then(data => {
		const projects = createProjectCards(data.data) // could be refactored into something other than data.data...
		projects.forEach(project => {
			const cardItem = `
				<div id="${project.id}" class="projectCard" draggable="true" ondragstart="drag(event)">
					<p>project id - ${project.id}</p>
					<p>project name - ${project.name}</p>
					<p>project status - ${project.status}</p>
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
	return data.map(project => new Project(project.id, project.attributes.name, project.attributes.status))
}

const drawBoard = () => {
	const kanban = document.getElementById('kanban')
	STATUSES.forEach(status => {
		const column = `
			<div id="${status}" class="column" ondrop="drop(event)" ondragover="allowDrop(event)">
				<h3 class="columnTitle"><em><u>${status}</u></em></h3>
			</div>
		`
		kanban.insertAdjacentHTML('beforeend', column)
	})
}

class Project {
	constructor(id, name, status) {
		this.id = id
		this.name = name
		this.status = status
	}
}

const allowDrop = (event) => {
	event.preventDefault()
}

const drag = (event) => {
	event.dataTransfer.setData("text", event.target.id)
}

const drop = (event) => {
	event.preventDefault()
	let column = event.srcElement
	const data = event.dataTransfer.getData("text") // PROJECT_ID
	while (!column.classList.contains('column')) {
		column = column.parentElement
	}
	const columnId = column.id // COLUMN_ID (from status)
	column.appendChild(document.getElementById(data))
}

const handleCreateProject = () => {
	console.log('lets create a project')
}