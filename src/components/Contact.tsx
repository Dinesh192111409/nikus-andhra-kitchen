export default function Contact() {
  return (

    <section
      id="contact"
      className="bg-orange-500 py-24 px-6"
    >

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[0.3em] text-black font-bold">
            Contact Us
          </p>

          <h2 className="text-6xl font-black text-black mt-6">
            VISIT NIKUS
            <br />
            ANDHRA KITCHEN
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white p-10 rounded-[30px] shadow-2xl">

            <h3 className="text-3xl font-black text-black">
              Address
            </h3>

            <p className="text-gray-700 text-xl mt-6 leading-9">
              Nikus Andhra Kitchen,
              <br />
              Bangalore,
              <br />
              Karnataka,
              <br />
              India
            </p>

          </div>

          <div className="bg-white p-10 rounded-[30px] shadow-2xl">

            <h3 className="text-3xl font-black text-black">
              Contact
            </h3>

            <p className="text-gray-700 text-xl mt-6 leading-9">
              📞 +91 9876543210
              <br />
              📧 nikusandhrakitchen@gmail.com
            </p>

          </div>

          <div className="bg-white p-10 rounded-[30px] shadow-2xl">

            <h3 className="text-3xl font-black text-black">
              Opening Hours
            </h3>

            <p className="text-gray-700 text-xl mt-6 leading-9">
              Monday - Sunday
              <br />
              11:00 AM - 11:30 PM
            </p>

          </div>

        </div>

      </div>

    </section>

  );
}