import { Project, deleteProject } from './models/Project'
import { deleteTask } from './models/Task'
import { projectsUrl, tasksUrl, projectStatuses, taskStatuses } from './config'
import { elements, newProjectModal, editProjectModal, getColumn } from './views/base'
import * as ProjectView from './views/projectView'
import * as TaskView from './views/taskView'

window.addEventListener('DOMContentLoaded', () => {
	drawBoard()
	getProjects().then(data => {
		createProjectCards(data.data).forEach(project => {
			elements.projectNav.insertAdjacentHTML('beforeend', ProjectView.renderProjectCard(project.id, project.name, project.status))
		})
	})
})

const getProjects = async () => {
	return await (await fetch(projectsUrl)).json()
}

const createProjectCards = (data) => {
	return data.map(project => new Project(project.id, project.attributes.name, project.attributes.status))
}

window.handleSelectProject = (event) => {
	drawBoard()
	ProjectView.clearProjectCardBackgrounds()
	let projectCard = event.target
	while (!projectCard.classList.contains('projectCard')) {
		projectCard = projectCard.parentElement
	}
	projectCard.style.background = 'lightgray'
	fetch(`${projectsUrl}/${projectCard.id}`)
		.then(response => response.json())
		.then(data => {
			const projectTasks = data.data.attributes.tasks
			projectTasks.forEach(task => {
				document.querySelector(`.column[id="${task.status}"]`).insertAdjacentHTML('beforeend', TaskView.getTaskCard(task.id, task.name, task.status))
			})
		})
		.catch(error => console.error('There was an err trying to get ur project', error))
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

window.allowDrop = (event) => {
	event.srcElement.style.background = '#F3F3F3'
	event.preventDefault()
}

window.handleDragLeave = (event) => {
	event.srcElement.style.background = ''
	event.preventDefault()
}

window.drag = (event) => {
	event.dataTransfer.setData('text', event.target.id)
}

window.drop = (event) => {
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

window.handleCreateProject = () => {
	handleNewProject()
}

const handleNewProject = () => {
	elements.masterContainer.insertAdjacentHTML('beforebegin', newProjectModal)
}

window.submitProject = () => { // Create project
	const projectName = document.getElementById('projectName').value
	const projectNav = document.getElementById('projectNav')
	fetch(projectsUrl, { //ww.locaalhost/projects
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
			const newProjectCard = ProjectView.renderProjectCard(project.data.id, project.data.attributes.name, project.data.attributes.status)
			projectNav.insertAdjacentHTML('beforeend', newProjectCard)
		})
		.catch(error => console.error('There was an err while creating ur project', error))
	handleCloseModal()
}

window.editProject = (projectId) => { // edit project
	const projectName = document.getElementById('projectName').value
	fetch(`${projectsUrl}/${projectId}`, {
		method: 'PATCH',
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
			const newProjectCard = ProjectView.renderProjectCard(project.data.id, project.data.attributes.name, project.data.attributes.status)
			projectNav.insertAdjacentHTML('beforeend', newProjectCard)
			const oldProjectCard = document.querySelector(`.projectCard[id="${projectId}"]`)
			oldProjectCard.remove()
		})
	handleCloseModal()
}

window.handleCloseModal = () => {
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
			const newTaskCard = TaskView.getTaskCard(task.data.id, task.data.attributes.name, task.data.attributes.status)
			const taskCard = document.querySelector(`.taskCard[id="${task.data.id}"]`)
			taskCard.remove()
			const column = document.querySelector(`.column[id="${task.data.attributes.status}"]`)
			column.insertAdjacentHTML('beforeend', newTaskCard)
		})
		.catch(error => console.error('there was an err trying to delete this project!', error))
}

window.handleDeleteProject = (event) => {
	event.stopPropagation()
	deleteProject(event.target.parentNode.id)
	event.target.parentNode.remove()
}

window.handleDeleteTask = (event) => {
	event.stopPropagation()
	const taskId = event.target.parentNode.id
	deleteTask(taskId)
	event.target.parentNode.remove()
}

window.handleSelectTask = (event) => {
	TaskView.removePreviousTaskEdit()
	TaskView.clearTaskCardBackgrounds()
	let taskCard = event.target
	while (!taskCard.classList.contains('taskCard')) {
		taskCard = taskCard.parentNode
	}
	taskCard.style.background = 'lightgray'
	const taskId = taskCard.id
	fetch(`${tasksUrl}/${taskId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(task => {
			recordView.insertAdjacentHTML('beforeend', TaskView.getTaskEdit(task.data.id, task.data.attributes.name))
		})
}

window.handleUpdateTask = (event) => {
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
			const newTaskCard = TaskView.getTaskCard(task.data.id, task.data.attributes.name, task.data.attributes.status)
			const taskCard = document.querySelector(`.taskCard[id="${task.data.id}"]`)
			taskCard.remove()
			const column = document.querySelector(`.column[id="${task.data.attributes.status}"]`)
			column.insertAdjacentHTML('beforeend', newTaskCard)
		})
		.catch(error => console.error('There was an err while updating this task', error))
}

window.handleEditProject = (event) => {
	const projectName = event.srcElement.nextElementSibling.textContent.split(':')[1]
	const projectId = event.srcElement.parentNode.id
	elements.masterContainer.insertAdjacentHTML('beforebegin', editProjectModal(projectId, projectName))
}

window.handleCreateTask = (event) => {
	const status = event.target.id
	getProjects().then(data => {
		elements.masterContainer.insertAdjacentHTML('beforebegin', TaskView.createTaskModal(status, data))
	})
}

window.submitTask = (event) => {
	const taskName = document.getElementById('taskName').value
	const projectName = document.getElementById('projectSelect').value
	const options = document.querySelectorAll('option')
	let projectId
	options.forEach(option => {
		if (option.innerText === projectName) {
			projectId = option.id
		}
	})
	const status = event.target.id
	fetch(tasksUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'name': taskName,
			'status': status,
			'project_id': projectId
		})
	})
		.then(response => response.json())
		.catch(error => console.error('There was an error while creating this task', error))
	handleCloseModal()
}

window.handleSortByStatus = () => {
	const projectNav = document.querySelector('#projectNav')
	const projectCards = document.querySelectorAll('.projectCard')
	let projects = Array.from(projectCards)

	projects.sort((a, b) => {
		const firstValue = a.children[3].innerText
		const secondValue = b.children[3].innerText
		if (firstValue !== secondValue) {
			return -1
		}
		if (firstValue === secondValue) {
			return 1
		}
		return 0
	})
	projectCards.forEach(card => {
		card.remove()
	})
	projects.forEach(p => {
		console.log(p)
		projectNav.insertAdjacentElement('beforeend', p)
	})
}