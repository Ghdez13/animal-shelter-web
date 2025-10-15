import SectionBackground from "../components/SectionBackground";
import BackgroundMobile from "../assets/images/background-mobile.webp";

const Contact = () => {
  return (
    <SectionBackground image={BackgroundMobile}>
      <div className="text-center p4">
        <h1 className="text-3xl font-bold underline"> Contact Page</h1>
      </div>
    </SectionBackground>
  );
};

export default Contact;
