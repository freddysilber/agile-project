//  Project > Task > Status
//  Project > Tasks < Status
const ROOT_URL = 'http://localhost:3000'
const PROJECTS = `${ROOT_URL}/projects`
const STATUSES = [
	'Backlog',
	'Open',
	'In Progress',
	'Closed'
]

window.addEventListener("DOMContentLoaded", () => {
	const projectNav = document.getElementById('projectNav')
	drawBoard()
	getProjects().then(data => {
		const projects = createProjectCards(data.data)
		projects.forEach(project => {
			const cardItem = `
				<div id="${project.id}" class="projectCard" draggable="true" ondragstart="drag(event)">
					<p>project id - ${project.id}</p>
					<p>project name - ${project.name}</p>
					<p>project status - ${project.status}</p>
				</div>
			`
			projectNav.insertAdjacentHTML('beforeend', cardItem)
		})
	})
})

const getProjects = async () => {
	return await (await fetch(PROJECTS)).json()
}

const createProjectCards = (data) => {
	return data.map(project => new Project(project.id, project.attributes.name, project.attributes.status))
}

const drawBoard = () => {
	clearBoard()
	const kanban = document.getElementById('kanban')
	STATUSES.forEach(status => {
		const column = `
			<div id="${status}" class="column" ondrop="drop(event)" ondragover="allowDrop(event)">
				<h3 class="columnTitle"><em><u>${status}</u></em></h3>
			</div>
		`
		kanban.insertAdjacentHTML('beforeend', column)
	})
}

const clearBoard = () => {
	const columns = document.querySelectorAll('.column')
	columns.forEach(column => {
		column.remove()
	})
}
class Project {
	constructor(id, name, status) {
		this.id = id
		this.name = name
		this.status = status
	}
}

const allowDrop = (event) => {
	event.preventDefault()
}

const drag = (event) => {
	event.dataTransfer.setData("text", event.target.id)
}

const drop = (event) => {
	event.preventDefault()
	let column = event.srcElement
	const data = event.dataTransfer.getData("text") // PROJECT_ID
	while (!column.classList.contains('column')) {
		column = column.parentElement
	}
	const columnId = column.id // COLUMN_ID (from status)
	column.appendChild(document.getElementById(data))

	updateProjectStatus(data, columnId)
}

const addColumn = () => {
	STATUSES.push('-- NEW COL --')
	drawBoard()
}

const handleNewProject = (event) => {
	const app = document.getElementById('app')
	const modal = `
		<div id="myModal" class="modal">
			<div class="modal-content">
				<button class="modalButton" name="closeModal" onclick="handleCloseModal()">Close</button>
				<center><p>New Project</p>
					<div class="modalBody">
						<input id="projectName" type="text" placeholder="Project Name"  name="projectName"></input>
					</div>
					<div class="footer">HERE IS THE FOOTER OF THE MODAL</div>
					<button onclick="submitProject()">Create Project</button>
				</center>
			</div>
		</div>
	`
	app.insertAdjacentHTML('beforebegin', modal)
}

const submitProject = () => {
	const projectName = document.getElementById('projectName').value
	console.log(projectName)
	fetch(PROJECTS, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'name': projectName
		})
	})
		.then(response => response.json())
		.then(newProject => {
			console.log('newproject', newProject)
		})
		.catch(error => console.error(error))
	handleCloseModal()
}

const handleCloseModal = () => {
	document.getElementById('myModal').remove()
}

const reLoad = () => {
	window.location.reload()
}

updateProjectStatus = (projectId, status) => {
	console.log(projectId, status)
	fetch(PROJECTS, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'project_id': projectId
		})
	})
		.then(response => response.json())
		.then(project => {
			console.log(project)
		})
		.catch(error => { console.error(error) })
}

// trainersContainer.addEventListener('click', (e) => {
// 	if (e.target.dataset.action === "add"){
// 	  const trainerId = e.target.dataset.trainerId;
// 	  const trainerUl = e.target.parentNode.querySelector('ul');
// 	  if (trainerUl.children.length < 6){
// 		fetch(POKEMONS_URL, {
// 		  method: 'POST',
// 		  headers: {
// 			'Content-Type': 'application/json'
// 		  },
// 		  body: JSON.stringify({
// 			"trainer_id": trainerId
// 		  })
// 		})
// 		.then(resp => resp.json())
// 		.then(newPokemon => {
// 		  const pokeHTML = `
// 		  <li>${newPokemon.nickname} (${newPokemon.species}) 
// 			<button class="release" data-pokemon-id=${newPokemon.id}>
// 			  Release
// 			</button>
// 		  </li>`;

// 		  trainerUl.insertAdjacentHTML('beforeend', pokeHTML);
// 		})
// 	  }
// 	};
// 	if (e.target.classList.contains("release")){
// 	  const pokemonId = e.target.dataset.pokemonId;
// 	  fetch(`${POKEMONS_URL}/${pokemonId}`, {
// 		method: 'DELETE'
// 	  })
// 	  .then(resp => resp.json())
// 	  .then(() => e.target.parentNode.remove());
// 	}