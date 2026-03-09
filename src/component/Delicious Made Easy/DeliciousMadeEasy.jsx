import './DeliciousMadeEasy.scss';
import Image1 from '../../assets/delicious made easy.jpg'

function DeliciousMadeEasy() {
  return(
    <div className='delicious-made-easy-parent'>
      <div className='left'>
        <img src={Image1} alt="" />
        <div className='left-overlay'></div>
      </div>
      <div className='right'>
        <div className='details'>
          <h1>Subscribe & Save</h1>
          <p>Found the perfect bundle for you and want to guarantee the best prices? Simply build your bundle and select your delivery frequency to guarantee yourself the flavours you want, at the time you need them</p>
          <span>Make sure you’re only ever minutes away from a healthy meal</span>
          <button>CHOOSE BUNDLE HERE</button>
        </div>
      </div>
    </div>
  )
}

export default DeliciousMadeEasy;