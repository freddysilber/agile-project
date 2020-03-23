class TasksController < ApplicationController
	def index
		tasks = Task.all
		render json: TaskSerializer.new(tasks)
	end

	def update
		task = Task.find(
			params[:id]
		)
		unless task.nil?
			task.update(status: params[:status])
			render json: TaskSerializer.new(task)
		else
			render json: {error: 'Mad error homie!'}
		end
	end

	def destroy
		task = Task.find(
			params[:id]
		)
		unless task.nil?
			task.destroy
			render json: TaskSerializer.new(task)
		else
			render json: {error: 'Mad error homie!'}
		end
	end
end
