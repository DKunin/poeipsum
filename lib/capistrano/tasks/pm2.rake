require 'json'

namespace :pm2 do

  $app_name = 'poeipsum'
  def status_app
    within current_path do
      ps = JSON.parse(capture '/usr/local/bin/pm2 jlist')    
      if ps.empty?
        nil
      else
        # status: online, errored, stopped
        ps[0]["pm2_env"]["status"]
      end
    end
  end

  def restart_app
    within current_path do
      execute '/usr/local/bin/pm2 restart ' + $app_name
    end
  end

  def start_app
    within current_path do
      execute '/usr/local/bin/pm2 start ~/apps/poeipsum/current/index.js --name '+$app_name
    end
  end

  def stop_app
    within current_path do
      execute '/usr/local/bin/pm2 stop '+ $app_name
    end
  end

  desc 'Stop app'
  task :stop do
    on roles(:app) do
      stop_app
    end
  end


  desc 'Start'
  task :start do
    on roles(:app) do
      start_app
    end
  end

  desc 'Status'
  task :status do
    on roles(:app) do
      within current_path do
        execute '/usr/local/bin/pm2 show '+ $app_name
      end
    end
  end 

  desc 'List'
  task :list do
    on roles(:app) do
      within current_path do
        execute '/usr/local/bin/pm2 list '
      end
    end
  end 

  desc 'Logs'
  task :logs do
    on roles(:app) do
      within current_path do
        execute '/usr/local/bin/pm2 logs '+$app_name
      end
    end
  end     

  desc 'Restart app'
  task :restart do
    on roles(:app) do
      restart_app
    end
  end  

  desc 'Restart app gracefully'
  task :update do
    on roles(:app) do
      case status_app
      when nil
        info 'App is not registerd'
        start_app
      when 'stopped'
        info 'App is stopped'
        restart_app
      when 'errored'
        info 'App has errored'
        restart_app
      when 'online'
        info 'App is online'
        restart_app
      end
    end
  end

end