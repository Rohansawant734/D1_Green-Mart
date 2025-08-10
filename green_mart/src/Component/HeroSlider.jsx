import React from 'react'
import { bannerDataimage } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const HeroSlider = () => {
  const item = bannerDataimage[0]; // get the first and only banner
  const navigate = useNavigate();
   const handleShopNow = () => {
    navigate('/categories', {
      state: { selectedCategory: 'Fresh Fruits' } // category name must match your DB categoryName
    });
  };
  return (
    <div className="w-full">
      <div className="relative w-full h-[400px]">
        {item.type === "video" ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={item.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={item.image}
            alt="banner"
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/40 flex items-center justify-end pr-10 text-right">
          <div className="text-white max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold">
              {item.title}{" "}
              <span className="text-yellow-400">{item.highlight}</span>
            </h2>
            <p className="mt-2 text-sm">{item.subtext}</p>
            <button className="mt-4 px-5 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition" onClick={handleShopNow}>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider;
