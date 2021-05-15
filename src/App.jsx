import { Routes, Route } from 'react-router-dom';
import { Home, Products, ProductDetail, Cart, Wishlist, Login, SignUp, Account } from "./pages";
import { useToast } from "./context";
import { Navbar, Toast } from "./components";
import { PrivateRoute } from "./api";

import './App.css';

function App() {
  const { toastBox } = useToast();
  return (
    <div className="App">
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />}/>
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <PrivateRoute path="account" element={<Account/>}/>
      </Routes>
      {toastBox["isVisible"] === true && <Toast/>}
    </div>
  );
}

export default App;
