lock '3.4.0'

set :application, 'poeipsum'
set :repo_url, 'git@github.com:DKunin/poeipsum.git'
set :branch, 'master'
set :deploy_to, '~/apps/poeipsum'


namespace :deploy do

  desc 'Install npm'
  task :npm do
     invoke 'assets:sync_vendor'
  end

  desc 'Stop application'
  task :stop do
    invoke 'pm2:stop'
  end

  desc 'Delete application'
  task :delete do
    invoke 'pm2:delete'
  end

  desc 'Start application'
  task :start do
    invoke 'pm2:start'
  end

  after :publishing,:npm
  after :npm, :stop 
  after :stop, :delete 
  after :delete, :start 
end