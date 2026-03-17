import './OurBestSellerProductMobile.scss';
import OurBestSellersMobile from '../Our Best Sellers Mobile/OurBestSellersMobile';
import {Products} from '../../component/Our Best Sellers Mobile/products'

function OurBestSellerProductMobile() {
  return (
    <div>
      <OurBestSellersMobile data={Products} />
    </div>
  )
}

export default OurBestSellerProductMobile;