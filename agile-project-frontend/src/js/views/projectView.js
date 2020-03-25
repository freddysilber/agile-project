export const renderProjectCard = (id, name, status) => {
	return `
		<div id="${id}" class="projectCard" onclick="handleSelectProject(event)">
			<i id="closeModal" class="far fa-times-circle deleteButton" onclick="handleDeleteProject(event)"></i>
			<p><b>Name:</b> <u>${name}</u></p>
			<p><b>Status:</b> ${status}</p>
		</div>
	`
}

export const clearProjectCardBackgrounds = () => {
	const cards = document.querySelectorAll('.projectCard')
	cards.forEach(card => {
		card.style.background = ''
	})
}