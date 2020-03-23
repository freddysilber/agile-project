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
		unless project.nil?
			project.update(project_params)
			render json: ProjectSerializer.new(project)
		else
			render json: {error: 'Mad error homie!'}
		end
	end

	def show
		project = Project.find(
			params[:id]
		)
		render json: ProjectSerializer.new(project)
	end

	def destroy
		project = Project.find(
			params[:id]
		)
		unless project.nil?
			project.destroy
			render json: ProjectSerializer.new(project)
		else
			render json: {error: 'Mad error homie!'}
		end
	end

	private

	def project_params
		params.require(:project).permit(
			:name,
			:status
		)
	end
end
