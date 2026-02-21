import './MobileWhySmack.scss';
import { MdChevronLeft } from 'react-icons/md';
import { useContext } from 'react';
import { whySmack } from './context';

function WhySmack() {
  const style = ['main', 'stay', 'unstay'];

  const { why, setWhy } = useContext(whySmack)

  function runWhySmack() {
    setWhy(1)
  }

  function removeWhySmack(e) {
    e.stopPropagation()
    setWhy(2)
  }


  return (
    <div className={style[why]} onClick={runWhySmack}>
      <div className='why-smack-parent'>
        <div className='back'><MdChevronLeft size={37} onClick={(e) => removeWhySmack(e)} />Back</div>
        <div className='details'>Our Story</div>
        <div className='details'>Sustainability</div>
        <div className='details'>Our Kitchens</div>
        <div className='details'>Benefits of Frozen</div>
        <div className='details'>Community</div>
        <div className='view-all-blog'>OUR STORY</div>

      </div>
    </div>
  );
};

export default WhySmack;