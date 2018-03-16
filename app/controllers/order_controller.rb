class OrderController < ApplicationController
    def index 
        id = params[:id]
        orders = Order.find_by(user_id: id)
        render(status: 201, json: orders)
    end

    def create 
        id = params[:current_user_id]
        user = User.find(id)
        order = Order.create(user_id: user.id, dish_id: dish_id, restaurant_id: restaurant_id, 
        quantity: dish_quantity, orderNum: orderNum )
        render(status: 201, json: order)
    end 

    private 

    def order_params
        params.require(:order).permit(:restaurant_id, :current_user_id, :dish_id, :dish_quantity)
    end 

end

# router.post('/:id/orders', async(req, res, next) => {
#   User.findById(req.body.terms.currentUser.id)
#   .then(user => {return user.increment('orders')})
#   .then(userIncremented => {
#     const orderNum = userIncremented.orders 
#     const {dishes, currentUser, cartRestaurant} = req.body.terms
#     return Promise.each(dishes, (ele)=> {
#       Order.create({user_id: currentUser.id, dish_id: ele.dish.id, restaurant_id: cartRestaurant.id, 
#         quantity: ele.quantity, status: "ordered", orderNum: orderNum })
#     })
#   })
#   .then(result => res.status(201).json(result))
# });

# router.get('/:id/favorites', (req, res, next)=> {
#   const id = req.params.id
#   Favorites.findAll({ where: {user_id: id}})
#   .then(result => res.status(201).json(result))
# })

# router.post('/:id/favorites', (req, res, next) => {
#   const {dish, currentUser, restaurant} = req.body.terms
#   Favorites.create({user_id: currentUser.id, dish_id: dish.id, restaurant_id: restaurant.id })
#   .then(result => res.status(201).json(result))
#   .catch(function (err) {
#     console.log(err)
#   })
# });
# router.delete('/logout', (req, res, next) => {
#   req.logout();
#   res.sendStatus(204);
# });

# router.get('/', (req, res, next) => {
#   res.send(req.user);
# })
# module.exports = router;
