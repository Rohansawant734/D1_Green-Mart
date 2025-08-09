import React from 'react';
import FloatingStack from './FloatingStack';
import freshProduct from '../assets/fresh_food.png'
import delivery from '../assets/delivery.png'
import customer from '../assets/customer.png'
import ecoFriendly from '../assets/eco_friendly.png'

const About = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 text-gray-800 font-poppins">
      {/* Hero Section without outer <section> */}
      <div
        className="relative h-[60vh] flex items-center justify-center bg-center bg-cover mb-16 rounded-lg shadow-lg"
        style={{ backgroundImage: `url('/Background_images/greenmart-hero.jpg')` }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded max-w-4xl text-center">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Welcome to GreenMart — Freshness Delivered To Your Doorstep
          </h1>
          <p className="text-green-300 mt-4 text-lg md:text-xl">
            Your trusted online marketplace for fresh groceries, organic produce, and daily essentials.
          </p>
        </div>
      </div>

      {/* Why Choose GreenMart */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-green-700">Why Choose GreenMart?</h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
          <li>Wide selection of fresh fruits, vegetables, and organic products.</li>
          <li>Competitive prices and exclusive deals every day.</li>
          <li>Fast, reliable delivery right to your doorstep.</li>
          <li>Committed to sustainable and eco-friendly packaging.</li>
          <li>Easy-to-use website and responsive customer support.</li>
        </ul>
      </section>

      {/* About GreenMart */}
      <section className="mb-16 max-w-4xl mx-auto text-justify space-y-6 text-gray-700">
        <h2 className="text-3xl font-bold mb-4 text-green-700">About GreenMart</h2>
        <p>
          GreenMart is a leading online grocery platform dedicated to bringing the freshest produce and quality essentials directly to your home.
          Founded with a vision to make grocery shopping simple, affordable, and enjoyable, GreenMart partners with local farmers and trusted suppliers to ensure only the best products reach your table.
        </p>
        <p>
          Our platform offers a seamless shopping experience with easy navigation, personalized recommendations, and secure payment options. Whether you’re stocking up for the week or looking for specialty organic items, GreenMart has you covered.
        </p>
        <p>
          At GreenMart, sustainability is at our core. We focus on reducing food waste, supporting local communities, and using eco-friendly packaging materials to minimize environmental impact.
        </p>
      </section>

      {/* Stats Panel */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-10 bg-gradient-to-tr from-green-500 to-green-300 text-white py-16 px-6 rounded-lg max-w-6xl mx-auto mb-16">
        <div className="flex flex-col items-center">
          <img src={freshProduct} alt="Fresh Produce" className="w-24 h-24 mb-4" />
          <p className="text-5xl font-bold">500+</p>
          <p className="mt-2 text-xl">Fresh Products</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={delivery} alt="Delivery" className="w-24 h-24 mb-4" />
          <p className="text-5xl font-bold">24/7</p>
          <p className="mt-2 text-xl">Delivery Service</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={customer} alt="Customers" className="w-24 h-24 mb-4" />
          <p className="text-5xl font-bold">10K+</p>
          <p className="mt-2 text-xl">Happy Customers</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={ecoFriendly} alt="Eco Friendly" className="w-24 h-24 mb-4" />
          <p className="text-5xl font-bold">100%</p>
          <p className="mt-2 text-xl">Eco-Friendly Packaging</p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8 text-green-700">Our Highlights</h2>
        <ul className="space-y-6 text-gray-700">
          <li>
            <h3 className="text-xl font-semibold mb-2">Freshness Guaranteed</h3>
            <p>
              We handpick every product with care to ensure you receive the freshest, highest-quality groceries every time.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold mb-2">Seamless Shopping Experience</h3>
            <p>
              Our user-friendly website and mobile app make ordering groceries quick, easy, and convenient from anywhere.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
            <p>
              From eco-friendly packaging to supporting local farmers, GreenMart is committed to sustainability and reducing waste.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold mb-2">Customer First Approach</h3>
            <p>
              Our dedicated customer service team is always ready to assist you and ensure your satisfaction.
            </p>
          </li>
        </ul>
      </section>

        <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6 text-green-700">Our Location</h2>
        <div className="w-full rounded-lg overflow-hidden shadow-lg" style={{ height: '600px' }}>
          <iframe
            title="GreenMart Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.262038591637!2d73.91785031487346!3d18.52043078732706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf4f65f6c02b%3A0x4a2374a1c3b07d51!2sPune%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1691587423621!5m2!1sen!2sus"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            className="w-full h-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
      <FloatingStack />
    </main>
  );
};

export default About;
