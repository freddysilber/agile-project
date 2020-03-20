class ProjectsController < ApplicationController
	def index
		projects = Project.all
		render json: ProjectSerializer.new(projects)
	end
end
