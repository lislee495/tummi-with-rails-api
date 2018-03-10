class UserController < ApplicationController
    def login 
        @user = User.find_by(user_params)
        if @user 
            render(status: 201, json: @user)
        else 
            render(status: 404)
        end 
    end 

    def signup
        render(status: 201, json: User.create(user_params))
    end 

    def logout 

    end 

    def show 

    end

    private 

    def user_params 
        params.require(:user).permit(:email, :password)
    end 

end


# router.delete('/logout', (req, res, next) => {
#   req.logout();
#   res.sendStatus(204);
# });

# router.get('/', (req, res, next) => {
#   res.send(req.user);
# })
# module.exports = router;