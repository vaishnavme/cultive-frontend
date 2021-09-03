import { Routes, Route } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import {
    Home,
    Products,
    ProductDetails,
    Cart,
    Wishlist,
    Login,
    SignUp,
    Account,
    RouteError
} from './pages';
import { PrivateRoute, Navbar, Footer } from './components';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route
                    path="products/:productID"
                    element={<ProductDetails />}
                />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="*" element={<RouteError />} />
                <PrivateRoute path="/cart" element={<Cart />} />
                <PrivateRoute path="/wishlist" element={<Wishlist />} />
                <PrivateRoute path="/account" element={<Account />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                transition={Slide}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
            />
            <Footer />
        </div>
    );
}

export default App;
