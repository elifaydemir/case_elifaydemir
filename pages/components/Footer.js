import Link from 'next/link'
import Image from 'next/image'
function Footer(){
    //I preferred to write the footer field as bootstrap row - col.
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row px-0 mx-0">
                        <div className="col-12 col-md-4">
                            <div className="logo">
                                <Link href="#">
                                    <a>
                                        <Image src="/images/logo.png" alt="Fligt Logo" width={119} height={72} />
                                    </a>
                                </Link>
                            </div>
                            <div className="text">
                                <p>We are Europe's first premium long-distance coach provider. We have made it our mission to offer 'first-class travel at economy prices'</p>
                            </div>
                            <div className="social-media">
                                <ul>
                                    <li>
                                        <Link href="#">
                                            <a><span className="fab fa-facebook-f"></span></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>
                                                <span className="fab fa-twitter"></span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a><span className="fab fa-instagram"></span></a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-2">
                            <h2>LINKS</h2>
                            <ul>
                                <li><Link href="#"><a>Home</a></Link></li>
                                <li><Link href="#"><a>About us</a></Link></li>
                                <li><Link href="#"><a>Features</a></Link></li>
                                <li><Link href="#"><a>Newsroom</a></Link></li>
                                <li><Link href="#"><a>Contact</a></Link></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-2 sm-contact">
                            <h2>Contact</h2>
                            <ul>
                                <li><Link href="#"><a>info@form.com</a></Link></li>
                                <li><Link href="#"><a>882-587-3025</a></Link></li>
                                <li><Link href="#"><a>6116 Willa River Suite 610</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom"> </div>
        </div>
    )
}
export default Footer;
