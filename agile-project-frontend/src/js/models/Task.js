import { tasksUrl } from '../config'

export class Task {
	constructor(id, name, status) {
		this.id = id
		this.name = name
		this.status = status
	}
}

export const deleteTask = (taskId) => {
	fetch(`${tasksUrl}/${taskId}`, {
		method: 'DELETE'
	})
		.then(response => response.json())
		.catch(error => console.error('There was an error trying to delete your project', error))
}