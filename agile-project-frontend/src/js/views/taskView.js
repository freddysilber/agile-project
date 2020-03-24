export const getTaskCard = (id, name, status) => {
	return `
		<div id="${id}" class="taskCard" draggable="true" ondragstart="drag(event)" onclick="handleSelectTask(event)">
			<button class="deleteButton" onclick="handleDeleteTask(event)">X</button>
			<p><b>Name:</b> <u>${name}</u></p>
			<p><b>Status:</b> <u>${status}</u></p>
		</div>
	`
}

export const getTaskEdit = (id, name) => {
	return `
		<div>
			<p>Edit Task</p>
			<center>
				<input id="${id}" type="text" value="${name}">
				<button onclick="handleUpdateTask(event)">Update</button>
			</center>
		</div>
	`
}