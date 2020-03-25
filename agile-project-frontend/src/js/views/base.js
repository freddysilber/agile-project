export const elements = {
	closeModalIcon: document.getElementById('closeModal'),
	projectNav: document.getElementById('projectNav'),
	kanban: document.getElementById('kanban'),
	masterContainer: document.getElementById('masterContainer'),
	createProjectIcon: document.getElementById('createProject'),
	projectCard: document.getElementById('projectCard')
}

export const getColumn = (status) => {
	return `
		<div id="${status}" class="column" ondrop="drop(event)" ondragover="allowDrop(event)">
			<h3 class="columnTitle"><em><u>${status}</u></em></h3>
			<div class="addTaskIconContainer" onclick="handleCreateTask(${status})">
				<i class="far fa-plus-square fa-lg"></i>
			</div>
		</div>
	`
}

export const newProjectModal = `
	<div id="myModal" class="modal">
		<div class="modalContent">
			<i id="closeModal" class="far fa-times-circle modalButton" onclick="handleCloseModal()"></i>
			<center>
				<div class="modalBody">
					<p>Name: <input id="projectName" type="text" placeholder="Project Name"  name="projectName"></input></p>
				</div>
				<button onclick="submitProject()">Create Project</button>
			</center>
		</div>
	</div>
`