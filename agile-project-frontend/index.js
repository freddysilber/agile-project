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

window.addEventListener('DOMContentLoaded', () => {
	const projectNav = document.getElementById('projectNav')
	drawBoard()
	getProjects().then(data => {
		console.log('project data', data)
		const projects = createProjectCards(data.data)
		projects.forEach(project => {
			const cardItem = `
				<div id="${project.id}" class="projectCard" onclick="handleSelectProject(event)">
					<button class="deleteButton" onclick="handleDeleteProject(event)">X</button>
					<p><b>Name:</b> <u>${project.name}</u></p>
					<p><b>Status:</b> ${project.status}</p>
				</div>
			`
			projectNav.insertAdjacentHTML('beforeend', cardItem)
		})
	})
})

const handleSelectProject = (event) => {
	drawBoard()
	let projectCard = event.target
	while (!projectCard.classList.contains('projectCard')) {
		projectCard = projectCard.parentElement
	}
	fetch(`${PROJECTS}/${projectCard.id}`)
		.then(response => response.json())
		.then(data => {
			const projectTasks = data.data.attributes.tasks
			projectTasks.forEach(task => {
				const taskCard = `
					<div id="${task.id}" class="taskCard" draggable="true" ondragstart="drag(event)">
						<p>${task.name}</p>
						<p>${task.status}</p>
					</div>
				`
				document.querySelector(`.column[id="${task.status}"]`).insertAdjacentHTML('beforeend', taskCard)
			})
		})
		.catch(error => console.error('There was an err trying to get ur project', error))
}

const getProjects = async () => {
	return await (await fetch(PROJECTS)).json()
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
	event.dataTransfer.setData('text', event.target.id)
}

const drop = (event) => {
	event.preventDefault()
	let column = event.srcElement
	const data = event.dataTransfer.getData('text') // TASK ID
	while (!column.classList.contains('column')) {
		column = column.parentElement
	}
	const columnId = column.id // COLUMN_ID (from status)
	column.appendChild(document.getElementById(data))
	updateTaskStatus(data, columnId)
}

const addColumn = () => {
	TASK_STATUSES.push('-- NEW COL --')
	drawBoard()
}

const handleNewProject = () => {
	const masterContainer = document.getElementById('masterContainer')
	const modal = `
		<div id="myModal" class="modal">
			<div class="modalContent">
				<button class="modalButton" name="closeModal" onclick="handleCloseModal()">Close</button>
				<center>
					<div class="modalBody">
						<p>Name: <input id="projectName" type="text" placeholder="Project Name"  name="projectName"></input></p>
					</div>
					<button onclick="submitProject()">Create Project</button>
				</center>
			</div>
		</div>
	`
	masterContainer.insertAdjacentHTML('beforebegin', modal)
}

const submitProject = () => {
	const projctNav = document.getElementById('projectNav')

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
		.then(project => {
			const newProjectCard = `
				<div id="${project.data.id}" class="projectCard" draggable="true" ondragstart="drag(event)">
					<button class="deleteButton" onclick="handleDeleteProject(event)">X</button>
					<p><b>Name:</b> <u>${project.data.attributes.name}</u></p>
					<p><b>Status:</b> ${project.data.attributes.status}</p>
				</div>
			`
			projctNav.insertAdjacentHTML('beforeend', newProjectCard)
		})
		.catch(error => console.error('There was an err while creating ur project', error))
	handleCloseModal()
}

const handleCloseModal = () => {
	document.getElementById('myModal').remove()
}

updateTaskStatus = (taskId, status) => {
	fetch(`${TASKS}/${taskId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"status": status
		})
	})
		.then(response => response.json())
		.then(task => {
			console.log('TASK!', task)
		})
		.catch(error => console.error('there was an err trying to delete this project!', error))
}

const handleDeleteProject = (event) => {
	const projectId = event.target.parentNode.id
	fetch(`${PROJECTS}/${projectId}`, {
		method: 'DELETE'
	})
		.then(response => response.json())
		.then(() => event.target.parentNode.remove());
}