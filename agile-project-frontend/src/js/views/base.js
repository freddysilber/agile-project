export const elements = {
	closeModalIcon: document.getElementById('closeModal'),
	projectNav: document.getElementById('projectNav'),
	kanban: document.getElementById('kanban'),
	masterContainer: document.getElementById('masterContainer'),
	createProjectIcon: document.getElementById('createProject'),
	columns: document.querySelectorAll('.column')
}

export const getColumn = status => {
	return `
		<div id="${status}" class="column" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="handleDragLeave(event)">
			<i id="${status}" class="far fa-plus-square fa-lg createTaskIcon" onclick="handleCreateTask(event)"></i>
			<h3 class="columnTitle"><em>${status}</em></h3>
		</div>
	`
}

export const newProjectModal = `
	<div id="myModal" class="modal">
		<div class="modalContent">
			<i id="closeModal" class="far fa-times-circle modalButton deleteButton" onclick="handleCloseModal()"></i>
			<center>
				<div class="modalBody">
					<p>Name: <input id="projectName" type="text" placeholder="Project Name"  name="projectName"></input></p>
				</div>
				<button onclick="submitProject()">Create Project</button>
			</center>
		</div>
	</div>
`

export const editProjectModal = (projectId, projectName) => {
	return `
		<div id="myModal" class="modal">
			<div class="modalContent">
				<i id="closeModal" class="far fa-times-circle modalButton deleteButton" onclick="handleCloseModal()"></i>
				<center>
					<div class="modalBody">
						<p>Name: <input id="projectName" type="text" placeholder="${projectName}"  name="projectName"></input></p>
					</div>
					<button onclick="editProject(${projectId})">Update Project</button>
				</center>
			</div>
		</div>
	`
}