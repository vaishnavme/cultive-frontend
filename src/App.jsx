import { Routes, Route } from 'react-router-dom';
import { Home, Products, ProductDetails, Cart, Wishlist, Login, SignUp, Account } from "./pages";
import { useAuth ,useToast } from "./context";
import { Navbar, Toast } from "./components";
import { PrivateRoute } from "./api";

function App() {
  const { user } = useAuth();
  const { toastBox } = useToast();
  return (
    <div className="App">
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />}/>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <PrivateRoute path="/cart" login={user} element={<Cart />}/>
          <PrivateRoute path="/wishlist" login={user} element={<Wishlist />}/>
          <PrivateRoute path="/account" login={user} element={<Account />}/>
      </Routes>
      {toastBox["isVisible"] === true && <Toast/>}
    </div>
  );
}

export default App;
