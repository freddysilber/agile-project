import { projectsUrl, projectStatuses } from '../config'
import * as ProjectView from '../views/projectView'

export class Project {
	constructor(id, name, status) {
		this.id = id
		this.name = name
		this.status = status
	}
}

export const deleteProject = (projectId) => {
	fetch(`${projectsUrl}/${projectId}`, {
		method: 'DELETE'
	})
		.then(response => response.json())
		.catch(error => console.error('There was an error trying to delete your project', error))
}