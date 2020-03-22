class ProjectSerializer 
	include FastJsonapi::ObjectSerializer
	has_many :tasks, :dependent => :destroy
	attributes :name, :status, :tasks
end