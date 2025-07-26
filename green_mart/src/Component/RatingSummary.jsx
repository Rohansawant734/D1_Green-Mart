import React from "react";

function RatingSummary() {

    const rating = [1, 2, 3, 4]

    return (
        <div className="text-gray-700 ml-25 mb-10">
            <div className="flex items-center mb-2">
                {rating.map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
                <svg className="w-4 h-4 text-gray-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ms-1 text-sm font-medium text-gray-500 align-middle mb-0">4.95</p>
                <p className="ms-1 text-sm font-medium text-gray-500 mb-0">out of</p>
                <p className="ms-1 text-sm font-medium text-gray-500 mb-0">5</p>
            </div>

            <p className="text-sm font-medium text-gray-500">1,745 global ratings</p>

            {[['5 star', 70], ['4 star', 17], ['3 star', 8], ['2 star', 4], ['1 star', 1]].map(([label, percent]) => (
                <div className="flex items-center mt-4" key={label}>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">{label}</a>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded-sm">
                        <div className="h-5 bg-yellow-300 rounded-sm" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500">{percent}%</span>
                </div>
            ))}
        </div>
    );
};

export default RatingSummary;
