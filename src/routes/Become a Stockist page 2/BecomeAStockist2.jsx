import './BecomeAStockist2.scss';
import becomeastockist from '../../assets/becomeastockist.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Beapartofit from '../../assets/beapartofit.png';
import SmackServices from '../../component/Smack Services/SmackServicesDesktop';
import Hereisthedeal from '../../assets/hereisthedeal.png'
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import { useNavigate } from 'react-router-dom';

function BecomeAStockist2() {
  const navigate = useNavigate();
  function previous() {
    navigate('/become-a-stockist')
  }
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,
      mirror: true
    })
  }, [])

  return (
    <div className='first-parent'>
      <div className='parent'>
        <img src={becomeastockist} alt="" />
        <div className='overlay'>
          <div className='become-a-stockist' data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>Become a stockist</div>
        </div>
      </div>

      <div className='note'>
        <div className='details' data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>Over the last 12 years we’ve built GSN based on one simple idea - healthy food should be easy!</div>
      </div>

      <div className='be-a-part-of-it-parent'>
        <div className='left'>
          <img src={Beapartofit} alt="" />
          <div className='left-overlay'></div>
        </div>
        <div className='right'>
          <div className='right-details'>
            <h1>Be part of it!</h1>
            <p>With over 400 happy stockists nationwide – our mission statement is simple; to work with the very best gyms, health shops, CrossFit boxes and retailers in the country!</p>

            <p>Our food supports local – with healthy food helping communities stay connected by attracting customers that may otherwise have never stepped through your door all on top of keeping your regulars happy with a range of amazing frozen ready meals, high protein pizzas and the best tasting chicken around.</p>

            <p>We love working alongside new partners, wholesalers and customers and hope you’re able to join us on our journey.</p>

          </div>
        </div>
      </div>

      <div className='request-to-be-a-stockist-parent2'>
        <div className='request-to-be-a-stockist'>Request to be a stockist</div>
        <div className='step'>STEP 2 OF 2</div>
        <div className='contact-form-parent'>
          <div className='contact-form-left'>
            <div className='input'>
              <p>INSTAGRAM USERNAME *</p>
              <input type="text" />
            </div>

            <div className='input'>
              <p>SMACK RANGE YOU ARE MOST INTERESTED IN?</p>
              <input type="text" />
            </div>

            <div className='input'>
              <p>DO YOU STOCK ANY OTHER FOOD BRAND? *</p>
              <input type="text" />
            </div>

            <div className='input'>
              <p>ANY OTHER DETAILS YOU FEEL ARE RELEVANT?</p>
              <input type="text" />
            </div>
          </div>
          <div className='contact-form-right'>
            <div className='input'>
              <p>WHERE DID YOU HEAR ABOUT SMACK? *</p>
              <input type="text" />
            </div>

            <div className='input'>
              <p>NUMBER OF CUSTOMERS WITHIN YOUR FACILITY</p>
              <input type="text" placeholder='Enter address / postcode' />
            </div>

            <div className='input'>
              <p>DO YOU CURRENTLY HAVE A FREEZER? *</p>
              <input type="text" />
            </div>

            <div className='input'>
              <p>SELECT AN OPTION... *</p>
              <input type="text" />
            </div>
          </div>
        </div>

        <div className='buttons'>
          <div className='previous' onClick={previous}>PREVIOUS</div>
          <div className='submit'>SUBMIT FORM</div>
        </div>
        
      </div>

      <SmackServices />

      <div className='here-is-the-deal-parent'>
        <div className='here-is-the-deal-left'>
          <div className='here-is-the-deal'>Here's the deal</div>
            <p className='para'>
              <ul className='list'>
                <li>Incredibly Tasty, Healthy & Convenient frozen foods</li>
              </ul>
            </p>

             <p className='para'>
              <ul className='list'>
                <li>Maximise Footfall, Accelerate Turnover</li>
              </ul>
            </p>

             <p className='para'>
              <ul className='list'>
                <li>Proven Sales since 2012</li>
              </ul>
            </p>

             <p className='para'>
              <ul className='list'>
                <li>Zero Waste 12+ Months Shelf Life</li>
              </ul>
            </p>

             <p className='para'>
              <ul className='list'>
                <li>GSN Branded Freezers & Point of sale support</li>
              </ul>
            </p>

             <p className='para'>
              <ul className='list'>
                <li>Best in Class range of products and flavours</li>
              </ul>
            </p>

            <p className='para'>
              <ul className='list'>
                <li>Dedicated Account Manager to help you maximise your sales</li>
              </ul>
            </p>

            <p className='para'>
              <ul className='list'>
                <li>Office team support</li>
              </ul>
            </p>
        </div>
        <div className='here-is-the-deal-right'>
          <img src={Hereisthedeal} alt="" />
          <div className='here-is-the-deal-right-overlay'></div>
        </div>
      </div>

      <FooterDesktop />


    </div>
  );
};

export default BecomeAStockist2;