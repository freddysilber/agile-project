import { projectsUrl, projectStatuses } from '../constants/config'
import * as ProjectView from '../views/projectView'

export class Project {
	constructor(id, name, status) {
		this.id = id
		this.name = name
		this.status = status
	}
}

export const deleteProj = projectId => {
	fetch(`${projectsUrl}/${projectId}`, {
		method: 'DELETE'
	})
		.then(response => response.json())
		.catch(error => console.error('There was an error trying to delete your project', error))
}

export const all = async () => await (await fetch(projectsUrl)).json()

export const getProject = async (projectId) => await (await fetch(`${projectsUrl}/${projectId}`)).json()

export const create = (name, nav) => {
	fetch(projectsUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'name': name,
			'status': projectStatuses[0]
		})
	})
		.then(response => response.json())
		.then(project => {
			const newProjectCard = ProjectView.renderProjectCard(project.data.id, project.data.attributes.name, project.data.attributes.status)
			nav.insertAdjacentHTML('beforeend', newProjectCard)
		})
		.catch(error => console.error('There was an err while creating ur project', error))
}

export const editProject = (id, name) => {
	fetch(`${projectsUrl}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'name': name,
			'status': projectStatuses[0]
		})
	})
		.then(response => response.json())
		.then(project => {
			const newProjectCard = ProjectView.renderProjectCard(project.data.id, project.data.attributes.name, project.data.attributes.status)
			projectNav.insertAdjacentHTML('beforeend', newProjectCard)
			const oldProjectCard = document.querySelector(`.projectCard[id="${id}"]`)
			oldProjectCard.remove()
		})
}