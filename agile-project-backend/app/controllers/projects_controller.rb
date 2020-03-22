class ProjectsController < ApplicationController
	def index
		projects = Project.all
		render json: ProjectSerializer.new(projects)
	end

	def create
		project_name = params[:name]
		Project.create(name: project_name)
		render json: ProjectSerializer.new(projects)
	end
end
