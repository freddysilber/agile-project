class ProjectsController < ApplicationController
	def index
		projects = Project.all
		render json: ProjectSerializer.new(projects)
	end

	def create
		Project.create(name: params[:name], status: params[:status])
		render json: ProjectSerializer.new(projects)
	end

	def destroy
		project = Project.find(params[:id])
		unless Project.nil?
			project.destroy
			render json: ProjectSerializer.new(projects)
		else
			render json: {error: 'Project no Found!'}
		end
	end

	# def destroy
	# 	pokemon = Pokemon.find(params[:id])
	# 	unless pokemon.nil?
	# 	  pokemon.destroy
	# 	  render json: pokemon
	# 	else
	# 	  render json: { error: "Pokemon not Found!" }, status: 404
	# 	end
	#   end
end
