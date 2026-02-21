import './Products.scss';
import FoodComponentDesktop from '../../component/Food Component Desktop/FoodComponentDesktop';
import FindThePerfectProductForYou from '../../component/Find The Perfect Product For You/FindThePerfectProductForYou';


function Products() {
  return (
    <div className='parent'>
      <div className='find-a-retailer-parent'>
        <h1 data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>Our Products</h1>
        <div className='description' data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>
          <p className='note'>We are passionate about real food.</p>
          <p>The SMACK range has been designed to incorporate a full mix of food suitable for people who need convenient, healthy food that tastes great and is quick to prepare.</p>
        </div>
      </div>
      

    </div>
  )
}

export default Products;