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
			task.update(task_params)
			render json: TaskSerializer.new(task)
		else
			render json: {error: 'Mad error homie!'}
		end
	end

	def show
		task = Task.find(
			params[:id]
		)
		render json: TaskSerializer.new(task)
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

	private 
	
	def task_params
		params.require(:task).permit(
			:name,
			:status
		)
	end
end
