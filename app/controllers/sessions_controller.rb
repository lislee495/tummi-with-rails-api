class SessionsController < ApplicationController
  def create
    @user = User.find_by(session_params)
      if @user
          session[:user_id] = @user.id
          render(status: 201, json: @user)
      else 
          render(status: 404)
      end 
  end

  def curr_user
    @user = User.find_by(id: session[:user_id])
    render(status: 201, json: @user)
  end 

  def destroy 
    session.delete(:user_id)
    @current_user = nil
  end 

  private

  def session_params 
      params.require(:session).permit(:email, :password)
  end 
end
