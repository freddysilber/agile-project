import { elements, getColumn } from '../views/base'
import { taskStatuses } from '../config'

// export const drawBoard = () => {
// 	// clearBoard()
// 	const columns = elements.columns
// 	// const columns = document.querySelectorAll('.column')
// 	taskStatuses.forEach(status => {
// 		elements.kanban.insertAdjacentHTML('beforeend', getColumn(status))
// 	})
// 	columns.forEach(column => {
// 		column.remove()
// 	})
// }

// export const clearBoard = () => {
// 	const columns = document.querySelectorAll('.column')
// 	columns.forEach(column => {
// 		column.remove()
// 	})
// }