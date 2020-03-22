class ProjectsController < ApplicationController
	def index
		projects = Project.all
		render json: ProjectSerializer.new(projects)
	end

	def create
		Project.create(name: params[:name], status: params[:status])
		render json: ProjectSerializer.new(projects)
	end
end
