import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header id="header">
            <div className="header-top pt-4 pb-5">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <a className="navbar-brand" href="/">
                                <img src='/images/logo_dental_luxe_top.png' alt="Dental Luxe Logo" className="logo img-thumbnail" />
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-4 d-md-block d-sm-none">
                            <ul className="contact-list d-flex justify-content-start flex-wrap list-unstyled m-0">
                                <li className="pe-5 pe-lg-0 pe-xxl-5 pb-3 pb-lg-0">
                                    <svg className="location primary-color" width="24" height="24">
                                        <use xlinkHref="#location" />
                                    </svg>
                                    C/ Recogidas Nº 272, Granada
                                </li>
                                <li className="ps-xl-3">
                                    <svg className="phone primary-color" width="24" height="24">
                                        <use xlinkHref="#phone" />
                                    </svg>
                                    (958) 3894521
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex justify-content-center col-lg-4 col-md-4 col-sm-6">
                            <button className="btn btn-lg btn-primary"><Link to="/login">Login</Link></button>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar />
        </header>
    );
};

export default Header;

