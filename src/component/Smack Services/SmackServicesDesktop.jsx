import './SmackServicesDesktop.scss';
import { images } from './products';

function SmackServices() {
  return (
    <div className='smack-services-parent'>
      <div className='smack-services-parent-child'>
        {images.map((image) => {
          return (
            <div key={image.id} className='smack-services'>
              <img src={image.image} alt="NHS" />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SmackServices;