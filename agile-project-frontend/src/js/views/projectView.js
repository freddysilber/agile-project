export const getProjectCard = (id, name, status) => {
	return `
		<div id="${id}" class="projectCard" onclick="handleSelectProject(event)">
			<button class="deleteButton" onclick="handleDeleteProject(event)">X</button>
			<p><b>Name:</b> <u>${name}</u></p>
			<p><b>Status:</b> ${status}</p>
		</div>
	`
}