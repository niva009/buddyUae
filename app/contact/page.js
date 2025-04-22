'use Client';

import ContactForm from "../../components/contact/Form";
import SubscribtionForm from "../../components/forms/SubscribtionForm";
import Head from "next/head";




const ContactUs = () => {

  return (
    <>
   <Head>
          <title>Contact Buddy UAE | Office Equipment & Storage Security </title>
          <meta
            name="description"
            content="Contact Buddy UAE for inquiries about our products or services. As a leading office supplies supplier in Dubai, we offer office equipment, security, and more."
          />
        </Head>

      <div className="flex min-h-fit flex-col">
        <div className="w-full relative">
          <img
            className="h-full min-h-fit  aspect-auto lg:min-h-fit object-center object-cover"
            src="/contact/hero.png"
            alt="hero"
          />
          <div className="lg:absolute items-center px-5 lg:px-0 inset-0 grid max-w-7xl mx-auto w-full lg:grid-cols-2">
            <div className="flex text-black lg:text-white py-7 gap-4 flex-col">
              <p className="text-lg">Have a question or need assistance?</p>
              <h5 className="font-semibold text-5xl">Connect with Us</h5>
              <p className="max-w-lg">
                Whether you are looking for guidance, have inquiries about our
                services, or need assistance with a specific issue, our
                dedicated team is ready to assist you. Dont hesitate to reach
                out your satisfaction is our top priority 
              </p>
            </div>
            <div className="flex flex-col">
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="flex px-10 lg:px-0 flex-col lg:flex-row mx-auto w-fit items-center gap-4 my-5 lg:my-20">
          <img
            className="lg:h-64 object-contain"
            src="/contact/Call.png"
            alt="call"
          />
          <img
            className="lg:h-64 object-contain"
            src="/contact/Location.png"
            alt="location"
          />
          <img
            className="lg:h-64 object-contain"
            src="/contact/Mail.png"
            alt="mail"
          />
        </div>
        <div
          className="flex flex-col items-center justify-center w-auto lg:h-48 h-[13rem] lg:min-h-[17rem] rounded-lg bg-cover bg-center"
          style={{ backgroundImage: 'url("/img/product/exclusive.png ")' }}
        >
          <div className=" text-black flex gap-1  flex-col justify-center items-center ">
            <div className="lg:text-3xl text-2xl font-semibold">
              Unlock EXCLUSIVE offers and deals
            </div>
            <div className="text-[.95rem]">
              Sign up for deals, new products and promotions
            </div>
            <SubscribtionForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
