class ProjectSerializer 
	include FastJsonapi::ObjectSerializer
	attributes :name, :status
end