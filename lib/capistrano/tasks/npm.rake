
namespace :npm do
  desc 'Npm install'
  task :install do
    on roles(:app) do
      within current_path do
        execute 'cd /home/deploy/apps/poeipsum/current && /usr/local/bin/npm install'
      end
    end
  end
end