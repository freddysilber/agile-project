class TaskSerializer 
	include FastJsonapi::ObjectSerializer
	attributes :name, :project_id
	belongs_to :project
end