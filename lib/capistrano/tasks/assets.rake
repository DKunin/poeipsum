namespace :assets do
  desc 'Sync all dependencies for precompile'
  task :sync_vendor  do
    on roles(:web) do |server|
      rsync_host = host.to_s
      run_locally do

        # Устанавливаем все необходимое локально
        with rails_env: fetch(:stage) do
          execute :npm, 'install'
        end
        execute "rsync -av --delete ./node_modules #{server.user}@#{rsync_host}:#{current_path}"
      end
    end
  end
end