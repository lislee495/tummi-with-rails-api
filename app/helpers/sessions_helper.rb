module SessionsHelper

    # Logs in the given user.
    def log_in(user)
      session[:user_email] = user.email
    end

    def current_user
        @current_user ||= User.find_by(email: session[:email])
    end

    def log_out
      session.delete(:user_id)
      @current_user = nil
    end
  end