class TasksController < ApplicationController
	def index
		tasks = Task.all
		render json: TaskSerializer.new(tasks)
	end
end
