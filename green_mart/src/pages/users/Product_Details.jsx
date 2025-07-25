import React, { useState } from 'react'
import { FiMinus, FiPlus} from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import './Product_Details.css'


const Product_Details = () => {
  const stock = 0;

  const [count, setCount] = useState(1)

  const [rating, setRating] = useState(false)

  const onRate = () =>{
    setRating(!rating)
  }

  const onIncrement = () => {
    setCount(count + 1)
  }

  const onDecrement = () => {
    setCount(count - 1)
  }

  return (
    <div>
      <div className='flex justify-around m-10 mb-30 h-91 border h-50'>
        <div className='img-container'>
          <a href="./src/assets/yippee_image.png" target="_self ">
            <img src="./src/assets/yippee_image.png" alt="Yippee" />
          </a>
        </div>
        <div className='flex flex-col details'>
          <h4>Rs. 15</h4>
          <p className='text-justify w-50'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem veritatis, illo impedit consequatur explicabo error cumque sapiente odit aspernatur ex ullam qui, neque maiores perspiciatis esse vitae autem, maxime vero.</p>
          <p className='w-50'>Availability: {stock} in stock</p>
          <div className='w-18 mb-2 border rounded-md'>
            <button onClick={onDecrement}><FiMinus /></button>
            <span style={{ marginLeft: 10, marginRight: 10 }}>{count}</span>
            <button onClick={onIncrement}><FiPlus /></button>
          </div>
          <button className='w-50 mb-10 b1'>Add To Cart</button>
          <button className='w-50 b2'>Buy Now</button>
        </div>
      </div>

      <div className='m-10 h-41'>
        <h4 className=''>Product Description</h4>
        <p className='text-justify p-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quia minima labore, magni aliquam dolores nesciunt alias? Voluptate dolor expedita nulla consequatur impedit facilis repellendus? Voluptate labore odit, molestias odio deleniti delectus illo sed quisquam necessitatibus omnis officiis obcaecati non amet cum, explicabo magnam sit, veniam vel culpa distinctio eius? Hic alias nobis repellendus doloribus enim voluptatibus ratione culpa reiciendis quas architecto totam debitis assumenda ducimus, unde pariatur modi explicabo libero veritatis est sed quos corrupti. Maiores veniam fugit, ad optio commodi deserunt voluptatibus officia consequatur facilis ex deleniti provident quaerat nostrum possimus, eveniet architecto necessitatibus repellat quo quidem amet.</p>
      </div>

      <div className='sm'>
        <h4>Add a Review</h4>
        <span>Your Rating: </span>
        <div>
          <div>
            <button className="text-yellow-400"  onClick={onRate}>{rating ? <FaStar/> : <FaRegStar/>}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product_Details
