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

	def update
		project = Project.find(
			params[:id]
		)
		unless Project.nil?
			project.update(status: params[:status])
			render json: ProjectSerializer.new(project)
		else
			render json: {error: 'No Project frounf!'}
		end
	end

	def destroy
		project = Project.find(
			params[:id]
		)
		unless Project.nil?
			project.destroy
			render json: ProjectSerializer.new(project)
		else
			render json: {error: 'Project no Found!'}
		end
	end
end
