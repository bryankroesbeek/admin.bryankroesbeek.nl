class SessionController < ApplicationController
    skip_before_action :validate_user_token, only: [:login, :logout]

    def login
        json = JSON.parse(params[:_json])

        unless json['username'] == ENV['ADMIN_USER'] && json['password'] == ENV['ADMIN_PASS']
            head 401 and return
        end
        
        session[:user_token] = generate_token 
        session[:expires_at] = DateTime.now + 10.minutes
        render plain: "OK"
    end

    def logout
        session[:user_token] = nil if session[:user_token].present?
        session[:expires_at] = nil if session[:expires_at].present?
    end

    def generate_token length = 32
        r = [('a'..'z'), ('A'..'Z'), ('0'..'9')].map{ |t| t.to_a }.flatten
        (0...length).map do 
            r[rand(r.length)]
        end.join
    end
end
