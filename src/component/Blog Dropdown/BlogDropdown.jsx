import './BlogDropdown.scss';
import Blogdropdown from '../../assets/Blogdropdown.png';
import { useContext } from 'react';
import { blogDrop } from '../../../Context/BlogDropdown';

function BlogDropdown() {
  const styles = ['default', 'show', 'unshow'];

  const { blog, setBlog } = useContext(blogDrop)

  const blogHandler = () => {
    setBlog(1);
    document.body.style.overflow = 'hidden';
  }

  const unBlogHandler = () => {
    setBlog(2);
    document.body.style.overflow = 'auto';
  }


  return (
    <div className={styles[blog]} onMouseOver={blogHandler} onMouseOut={unBlogHandler}>
      <div className='overflow'>
        <div className='blog-drop-down'>
          <div className='left'>
            <div className='details'>
              <div className="links">Recipes</div>
              <div className="links">Latest News</div>
              <div className="links">Fitness Lifestyle</div>
            </div>
            <div className='view-all-products'>VIEW ALL BLOG ARTICLES</div>
          </div>
          <div className='right'>
            <img src={Blogdropdown} alt="" />
            <div className='overlay'>
              <div className='right-details'>
                <h4>FROZEN FOR FRESHNESS</h4>
                <h1>Find out why</h1>
                <div className='shop-now'>LEARN MORE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BlogDropdown;