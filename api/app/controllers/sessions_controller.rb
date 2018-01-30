class SessionsController < ApplicationController
  def new
  end

  def create
    reset_session
    par = login_params

    user = User.find_by(email: par[:email])
    if user && user.authenticate(par[:password])
      session[:user_id] = user.id
      respond_to do |format|
        format.html { redirect_to root_path, notice: 'Logged in!' }
        format.json { render json: { user: user, auth_token: JsonWebToken.encode(user_id: user.id) }, status: :ok }
      end
    else
      respond_to do |format|
        format.html { render :action => :new, alert: "Invalid user/password", status: :unauthorized }
        format.json { render json: {error: true, message: 'Ungültiger Benutzer/Passwort!'} }
      end
    end
  end

  def destroy
    reset_session
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Logged out' }
      format.json { render json: {message: 'Logged out.'}, status: :ok }
    end
  end

  private
    def login_params
        params.permit(:email, :password)
    end
end