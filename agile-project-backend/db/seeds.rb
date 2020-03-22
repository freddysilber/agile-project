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
Task.delete_all

project_names = [
	'Project 1.0.0',
	'while (1 < 2)',
	'4 x 4 = 12',
	'Another (lame) Project Name',
	'POWER MODE',
	'Freddy\'s Project',
	'[Iterm2] setup',
	'p10k build',
	'<coding>'
]

task_names = [
	'Task 1',
	'Task 2',
	'Task 3',
	'Task 4',
	'Task 5'
]

project_names.each do |name|
	project = Project.create(name: name, status: 'Not Started')
	task_names.each do |task_name|
		Task.create(name: task_name, project_id: project.id)
	end
end