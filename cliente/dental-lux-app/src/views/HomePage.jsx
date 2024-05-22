import AboutUsSection from '../components/sections/AboutUsSection';
import Faqs from '../components/sections/Faqs';
import IntroSection from '../components/sections/IntroSection';
import LastBlogs from '../components/sections/LastBlogs';
import OurServicesSection from '../components/sections/OurServicesSection';
import OurTeamSection from '../components/sections/OurTeamSection';


import Testimonial from '../components/sections/Testimonial';
import Layout from '../layout/Layout';

const HomePage = () => {
    return (
        <Layout>
            <IntroSection />
            <AboutUsSection />
            <OurServicesSection />
            <OurTeamSection />
            <Faqs />
            <Testimonial />
            <LastBlogs />
        </Layout>
    );
};

export default HomePage;
