import React from "react";

function ReviewCard(){
  return (
    <article className="p-4 bg-white ml-20 mb-10">
      <div className="flex items-center mb-4">
        <img className="w-10 h-10 me-4 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Reviewer"/>
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          Jese Leos
          <div className="text-xs text-gray-500 dark:text-gray-400">
            March 3, 2017
          </div>
        </div>
      </div>

      <div className="flex items-center mb-2 space-x-1 rtl:space-x-reverse">
        {[...Array(4)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.52 1.52 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.53 1.53 0 0 0-2.752 0L7.365 5.847l-5.05.734a1.53 1.53 0 0 0-.852 2.62l3.656 3.563-.863 5.03a1.53 1.53 0 0 0 2.226 1.617L11 17.033l4.518 2.375a1.53 1.53 0 0 0 2.226-1.617l-.863-5.03 3.656-3.563a1.52 1.52 0 0 0 .387-1.576Z" />
          </svg>
        ))}
        <svg className="w-4 h-4 text-gray-300 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.52 1.52 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.53 1.53 0 0 0-2.752 0L7.365 5.847l-5.05.734a1.53 1.53 0 0 0-.852 2.62l3.656 3.563-.863 5.03a1.53 1.53 0 0 0 2.226 1.617L11 17.033l4.518 2.375a1.53 1.53 0 0 0 2.226-1.617l-.863-5.03 3.656-3.563a1.52 1.52 0 0 0 .387-1.576Z" />
        </svg>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
        Great value for money!
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">The watch looks fantastic and works perfectly. Definitely worth the price.</p>
    </article>
  )
}

export default ReviewCard;
