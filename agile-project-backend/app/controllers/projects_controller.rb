class ProjectsController < ApplicationController
	def index
		projects = Project.all
		render json: ProjectSerializer.new(projects)
	end

	def create
		project = Project.create(
			name: params[:name], 
			status: params[:status]
		)
		render json: ProjectSerializer.new(project)
	end

	def destroy
		project = Project.find(
			params[:id]
		)
		unless Project.nil?
			project.destroy
			render json: ProjectSerializer.new(projects)
		else
			render json: {error: 'Project no Found!'}
		end
	end
end
