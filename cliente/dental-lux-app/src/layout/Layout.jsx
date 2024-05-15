
import Header from './Header';
import Footer from './Footer';
import IntroSection from '../components/sections/IntroSection';



const Layout = ({ children }) => {
    return (
        <>
            <Header />
                <body>
                <IntroSection /> 
                </body>
                
               
                
            
            <Footer />
            
        </>
    );
};

export default Layout;
