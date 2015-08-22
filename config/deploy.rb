lock '3.4.0'

set :application, 'poeipsum'
set :repo_url, 'git@github.com:DKunin/poeipsum.git'
set :branch, 'master'
set :deploy_to, '~/apps/poeipsum'


namespace :deploy do

  desc 'Install npm'
  task :npm do
     invoke 'npm:install'
  end

  desc 'Restart application'
  task :restart do
    invoke 'pm2:update'
  end

  after :publishing,:npm
  after :npm, :restart 
end