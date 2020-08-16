import { tasksUrl } from '../constants/config'
import * as TaskView from '../views/taskView'

export class Task {
	constructor(id, name, status) {
		this.id = id
		this.name = name
		this.status = status
	}
}

export const deleteTask = taskId => {
	fetch(`${tasksUrl}/${taskId}`, {
		method: 'DELETE'
	})
		.then(response => response.json())
		.catch(error => console.error('There was an error trying to delete your project', error))
}

export const create = status => {
	const taskName = document.getElementById('taskName').value
	const projectName = document.getElementById('projectSelect').value
	const options = document.querySelectorAll('option')
	let projectId
	options.forEach(option => {
		if (option.innerText === projectName) {
			projectId = option.id
		}
	})
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
}

export const update = (id, name) => {
	fetch(`${tasksUrl}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"name": name
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

export const getTask = (id) => {
	fetch(`${tasksUrl}/${id}`, {
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

export const updateStatus = (id, status) => {
	fetch(`${tasksUrl}/${id}`, {
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