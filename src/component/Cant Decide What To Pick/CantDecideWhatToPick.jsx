import './CantDecideWhatToPick.scss';
import Image from '../../assets/CantDecide.jpg'

function CantDecideWhatToPick() {
  return(
    <div className='cant-decide-what-to-pick-parent'>
      <img src={Image} alt="" />
      <div className='cant-decide-what-to-pick-overlay'>
        <div className='details'>
        <h1>Cant Decide What To Pick</h1>
        <h3>Let us help you decide!</h3>
        <button>VIEW BUNDLES</button>
        </div>
      </div>
    </div>
  )
}

export default CantDecideWhatToPick;