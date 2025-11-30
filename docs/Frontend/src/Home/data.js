import ls from '../assets/littlesingham.jpg'
import kb from '../assets/kb.jpg'
import mp from '../assets/motupatlu.jpg'
import doraemon from '../assets/doraemon.jpg'
import chhotabheem from '../assets/chhotabheem.jpg'
import r21 from '../assets/rollno21.jpg'
import shinchan from '../assets/shinchan.webp'
export const indianCartoons = [
  {
    title: "Chhota Bheem",
    description: "Dholakpur's tiny hero who eats laddoos and punches trouble away! 🍬💪",
    img: chhotabheem,
    color: "linear-gradient(135deg, #FF6B35, #FF8E53)",
    character: "🧡"
  },
  {
    title: "Motu Patlu",
    description: "Two silly friends who get into sticky situations… and eat samosas! 🥟😂",
    img: mp,
    color: "linear-gradient(135deg, #4ECDC4, #44A08D)",
    character: "👬"
  },
  {
    title: "Shin Chan",
    description: "Naughty little guy who drives everyone crazy with pranks! 😜🍕",
    img: shinchan, 
    color: "linear-gradient(135deg, #FFEAA7, #DDA15E)",
    character: "😜"
  },
  {
    title: "Krishna Balram",
    description: "Brotherly mischief, butter stealing, and divine fun! 🥛🎯",
    img: kb, 
    color: "linear-gradient(135deg, #74B3CE, #508991)",
    character: "🦚"
  },
  {
    title: "Roll No. 21",
    description: "Super-powered kid fights school bullies… with style! 🏫⚡",
    img: r21,
    color: "linear-gradient(135deg, #9D4EDD, #7B2CBF)",
    character: "👽"
  },
  {
    title: "Little Singham",
    description: "Tiny cop with a big heart catching baddies in Mirchi Nagar! 🚓🔥",
    img: ls,
    color: "linear-gradient(135deg, #EF233C, #D90429)",
    character: "🚓"
  }
];


// Fallback images in case the primary ones don't load
export const fallbackImages = {
  "Chhota Bheem": "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80",
  "Motu Patlu": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
  "Shin Chan": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
  "Krishna Balram": "https://images.unsplash.com/photo-1549056572-75914d6d7e1a?auto=format&fit=crop&w=800&q=80",
  "Roll No. 21": "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?auto=format&fit=crop&w=800&q=80",
  "Little Singham": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80"
};