import './OurBestSellersProducts.scss';
import OurBestSellersDesktop from '../Our Best Sellers Desktop/OurBestSellersDesktop';
import {Products} from '../../component/Our Best Sellers Desktop/products'

function OurBestSellersProduct() {
  return (
    <div>
      <OurBestSellersDesktop data={Products} />
    </div>
  )
}

export default OurBestSellersProduct;