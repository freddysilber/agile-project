class ProjectSerializer 
	include FastJsonapi::ObjectSerializer
	attributes :name, :status
	has_many :tasks, :dependent => :destroy
end