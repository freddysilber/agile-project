class ProjectsController < ApplicationController
	def index
		projects = Project.all
		render json: ProjectSerializer.new(projects)
	end

	def create
		Project.create(name: Faker::Name.name)
		render json: ProjectSerializer.new(projects)
		# project = Project.find(params['project']['project_id'])
		# raise project
		# trainer = Trainer.find(params["pokemon"]["trainer_id"])
		
		# if trainer.pokemons.count >= 6 
		#   render json: { error: "Party is Full!"}, status: 403
		# else 
		#   pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer: trainer)
		#   render json: pokemon, status: 200
		# end
	end
end
