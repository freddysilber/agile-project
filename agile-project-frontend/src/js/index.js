import { Project, deleteProject } from './models/Project'
import { projectsUrl, tasksUrl, projectStatuses, taskStatuses } from './config'
import { elements, newProjectModal, getColumn } from './views/base'
import * as ProjectView from './views/projectView'

window.addEventListener('DOMContentLoaded', () => {
	console.log('%c Greetings earthling!', 'color: gold; font-size: 2em')
	drawBoard()
	getProjects().then(data => {
		const projects = createProjectCards(data.data)
		projects.forEach(project => {
			const cardItem = createProjectCard(project.id, project.name, project.status)
			elements.projectNav.insertAdjacentHTML('beforeend', cardItem)
		})
	})
})

const handleSelectProject = (event) => {
	drawBoard()
	let projectCard = event.target
	while (!projectCard.classList.contains('projectCard')) {
		projectCard = projectCard.parentElement
	}
	fetch(`${projectsUrl}/${projectCard.id}`)
		.then(response => response.json())
		.then(data => {
			const projectTasks = data.data.attributes.tasks
			projectTasks.forEach(task => {
				const taskCard = createTaskCard(task.id, task.name, task.status)
				document.querySelector(`.column[id="${task.status}"]`).insertAdjacentHTML('beforeend', taskCard)
			})
		})
		.catch(error => console.error('There was an err trying to get ur project', error))
}

const getProjects = async () => {
	return await (await fetch(projectsUrl)).json()
}

const createProjectCards = (data) => {
	return data.map(project => new Project(project.id, project.attributes.name, project.attributes.status))
}

const drawBoard = () => {
	clearBoard()
	taskStatuses.forEach(status => {
		elements.kanban.insertAdjacentHTML('beforeend', getColumn(status))
	})
}

const clearBoard = () => {
	const columns = document.querySelectorAll('.column')
	columns.forEach(column => {
		column.remove()
	})
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
	column.appendChild(document.querySelector(`.taskCard[id="${data}"]`))
	updateTaskStatus(data, columnId)
}

const addColumn = () => {
	taskStatuses.push('-- NEW COL --')
	drawBoard()
}

elements.createProjectIcon.addEventListener('click', () => {
	handleNewProject()
})

const handleNewProject = () => {
	elements.masterContainer.insertAdjacentHTML('beforebegin', newProjectModal)
}

const submitProject = () => {
	const projctNav = document.getElementById('projectNav')
	const projectName = document.getElementById('projectName').value
	fetch(projectsUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'name': projectName,
			'status': projectStatuses[0]
		})
	})
		.then(response => response.json())
		.then(project => {
			const newProjectCard = createProjectCard(project.data.id, project.data.attributes.name, project.data.attributes.status)
			projctNav.insertAdjacentHTML('beforeend', newProjectCard)
		})
		.catch(error => console.error('There was an err while creating ur project', error))
	handleCloseModal()
}

const handleCloseModal = () => {
	document.getElementById('myModal').remove()
}

const updateTaskStatus = (taskId, status) => {
	fetch(`${tasksUrl}/${taskId}`, {
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
			const newTaskCard = createTaskCard(task.data.id, task.data.attributes.name, task.data.attributes.status)
			const taskCard = document.querySelector(`.taskCard[id="${task.data.id}"]`)
			taskCard.remove()
			const column = document.querySelector(`.column[id="${task.data.attributes.status}"]`)
			column.insertAdjacentHTML('beforeend', newTaskCard)
		})
		.catch(error => console.error('there was an err trying to delete this project!', error))
}

const handleDeleteProject = (event) => {
	console.log('HANDLE DELETE PROJECT')
	event.stopPropagation()
	deleteProject(event.target.parentNode.id)
	// const projectId = event.target.parentNode.id
	// fetch(`${projectsUrl}/${projectId}`, {
	// 	method: 'DELETE'
	// })
	// 	.then(response => response.json())
	// 	.then(() => event.target.parentNode.remove());
}

const handleDeleteTask = (event) => {
	event.stopPropagation()
	const taskId = event.target.parentNode.id
	fetch(`${tasksUrl}/${taskId}`, {
		method: 'DELETE'
	})
		.then(response => response.json())
		.then(() => event.target.parentNode.remove())
}

const handleSelectTask = (event) => {
	const recordView = document.getElementById('recordView')
	while (recordView.firstChild) {
		recordView.firstChild.remove()
	}
	let taskCard = event.target
	while (!taskCard.classList.contains('taskCard')) {
		taskCard = taskCard.parentNode
	}
	const taskId = taskCard.id
	fetch(`${tasksUrl}/${taskId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(task => {
			console.log(task)
			const taskEdit = `
				<div>
					<p>Edit Task</p>
					<center>
						<input id="${task.data.id}" type="text" value="${task.data.attributes.name}">
						<button onclick="handleUpdateTask(event)">Update</button>
					</center>
				</div>
			`
			recordView.insertAdjacentHTML('beforeend', taskEdit)
		})
}

const handleUpdateTask = (event) => {
	const taskId = event.target.previousElementSibling.id
	const newTaskName = event.target.previousElementSibling.value
	fetch(`${tasksUrl}/${taskId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"name": newTaskName
		})
	})
		.then(response => response.json())
		.then(task => {
			const newTaskCard = createTaskCard(task.data.id, task.data.attributes.name, task.data.attributes.status)
			const taskCard = document.querySelector(`.taskCard[id="${task.data.id}"]`)
			taskCard.remove()
			const column = document.querySelector(`.column[id="${task.data.attributes.status}"]`)
			column.insertAdjacentHTML('beforeend', newTaskCard)
		})
		.catch(error => console.error('There was an err while updating this task', error))
}

const createTaskCard = (id, name, status) => {
	return `
		<div id="${id}" class="taskCard" draggable="true" ondragstart="drag(event)" onclick="handleSelectTask(event)">
			<button class="deleteButton" onclick="handleDeleteTask(event)">X</button>
			<p><b>Name:</b> <u>${name}</u></p>
			<p><b>Status:</b> <u>${status}</u></p>
		</div>
	`
}

const createProjectCard = (id, name, status) => {
	return ProjectView.getProjectCard(id, name, status)
}