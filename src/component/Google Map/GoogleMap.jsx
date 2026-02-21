import './GoogleMap.scss';

function GoogleMap () {
  return (
    <div className='google-map-parent'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63604.75181036274!2d7.12424145!3d4.889856449999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10682d0888247069%3A0x3681474475b8171d!2sOyigbo%2C%20Rivers!5e0!3m2!1sen!2sng!4v1765203060439!5m2!1sen!2sng"  style={{border:1}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}

export default GoogleMap;