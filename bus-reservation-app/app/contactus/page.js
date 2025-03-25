import { FiPhone } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import ContactUs from "../components/ContactUs";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

const Contact = () => {

  return (
    <>
      <Navbar />
      <section style={{ backgroundColor: '#ffffff' }} className="flex items-center justify-center bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
            <div className="flex flex-col items-center">
              <h1 className="font-manrope text-black text-4xl font-bold leading-10 mt-4">
                Contact Us
              </h1>
              <img src="/contact.png" alt="contactus" className="mt-4" />
              <div className="w-full lg:p-11 p-5">

                <div className="bg-gray-50 rounded-lg p-6">
                  <a href="#" className="flex items-center mb-6">
                    <FiPhone />
                    <h5 className="text-block text-base font-normal leading-6 ml-5">+92 344482528</h5>
                  </a>
                  <a href="#" className="flex items-center mb-6">
                    <MdMailOutline />
                    <h5 className="text-block text-base font-normal leading-6 ml-5">fitntone3@gmail.com</h5>
                  </a>
                </div>

              </div>
            </div>

            <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <h2 className="text-Black-600 font-manrope text-4xl font-semibold leading-10 mb-11">Send Us A Message</h2>
              <ContactUs />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;

