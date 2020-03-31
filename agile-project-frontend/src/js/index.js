// import { Project, deleteProject } from './models/Project'
import * as Project from './models/Project'
import * as Task from './models/Task'
import { projectsUrl, tasksUrl, projectStatuses, taskStatuses } from './config'
import { elements, newProjectModal, editProjectModal, getColumn } from './views/base'
import * as ProjectView from './views/projectView'
import * as TaskView from './views/taskView'
import * as Util from './helpers/Util'

window.addEventListener('DOMContentLoaded', () => {
	drawBoard()
	Project.all().then(data => {
		createProjectCards(data.data).forEach(project => {
			elements.projectNav.insertAdjacentHTML('beforeend', ProjectView.renderProjectCard(project.id, project.name, project.status))
		})
	})
})

const createProjectCards = (data) => {
	return data.map(project => new Project.Project(project.id, project.attributes.name, project.attributes.status))
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
	Util.clearBoard()
	taskStatuses.forEach(status => {
		elements.kanban.insertAdjacentHTML('beforeend', getColumn(status))
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
	Project.create(projectName, projectNav)
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
	Task.update(taskId, newTaskName)
}

window.handleEditProject = (event) => {
	const projectName = event.srcElement.nextElementSibling.textContent.split(':')[1]
	const projectId = event.srcElement.parentNode.id
	elements.masterContainer.insertAdjacentHTML('beforebegin', editProjectModal(projectId, projectName))
}

window.handleCreateTask = (event) => {
	const status = event.target.id
	Project.all().then(data => {
		elements.masterContainer.insertAdjacentHTML('beforebegin', TaskView.createTaskModal(status, data))
	})
}

window.submitTask = (event) => {
	Task.create(event.target.id)
	handleCloseModal()
}

window.handleSortByStatus = () => { // Toggles sort by status feature implemented on final project review part 1
	Util.SortProjectsByStatus() // call util to hanlde sorting
}