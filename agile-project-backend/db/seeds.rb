# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'securerandom'

Project.delete_all 

project_names = [
	'Project1',
	'while(1 < 2)',
	'4x4=12',
	'Another Project Name',
	'POWER MODE'
]

project_names.each do |name|
	Project.create(name: name)
end