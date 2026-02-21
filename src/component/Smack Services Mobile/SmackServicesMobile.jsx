import './SmackServicesMobile.scss';
import { images } from './products';
function SmackServicesMobile() {
  return (
    <div className='smack-services-mobile-parent'>
      <div className='smack-services-parent-child'>
        {images.map((image) => {
          return (
            <div className='smack-services'>
              <img src={image.image} alt="" />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SmackServicesMobile;