class ProjectsController < ApplicationController
	def index
		projects = Project.all
		options = {}
		render json: ProjectSerializer.new(projects,options).serializable_hash
	end
end
