import './WhyEveryoneChoosesSmackDesktop.scss';
import weight from '../../assets/weight.svg';
import ukIcon from '../../assets/uk-icon.svg';
import snowFlakeIcon from '../../assets/snowflake-icon.svg';
import calender from '../../assets/calendar-icon.svg';
import varietyIcon from '../../assets/variety-icon.svg';
import potIcon from '../../assets/pot-icon.svg';
import clockIcon from '../../assets/clock-1.svg';
import certificateIcon from '../../assets/certificate.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function WhyEveryoneChoosesSmackDesktop() {
  useEffect(() => {
        AOS.init({
          duration: 3000,
          once: false,
          mirror: true
        })
      }, [])

  return(
    <div>
        <div className='why-everyone-chooses-smack-parent'>
          <div className='why-everyone-chooses-smack'>
            <p className='why-everyone-chooses-smack-text' data-aos='zoom-in' data-aos-delay='500' data-aos-duration='1200'>WHY EVERYONE'S CHOOSING SMACK?</p>
            <p className='over-ten-million-meals-sold-and-counting' data-aos='zoom-in' data-aos-delay='800' data-aos-duration='1500'>Over 10 million meals sold and counting...</p>
          </div>

          <div className='why-everyone-chooses-smack-logos'>
            <div className='why-everyone-chooses-smack-logos-first'>
              <div className='why-everyone-chooses-smack-logos-first-images'>
                <div className='why-everyone-chooses-smack-logos-first-images-one' data-aos='fade-up' data-aos-delay='200' data-aos-duration='1500'>
                  <img src={weight} alt="Weight" className='weight' />
                </div>
                <div className='why-everyone-chooses-smack-logos-first-images-text' data-aos='zoom-in' data-aos-delay='1400' data-aos-duration='2000'>Always high protein & low sugar</div>
              </div>

              <div className='why-everyone-chooses-smack-logos-first-images'>
                <div className='why-everyone-chooses-smack-logos-first-images-one' data-aos='fade-up' data-aos-delay='500' data-aos-duration='1500'>
                  <img src={ukIcon} alt="Weight" />
                </div>
                <div className='why-everyone-chooses-smack-logos-first-images-text' data-aos='zoom-in' data-aos-delay='1600' data-aos-duration='2000'>Hand prepared in the UK</div>
              </div>

              <div className='why-everyone-chooses-smack-logos-first-images'>
                <div className='why-everyone-chooses-smack-logos-first-images-one' data-aos='fade-up' data-aos-delay='800' data-aos-duration='1500'>
                  <img src={snowFlakeIcon} alt="Weight" />
                </div>
                <div className='why-everyone-chooses-smack-logos-first-images-text' data-aos='zoom-in' data-aos-delay='1800' data-aos-duration='2000'>Frozen for freshness</div>
              </div>

              <div className='why-everyone-chooses-smack-logos-first-images'>
                <div className='why-everyone-chooses-smack-logos-first-images-one' data-aos='fade-up' data-aos-delay='1100' data-aos-duration='1500'>
                  <img src={calender} alt="Weight" />
                </div>
                <div className='why-everyone-chooses-smack-logos-first-images-text' data-aos='zoom-in' data-aos-delay='2000' data-aos-duration='2000'>12-month shelf life</div>
              </div>
            </div>

            <div className='why-everyone-chooses-smack-logos-first'>
               <div className='why-everyone-chooses-smack-logos-first-images'>
                <div className='why-everyone-chooses-smack-logos-first-images-one' data-aos='fade-up' data-aos-delay='2200' data-aos-duration='1500'>
                  <img src={varietyIcon} alt="Weight" />
                </div>
                <div className='why-everyone-chooses-smack-logos-first-images-text' data-aos='zoom-in' data-aos-delay='3000' data-aos-duration='2000'>30+ meals to pick from</div>
              </div>

               <div className='why-everyone-chooses-smack-logos-first-images'>
                <div className='why-everyone-chooses-smack-logos-first-images-one' data-aos='fade-up' data-aos-delay='2400' data-aos-duration='1500'>
                  <img src={potIcon} alt="Weight" />
                </div>
                <div className='why-everyone-chooses-smack-logos-first-images-text' data-aos='zoom-in' data-aos-delay='3000' data-aos-duration='2000'>Eco minded packaging</div>
              </div>

               <div className='why-everyone-chooses-smack-logos-first-images'>
                <div className='why-everyone-chooses-smack-logos-first-images-one' data-aos='fade-up' data-aos-delay='2600' data-aos-duration='1500'>
                  <img src={clockIcon} alt="Weight" />
                </div>
                <div className='why-everyone-chooses-smack-logos-first-images-text' data-aos='zoom-in' data-aos-delay='3000' data-aos-duration='2000'>Cook from frozen in minutes</div>
              </div>

               <div className='why-everyone-chooses-smack-logos-first-images'>
                <div className='why-everyone-chooses-smack-logos-first-images-one' data-aos='fade-up' data-aos-delay='2800' data-aos-duration='1500'>
                  <img src={certificateIcon} alt="Weight" />
                </div>
                <div className='why-everyone-chooses-smack-logos-first-images-text' data-aos='zoom-in' data-aos-delay='3000' data-aos-duration='2000'>BRC accredited facilities</div>
              </div>
            </div>
          </div>

        </div>
    </div>
  );
};

export default WhyEveryoneChoosesSmackDesktop;