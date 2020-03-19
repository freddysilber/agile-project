class ProjectSerializer 
	include FastJsonapi::ObjectSerializer
	attributes :name
# class ProjectSerializer < ActiveModel::Serializer
	# def initialize(project_object)
	# 	@project = project_object
	# end

	# def to_serialized_json
	# 	@project.to_json(include: [:name])
	# end
end