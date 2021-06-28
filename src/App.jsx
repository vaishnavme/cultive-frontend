import { Routes, Route } from 'react-router-dom';
import { Home, Products, ProductDetails, Cart, Wishlist, Login, SignUp, Account } from "./pages";
import { Navbar, Footer } from "./components";
import { ToastContainer, Slide } from "react-toastify";
import { PrivateRoute } from "./api";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productID" element={<ProductDetails />}/>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <PrivateRoute path="/cart" element={<Cart />}/>
          <PrivateRoute path="/wishlist" element={<Wishlist />}/>
          <PrivateRoute path="/account" element={<Account />}/>
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
      <Footer/>
    </div>
  );
}

export default App;
