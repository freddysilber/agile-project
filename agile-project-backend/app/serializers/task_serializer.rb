class TaskSerializer 
	include FastJsonapi::ObjectSerializer
	attributes :name
	belongs_to :project
end