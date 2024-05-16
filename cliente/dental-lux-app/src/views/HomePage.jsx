import AboutUsSection from '../components/sections/AboutUsSection';
import IntroSection from '../components/sections/IntroSection';
import OurServicesSection from '../components/sections/OurServicesSection';
import OurTeamSection from '../components/sections/OurTeamSection';
import Layout from '../layout/Layout';

const HomePage = () => {
    return (
        <Layout>
            <IntroSection />
            <AboutUsSection />
            <OurServicesSection />
            <OurTeamSection />
        </Layout>
    );
};

export default HomePage;
