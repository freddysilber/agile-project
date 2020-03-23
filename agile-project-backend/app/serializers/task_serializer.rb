class TaskSerializer 
	include FastJsonapi::ObjectSerializer
	attributes :name, :status, :project_id
	belongs_to :project
end