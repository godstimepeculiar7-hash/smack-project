import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.scss'
import App from './App.jsx';
import { ShopNowProvider } from '../Context/ShopNowDropdown.jsx';
import { BlogDropProvider } from '../Context/BlogDropdown.jsx';
import { WhySmackProvider } from '../Context/WhySmackDropdown.jsx';
import { ShopNowSmallMenuProvider } from '../Context/ShopNowSmallMenu.jsx';
import { MobileShopProvider } from './component/Mobile Shop Now/context.jsx';
import { MobileBlogProvider } from './component/Mobile Blog/context.jsx';
import { WhySmackMobileProvider } from './component/Mobile Why Smack/context.jsx';
import { JollofRiceProductsProvider } from './backend/JollofRiceProducts.jsx';
import { SwallowProductContextProvider } from './backend/SwallowProducts.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SwallowProductContextProvider>
      <JollofRiceProductsProvider>
        <WhySmackMobileProvider>
          <MobileBlogProvider>
            <MobileShopProvider>
              <ShopNowSmallMenuProvider>
                <WhySmackProvider>
                  <BlogDropProvider>
                    <ShopNowProvider>
                      <App />
                    </ShopNowProvider>
                  </BlogDropProvider>
                </WhySmackProvider>
              </ShopNowSmallMenuProvider>
            </MobileShopProvider>
          </MobileBlogProvider>
        </WhySmackMobileProvider>
      </JollofRiceProductsProvider>
    </SwallowProductContextProvider>
  </BrowserRouter>
)
