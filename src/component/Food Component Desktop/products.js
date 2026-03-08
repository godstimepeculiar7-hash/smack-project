import JollofRice from '../../assets/jollof.avif';
import Hamburger from '../../assets/hamburger 1.webp';
import ChineseDishes from '../../assets/chinese dishes.webp';
import Drinks from '../../assets/drinks1.avif';

export const products = [{
  id: crypto.randomUUID(),
  content: 'Jollof Rice',
  image: JollofRice
}, {
  id: crypto.randomUUID(),
  content: 'Snacks',
  image: Hamburger
}, {
  id: crypto.randomUUID(),
  content: 'Swallow',
  image: ChineseDishes
}, {
  id: crypto.randomUUID(),
  content: 'Drinks',
  image: Drinks
}];