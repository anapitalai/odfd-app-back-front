This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Frontend
### Home/Welcome Screen

Logo-Home  Search  Bars   Restaurants   Stalls   Favourites Sign-In  Cart
                                                               
- Recommended For You
- Popular Food In the Location
- Top Restaurants
- Popular bar in the Location
- Top food stall you might like

### Stalls Screen
- Stall Component ------> StallScreen -----> Single Stall Details

## Redux(Reducers,actions and store.js)
> Redux Pattern

![screenshot](https://github.com/anapitalai/odfd-app-back-front/blob/main/uploads/redux_pattern.png)
- With stat management in a react app, we have component level and global or application state. Component level state has to do with a component. An example could be a slider or a dropdown menu. We might have a piece of component state which is just and js object with some key-value pairs. You might have a key-value pair where we have open that can either be true or false value where the menu would display as either opened or closed. That is not what we have in redux, we use for global or application level state. The way that state is changed is through reducer functions, they are basically just functions that accept actions, they are responsible for maniplulating and passing down to the components.
- Actions are objects that represent the intention to change a piece of change. We also have action creators that dispatch or fire off those actions.Eg, we may have a action creator function called getProducts and in that action creator we make a fetch request to the backend to get data and when we get the data back we dispatch an action to the reducer and we attached a payload to it and that payload will have the fetched data. Now in that reducer ,we can attach the payload data to the state passing it down to any component that asks for it. Think of state as a clound hover over the app and when we need something to happen like click a button and fetch data from a server and display it, we have to create an action or a action creator to dispatch a specific actions to the reducer then the reducer passes it down to the component.
- To get started with setting up redux ,we need to create a store.js, this file  is where we connect our reducers, middlewares,etc.
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'

import {
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers'


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

- Each resource  has a reducer file held in the reducer directory. The reducer files conatiner reducer functions.
- Workflow
-  create constants ----> create the reducer ----> actions ----> add reducer to store.js

- Modify the reducer
- Modify the actions
- Modify the store.js file
- All files in screen are components
  components ----- screens ----- App.js
- React is a SPA framework, it reads an index.html file available in public folder
  index.html(public folder) <---- index.js(src folder) <----- App.js(src folder)
  App.js is jsx which is similar to html with some differences, you cant use class as an attribute, you need to use className and  you can have javascript embedded in JSX using js expressions, eg: <img src={logo} className="app" />
  YOu can also have a conditional a tenary etc.
- ES& React/Redux Extension in VSC, to generate a functional component use rfce <enter> or react arrow function component using rafce <enter>
- Folder Structure
src--->components(header, Footer and main section of index.html)
   --->screens(contains navigated to components)
   --->actions
   --->constants
   --->reducers
- Displaying products/foods. In the homescreen component, all foods/prods come from the json file that are mapped and displayed in a food/product component which is a separate screen component.
Single Product Component

const Product = ({ product }) => {
  return (
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
  )
}
export default Product

- HomeScreen Component

const HomeScreen = ({ match }) => {
  return (
        <>
          <Row>
            {foods.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
  )
}

export default HomeScreen

## Implementing React Router
Enables having different routes, different URLs,etc.
### `npm install react-router-dom react-router-bootstrap`
import { BrowserRouter as Router, Route } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <main className='py-3'>
        <Container>
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
    </Router>
  )
}


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
