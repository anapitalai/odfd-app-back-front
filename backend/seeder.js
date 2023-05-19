import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import foods from './data/foods.js';
import restaurants from './data/restaurants.js';
import stalls from './data/stalls.js'
import bars from './data/bars.js';;
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Food from './models/foodModel.js';
import Order from './models/orderModel.js';
import Restaurant from './models/restaurantModel.js';
import Stall from './models/stallModel.js';
import Bar from './models/barModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await Food.deleteMany();
		await Restaurant.deleteMany();
		await Bar.deleteMany();
		await Stall.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);

		const adminUser = createdUsers[0]._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		//food
		const sampleFoods = foods.map((food) => {
			return { ...food, user: adminUser };
		});

		await Food.insertMany(sampleFoods);

		//restaurants
		const sampleRestaurants = restaurants.map((restaurant) => {
			return { ...restaurant, user: adminUser };
		});

		await Restaurant.insertMany(sampleRestaurants);
		
    //bars
		const sampleBars = bars.map((bar) => {
			return { ...bar, user: adminUser };
		});

		await Bar.insertMany(sampleBars);
		//stall
		const sampleStalls = stalls.map((stall) => {
			return { ...stall, user: adminUser };
		});

		await Stall.insertMany(sampleStalls);

		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await Food.deleteMany();
		await Restaurant.deleteMany();
		await Bar.deleteMany();
		await Stall.deleteMany();
		await User.deleteMany();

		console.log('Data Destroyed!'.red.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
