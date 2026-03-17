import { Routes, Route } from "react-router-dom";
import Navigation from './routes/Navigation/Navigation';
import HomePage from "./routes/Home/Home";
import CartComponent from "./routes/Cart/Cart";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import FindaRetailer from "./routes/Find a Retailer/FindaRetailer";
import ScrollToTop from "./component/Scroll To Top/ScrollToTop";
import BecomeAStockist from "./routes/Become a Stockist/BecomeAStockist";
import BecomeAStockist2 from "./routes/Become a Stockist page 2/BecomeAStockist2";
import ContactUs from "./routes/Contact Us/ContactUs";
import ResetPassword from "./routes/Reset Password/ResetPassword";
import Products from "./routes/Products/Products";
import JollofRice from "./routes/Jollof Rice/JollofRice";
import SmackProducts from "./routes/Smack Products/SmackProducts";
import Swallow from "./routes/Swallow/Swallow";
import MobileJollofRice from "./routes/Mobile Jollof Rice/MobileJollofRice";


function App() {
  // BELOW IS A FUNCTION THAT RUNS WHEN A USER ACCIDENTALLY CLOSES THE PAGE
  /*useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Required for the popup to show
    };

    // Attach the listener when component loads
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up to avoid memory leaks
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  */

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigation />}>

          <Route index element={<HomePage />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find-a-retailer" element={<FindaRetailer />} />
          <Route path="/become-a-stockist" element={<BecomeAStockist />} />
          <Route path="/become-a-stockist/page2" element={<BecomeAStockist2 />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/my-account/lost-password" element={<ResetPassword />} />
          <Route path="/products" element={<Products />} />
          <Route path="/jollofRice" element={<JollofRice />} />
          <Route path="/smack-products" element={<SmackProducts />} />
          <Route path="/swallow" element={<Swallow />} />
          <Route path="/mobile-jollof-rice" element={<MobileJollofRice />} />
        </Route>
      </Routes>
    </div>

  )
}

export default App;            