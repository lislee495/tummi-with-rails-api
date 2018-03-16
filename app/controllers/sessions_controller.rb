class SessionsController < ApplicationController
  def create
    @user = User.find_by(user_params)
      if @user && @user.authenticate(params[:session][:password])
          log_in @user
          render(status: 201, json: @user)
      else 
          render(status: 404)
      end 
  end

  def show 
    @user = current_user 
    render(status: 201, json: @user)
  end 

  def destroy 
    log_out
  end 

  private

  def session_params 
      params.require(:session).permit(:email, :password)
  end 
end
