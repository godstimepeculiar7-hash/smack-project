import './FindTheRightBundleMobile.scss';
import Findtherightbundle from '../../assets/findtherightbundle.jpg'

function FindTheRightBundleMobile () {
  return (
    <div className='find-the-right-bundle-mobile-parent'>
      <img src={Findtherightbundle} alt="Find the right bundle" />
      <div className='find-the-right-bundle-mobile-parent-overlay'>
        <div className='find-the-right-bundle-details'>
          <h1 className='find-the-right-bundle'>Find the right bundle for you</h1>
          <div className='find-the-right-bundle-description'>Not quite sure what to order? We've brought together our best selling bundles in to one area. Simply select your bundle, choose your flavours, and order.</div>
          <div className='shop-now'>SHOP NOW</div>
        </div>
      </div>
    </div>
  );
}

export default FindTheRightBundleMobile;