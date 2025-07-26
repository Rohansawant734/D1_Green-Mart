import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import imagecontact from '../../assets/contact.png'; 
const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">Contact Us</h2>

      <div className="bg-white shadow-md rounded-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-green-600 text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Address</h4>
              <p className="text-gray-600">
                123 Organic Street,<br />
                Farmville, Green State 456789
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-green-600 text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Phone</h4>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-green-600 text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Email</h4>
              <p className="text-gray-600">support@organicmart.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaClock className="text-green-600 text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Working Hours</h4>
              <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Right Side - Optional Image or Map */}
        <div className="flex justify-center items-center">
          <img
            src={imagecontact}
            alt="Contact"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
