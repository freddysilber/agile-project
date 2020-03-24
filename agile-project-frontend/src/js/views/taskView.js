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
		<div>
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