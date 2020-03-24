import { projectsUrl} from '../config'

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
}