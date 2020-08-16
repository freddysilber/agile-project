import * as Project from './models/Project'
import * as Task from './models/Task'
import { elements, newProjectModal, editProjectModal } from './views/base'
import * as ProjectView from './views/projectView'
import * as TaskView from './views/taskView'
import * as Util from './helpers/Util'

window.addEventListener('DOMContentLoaded', () => {
	Util.buildBoard()
	Project.all().then(data => {
		createProjectCards(data.data).forEach(project => {
			elements.projectNav.insertAdjacentHTML('beforeend', ProjectView.renderProjectCard(project.id, project.name, project.status))
		})
	})
})

const createProjectCards = data => {
	return data.map(project => new Project.Project(project.id, project.attributes.name, project.attributes.status))
}

window.handleSelectProject = event => {
	Util.buildBoard()
	ProjectView.clearProjectCardBackgrounds()
	let projectCard = event.target
	while (!projectCard.classList.contains('projectCard')) {
		projectCard = projectCard.parentElement
	}
	projectCard.style.background = 'lightgray'

	Project.getProject(projectCard.id).then(data => {
		const projectTasks = data.data.attributes.tasks
		projectTasks.forEach(task => {
			document.querySelector(`.column[id="${task.status}"]`).insertAdjacentHTML('beforeend', TaskView.getTaskCard(task.id, task.name, task.status))
		})
	})
		.catch(error => console.error('There was an err trying to get ur project', error))
}

window.allowDrop = event => {
	event.srcElement.style.background = '#F3F3F3'
	event.preventDefault()
}

window.handleDragLeave = event => {
	event.srcElement.style.background = ''
	event.preventDefault()
}

window.drag = event => event.dataTransfer.setData('text', event.target.id)

window.drop = event => {
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

window.handleCreateProject = () => handleNewProject()

const handleNewProject = () => elements.masterContainer.insertAdjacentHTML('beforebegin', newProjectModal)

window.submitProject = () => { // Create project
	const projectName = document.getElementById('projectName').value
	const projectNav = document.getElementById('projectNav')
	Project.create(projectName, projectNav)
	handleCloseModal()
}

window.editProject = projectId => { // edit project
	const projectName = document.getElementById('projectName').value
	Project.editProject(projectId, projectName)
	handleCloseModal()
}

window.handleCloseModal = () => document.getElementById('myModal').remove()

const updateTaskStatus = (taskId, status) => Task.updateStatus(taskId, status)

window.handleDeleteProject = event => {
	event.stopPropagation()
	Project.deleteProj(event.target.parentNode.id)
	event.target.parentNode.remove()
}

window.handleDeleteTask = event => {
	event.stopPropagation()
	const taskId = event.target.parentNode.id
	deleteTask(taskId)
	event.target.parentNode.remove()
}

window.handleSelectTask = event => {
	TaskView.removePreviousTaskEdit()
	TaskView.clearTaskCardBackgrounds()
	let taskCard = event.target
	while (!taskCard.classList.contains('taskCard')) {
		taskCard = taskCard.parentNode
	}
	taskCard.style.background = 'lightgray'
	Task.getTask(taskCard.id)
}

window.handleUpdateTask = event => {
	const taskId = event.target.previousElementSibling.id
	const newTaskName = event.target.previousElementSibling.value
	Task.update(taskId, newTaskName)
}

window.handleEditProject = event => {
	const projectName = event.srcElement.nextElementSibling.textContent.split(':')[1]
	const projectId = event.srcElement.parentNode.id
	elements.masterContainer.insertAdjacentHTML('beforebegin', editProjectModal(projectId, projectName))
}

window.handleCreateTask = event => {
	const status = event.target.id
	Project.all()
		.then(data => elements.masterContainer.insertAdjacentHTML('beforebegin', TaskView.createTaskModal(status, data)))
}

window.submitTask = event => {
	Task.create(event.target.id)
	handleCloseModal()
}
// Toggles sort by status feature implemented on final project review part 1
window.handleSortByStatus = () => Util.SortProjectsByStatus()