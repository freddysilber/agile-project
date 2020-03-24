import { Project, deleteProject } from './models/Project'
import { projectsUrl, tasksUrl, projectStatuses, taskStatuses } from './config'
import { elements, newProjectModal, getColumn } from './views/base'
import * as ProjectView from './views/projectView'
import * as TaskView from './views/taskView'

window.addEventListener('DOMContentLoaded', () => {
	drawBoard()
	getProjects().then(data => {
		const projects = createProjectCards(data.data)
		projects.forEach(project => {
			const cardItem = createProjectCard(project.id, project.name, project.status)
			elements.projectNav.insertAdjacentHTML('beforeend', cardItem)
		})
	})
})

window.handleSelectProject = (event) => {
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

window.allowDrop = (event) => {
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

elements.createProjectIcon.addEventListener('click', () => {
	handleNewProject()
})

const handleNewProject = () => {
	elements.masterContainer.insertAdjacentHTML('beforebegin', newProjectModal)
}

window.submitProject = () => {
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

window.handleDeleteProject = (event) => {
	event.stopPropagation()
	deleteProject(event.target.parentNode.id)
	event.target.parentNode.remove()
}

window.handleDeleteTask = (event) => {
	event.stopPropagation()
	const taskId = event.target.parentNode.id
	fetch(`${tasksUrl}/${taskId}`, {
		method: 'DELETE'
	})
		.then(response => response.json())
		.then(() => event.target.parentNode.remove())
}

window.handleSelectTask = (event) => {
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
			const newTaskCard = createTaskCard(task.data.id, task.data.attributes.name, task.data.attributes.status)
			const taskCard = document.querySelector(`.taskCard[id="${task.data.id}"]`)
			taskCard.remove()
			const column = document.querySelector(`.column[id="${task.data.attributes.status}"]`)
			column.insertAdjacentHTML('beforeend', newTaskCard)
		})
		.catch(error => console.error('There was an err while updating this task', error))
}

const createTaskCard = (id, name, status) => {
	return TaskView.getTaskCard(id, name, status)
}

const createProjectCard = (id, name, status) => {
	return ProjectView.getProjectCard(id, name, status)
}