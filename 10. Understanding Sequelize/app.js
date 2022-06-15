const path = require("path"); //node core module

const express = require("express"); //third party packages
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug"); //setting the templating engine
app.set("views", "views"); //templating engine folder

const adminRoutes = require("./routes/admin"); //importing our own routes file
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require("./util/database"); //importing our database
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart_item");
const Order = require("./models/order");
const OrderItem = require("./models/order_item");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public"))); //anything that tries to find a css file will automatically come into this public folder

app.use((req, res, next) => {
	User.findByPk(1)
		.then((user) => {
			//we get the user here
			req.user = user; //we store the user in [request] so that we can access it anywhere in our program
			next();
		})
		.catch((err) => console.log(err)); //this will run only when our server has started
});

app.use("/admin", adminRoutes.routes); //url starting with 'admin' will be handeled by this middleware [filtering paths]
app.use(shopRoutes);
app.use(errorController.get404);

//defining relations among tables in database
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User); //OPTIONAL
Cart.belongsToMany(Product, { through: CartItem }); //[through] tells where these connections should be stored
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem }); //in between table

sequelize
	.sync(/* {force: true} */)
	.then((result) => {
		return User.findByPk(1); //dummy code to find user from table with [id] as [1]
	})
	.then((user) => {
		if (!user)
			//if [user] is not found, create a user
			return User.create({ name: "User", email: "user@gmail.com" });
		return user; //if user is found, return the user
	})
	.then((user) => {
		//user will be returned here
		return user.createCart(); //creating a cart for the user
	})
	.then((result) => {
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	}); //[sync] function has a look at all our models and creates tables for them if they do not exist
