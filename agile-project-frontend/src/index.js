// import * as Config from './config'
const ROOT_URL = 'http://localhost:3000'
const PROJECTS = `${ROOT_URL}/projects`
const TASKS = `${ROOT_URL}/tasks`
const PROJECT_STATUSES = [
	'Not Started',
	'In Progress',
	'Late',
	'Complete'
]
const TASK_STATUSES = [
	'Open',
	'In Progress',
	'Complete',
	'On Hold'
]

window.addEventListener("DOMContentLoaded", () => {
	const projectNav = document.getElementById('projectNav')
	drawBoard()
	getProjects().then(data => {
		const projects = createProjectCards(data.data)
		projects.forEach(project => {
			const cardItem = `
				<div id="${project.id}" class="projectCard" draggable="true" ondragstart="drag(event)">
					<p><b>Name:</b> <u>${project.name}</u></p>
					<p><b>Status:</b> ${project.status}</p>
				</div>
			`
			projectNav.insertAdjacentHTML('beforeend', cardItem)
		})
	})
	getTasks().then(data => {
		console.log(data)
	})
})

const getProjects = async () => {
	return await (await fetch(PROJECTS)).json()
}

const getTasks = async () => {
	return await (await fetch(TASKS)).json()
}

const createProjectCards = (data) => {
	return data.map(project => new Project(project.id, project.attributes.name, project.attributes.status))
}

const drawBoard = () => {
	clearBoard()
	const kanban = document.getElementById('kanban')
	TASK_STATUSES.forEach(status => {
		const column = `
			<div id="${status}" class="column" ondrop="drop(event)" ondragover="allowDrop(event)">
				<h3 class="columnTitle"><em><u>${status}</u></em></h3>
			</div>
		`
		kanban.insertAdjacentHTML('beforeend', column)
	})
}

const clearBoard = () => {
	const columns = document.querySelectorAll('.column')
	columns.forEach(column => {
		column.remove()
	})
}
class Project {
	constructor(id, name, status) {
		this.id = id
		this.name = name
		this.status = status
	}
}

class Task {
	constructor(id, name) {
		this.id = id
		this.name = name
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

	updateProjectStatus(data, columnId)
}

const addColumn = () => {
	PROJECT_STATUSES.push('-- NEW COL --')
	drawBoard()
}

const handleNewProject = () => {
	const masterContainer = document.getElementById('masterContainer')
	const modal = `
		<div id="myModal" class="modal">
			<div class="modal-content">
				<button class="modalButton" name="closeModal" onclick="handleCloseModal()">Close</button>
				<center>
					<p>New Project</p>
					<div class="modalBody">
						<p>Project Name: <input id="projectName" type="text" placeholder="Project Name"  name="projectName"></input></p>
					</div>
					<button onclick="submitProject()">Create Project</button>
				</center>
			</div>
		</div>
	`
	masterContainer.insertAdjacentHTML('beforebegin', modal)
}

const submitProject = () => {
	const projectName = document.getElementById('projectName').value
	fetch(PROJECTS, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'name': projectName,
			'status': PROJECT_STATUSES[0]
		})
	})
		.then(response => response.json())
		// .then(newProject => {
		// 	console.log('newproject', newProject)
		// })
		.catch(error => console.error(error))
	handleCloseModal()
}

const handleCloseModal = () => {
	document.getElementById('myModal').remove()
}

updateProjectStatus = (projectId, status) => {
	console.log(projectId, status)
	fetch(PROJECTS, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'project_id': projectId
		})
	})
		.then(response => response.json())
		// .then(project => {
		// 	console.log(project)
		// })
		.catch(error => { console.error(error) })
}

// 	if (e.target.classList.contains("release")){
// 	  const pokemonId = e.target.dataset.pokemonId;
// 	  fetch(`${POKEMONS_URL}/${pokemonId}`, {
// 		method: 'DELETE'
// 	  })
// 	  .then(resp => resp.json())
// 	  .then(() => e.target.parentNode.remove());
// 	}