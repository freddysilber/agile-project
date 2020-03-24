export const elements = {
	closeModalIcon: document.getElementById('closeModal'),
	projectNav: document.getElementById('projectNav'),
	kanban: document.getElementById('kanban'),
	masterContainer: document.getElementById('masterContainer'),
	createProjectIcon: document.getElementById('createProject')
}

export const getColumn = (status) => {
	return `
		<div id="${status}" class="column" ondrop="drop(event)" ondragover="allowDrop(event)">
			<h3 class="columnTitle"><em><u>${status}</u></em></h3>
		</div>
	`
}

export const newProjectModal = `
	<div id="myModal" class="modal">
		<div class="modalContent">
			<!--<button class="modalButton" name="closeModal" onclick="handleCloseModal()">X</button>-->
			<i id="closeModal" class="far fa-times-circle modalButton"></i>
			<center>
				<div class="modalBody">
					<p>Name: <input id="projectName" type="text" placeholder="Project Name"  name="projectName"></input></p>
				</div>
				<button onclick="submitProject()">Create Project</button>
			</center>
		</div>
	</div>
`