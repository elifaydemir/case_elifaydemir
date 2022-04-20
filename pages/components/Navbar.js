import Link from 'next/link'
import Image from 'next/image'
import Hamburger from "hamburger-react";
import {useEffect, useState} from "react";
import Slider from "./Slider";
function Navbar(){
    const [isOpen, setOpen] = useState(false);
    const [resOpen, setResOpen] = useState(false);
    function handleResize() {
        //here I need to get the size of the page to check the responsive status. I reveal the hamburger menu based on its size.
         if(window.innerWidth<960){
            setResOpen(true)
        }else{
            setResOpen(false)
        }
    }
    useEffect(() => {
       //hanleResize() işlevini useEffect ile çağırıyorum ve her değişiklikte boyutunu yakalıyorum.
        window.addEventListener('resize', handleResize)
    });


    // I made the hamburger menu with the npm library because you asked about my use of the npm library in our conversation. I wanted to show this.
    return (
        <div className="header container px-0">
            <div className="header-container">
                <div className="logo">
                    <Link href="#">
                        <a>
                            <Image src="/images/logo.png" alt="Fligt Logo" width={119} height={72} />
                        </a>
                    </Link>
                </div>
                <div className="menu">
                    <ul>
                        <li><a href="#">home</a></li>
                        <li><a href="#">about us </a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">newsroom</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="book-now">
                    <button>
                        book now
                    </button>
                </div>
                <div className={resOpen? 'show' : 'hidden'}>
                    <Hamburger  color="#7A17BF" size={22} toggled={isOpen} toggle={setOpen} />
                    <div className="slider">
                        <Slider open={isOpen} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;
