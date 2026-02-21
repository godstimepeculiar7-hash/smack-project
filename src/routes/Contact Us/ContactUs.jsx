import './ContactUs.scss';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';

function ContactUs() {
  return (
    <>
      <div className='get-in-touch'>Get in touch</div>
      <div className='contact-us-parent'>
        <div className='left'>
          <div className='detail'>
            <div className='first'>General Enquiries:</div>
            <div className='second'>info@Smack.co.uk</div>
          </div>

          <div className='detail'>
            <div className='first'>Opening Hours:</div>
            <div className='second'>9AM - 5PM, Monday to Friday</div>
          </div>

          <div className='detail'>
            <div className='first'>Office Address:</div>
            <div className='second'>SMACK LTD,Old Chapel, Denison Rd,Selby, YO8 8DA</div>
          </div>
        </div>
        <div className='right'>
          <div className='form'>
            <div className='send-us-a-message'>Send us a message</div>
            <div className='details'>
              <p>YOUR NAME *</p>
              <input type="text" name="" id="" />
            </div>

            <div className='details'>
              <p>YOUR EMAIL *</p>
              <input type="text" name="" id="" />
            </div>

            <div className='details'>
              <p>REASON FOR ENQUIRY</p>
              <input type="text" name="" id="" />
            </div>

            <div className='details'>
              <p>YOUR MESSAGE *</p>
              <input type="text" name="" id="message" />
            </div>

            <div className='submit'>SUBMIT FORM</div>
          </div>
        </div>
      </div>
      
      <FooterDesktop />
    </>
  );
}

export default ContactUs;