const Sequelize = require("sequelize"); //importing sequelize which also uses mysql in background

const sequelize = new Sequelize("node_complete", "root", "Hellcat@007", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
