import './LoadingOverlay.scss';
import Spinner from '../../../assets/loading-spinner.gif';

function LoadingOverlay() {
    return (
        <div className='loading-overlay'>
            <img src={Spinner} alt="Loading..." className='spinner' />
        </div>
    )
}

export default LoadingOverlay;