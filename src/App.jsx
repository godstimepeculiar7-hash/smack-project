import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from './routes/Navigation/Navigation';
import HomePage from "./routes/Home/Home";
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
import Orders from "./routes/Orders/Orders";
import Dashboard from "./routes/Dashboard/DashBoard";
import ProtectedRoute from "./routes/Protected Routes/ProtectedRoute";
import PublicRoute from "./routes/Public Route/PublicRoute";
import ChineseDishes from "./routes/ChineseDishes/Chinese Dishes";
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

          <Route index element={<PublicRoute><HomePage /></PublicRoute>} />
          <Route path="/cart" element={
            <Navigate
              to="/login"
              replace
              state={{ message: 'Please log in to your SMACK dashboard to view your cart.' }}
            />
          } />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
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
          <Route path="/chinese-dishes" element={<ChineseDishes />} />
          <Route path="/checkout" element={
            <Navigate
              to="/login"
              replace
              state={{ message: 'Please log in to your SMACK dashboard to view your cart and checkout.' }}
            />
          } />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute>
          {(user) => <Dashboard user={user} />}
        </ProtectedRoute>} />
      </Routes>
    </div>

  )
}

export default App;            