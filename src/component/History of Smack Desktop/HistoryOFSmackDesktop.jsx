import './HistoryOfSmackDesktop.scss';
import SmackHistoryPhoto from '../../assets/smack-history-photo.jpg';

function HistoryOfSmackDesktop() {
  return (
    <div className='history-of-smack-parent'>
      <div className='left-section'>
        <div className='left-section-text'>
          For over 10 years SMACK has stood for one simple idea – healthy and tasty food should be easy.
          That’s the Gold Standard.
        </div>
        <div className='shop-the-full-range-parent'>
          <div className='shop-the-full-range'>SHOP THE FULL RANGE</div>
        </div>
      </div>
      <div className='right-section'>
        <img src={SmackHistoryPhoto} alt="Smack history photo" />
      </div>
    </div>
  );
};

export default HistoryOfSmackDesktop;