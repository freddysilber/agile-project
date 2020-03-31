import { elements, getColumn } from '../views/base'
import { taskStatuses } from '../config'

export const buildBoard = () => {
	const columns = document.querySelectorAll('.column')
	columns.forEach(column => {
		column.remove()
	})
	taskStatuses.forEach(status => {
		elements.kanban.insertAdjacentHTML('beforeend', getColumn(status))
	})
}

export const SortProjectsByStatus = () => {
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
		projectNav.insertAdjacentElement('beforeend', p)
	})
}