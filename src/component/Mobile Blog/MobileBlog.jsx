import './MobileBlog.scss';
import { MdChevronLeft } from 'react-icons/md';
import { useContext } from 'react';
import { mobileBlog } from './context';

function BlogForMobile() {
  const style = ['main', 'stay', 'unstay'];

  const { blog, setBlog } = useContext(mobileBlog)

  function runMobileBlog() {
    setBlog(1)
  }

  function removeMobileBlog(e) {
    e.stopPropagation()
    setBlog(2);
  }
  return (
    <div className={style[blog]} onClick={runMobileBlog}>
      <div className='blog-parent'>
        <div className='back'><MdChevronLeft size={37} onClick={(e) => removeMobileBlog(e)} />Back</div>
        <div className='details'>Recipes</div>
        <div className='details'>Latest News</div>
        <div className='details'>Fitness Lifestyle</div>
        <div className='view-all-blog'>VIEW ALL BLOG ARTICLES</div>
      </div>
    </div>
  )
}

export default BlogForMobile;