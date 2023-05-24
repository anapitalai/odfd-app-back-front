import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductHomeScreen from './screens/ProductHomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
// Just added
import StallHomeScreen from './screens/stallScreens/StallHomeScreen'
import StallScreen from './screens/stallScreens/StallScreen';
import BarHomeScreen  from './screens/barScreens/BarHomeScreen';
import BarScreen from './screens/barScreens/BarScreen'
import FoodScreen from './screens/foodScreens/FoodScreen';
import RestaurantScreen from './screens/restaurantScreens/RestaurantScreen';
import RestaurantHomeScreen from './screens/restaurantScreens/RestaurantHomeScreen'
import RestaurantListScreen from './screens/restaurantScreens/RestaurantListScreen'
import RestaurantEditScreen from './screens/restaurantScreens/RestaurantEditScreen'
const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/order/:id" component={OrderScreen} />
					<Route path="/shipping" component={ShippingScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/login" component={LoginScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/bar/:id" comment={BarScreen} />

					<Route path="/restaurant/:id" component={RestaurantScreen} />
					<Route path="/stall/:id" component={StallScreen} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/admin/userlist" component={UserListScreen} />
					<Route path="/admin/user/:id/edit" component={UserEditScreen} />
					{/* restaurants routes */}
					<Route path="/admin/restaurantlist" component={RestaurantListScreen} exact />
					<Route path="/admin/restaurantlist/:pageNumber" component={RestaurantListScreen} exact />
					<Route path="/admin/restaurantlist/:id/edit" component={RestaurantEditScreen} />
					<Route path="/admin/productlist" component={ProductListScreen} exact />
					<Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
					<Route path="/admin/product/:id/edit" component={ProductEditScreen} />
					<Route path="/admin/orderlist" component={OrderListScreen} />
					<Route path="/search/:keyword" component={HomeScreen} exact />
					<Route path="/page/:pageNumber" component={HomeScreen} exact />
					<Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
					<Route path="/" component={HomeScreen} exact />
					{/* All Stall Routes */}
					<Route path="/stall" component={StallHomeScreen} exact />	
					<Route path="/bar" component={BarHomeScreen} exact />
                    <Route path="/product" component={ProductHomeScreen} exact /> 
					<Route path="/restaurant" component={RestaurantHomeScreen} exact />
					<Route path="/food" component={FoodScreen} exact />

				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;


