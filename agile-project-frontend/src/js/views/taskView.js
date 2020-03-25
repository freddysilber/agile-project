import { projectsUrl } from "../config"

export const getTaskCard = (id, name, status) => {
	return `
		<div id="${id}" class="taskCard" draggable="true" ondragstart="drag(event)" onclick="handleSelectTask(event)">
			<i id="closeModal" class="far fa-times-circle deleteButton" onclick="handleDeleteTask(event)"></i>
			<p><b>Name:</b> <u>${name}</u></p>
			<p><b>Status:</b> <u>${status}</u></p>
		</div>
	`
}

export const getTaskEdit = (id, name) => {
	return `
		<div style="margin: 1rem">
			<center>
				<p>Edit Task</p>
				<hr>
				<label for"${id}">Name:</label>
				<input id="${id}" type="text" value="${name}">
				<button onclick="handleUpdateTask(event)">Update</button>
			</center>
		</div>
	`
}

export const createTaskModal = (status, projects) => {
	let projectOptions = []
	projects.data.forEach(project => {
		projectOptions.push(`
			<option id="${project.id}">${project.attributes.name}</option>
		`)
	})
	return `
		<div id="myModal" class="modal">
			<div class="modalContent">
				<i id="closeModal" class="far fa-times-circle modalButton deleteButton" onclick="handleCloseModal()"></i>
				<center>
					<div class="modalBody">
						<p>Name: <input id="taskName" type="text" placeholder="Task Name"  name="taskName"></input></p>
						<select id="projectSelect">${projectOptions.join('')}</select>
					</div>
					<button id="${status}" onclick="submitTask(event)">Create Task</button>
				</center>
			</div>
		</div>
	`
}

export const removePreviousTaskEdit = () => {
	const recordView = document.getElementById('recordView')
	while (recordView.firstChild) {
		recordView.firstChild.remove()
	}
}

export const clearTaskCardBackgrounds = () => {
	const cards = document.querySelectorAll('.taskCard')
	cards.forEach(card => {
		card.style.background = ''
	})
}