import React, { useState } from 'react'
import { FiMinus , FiPlus} from "react-icons/fi";

const Product_Details = () => {
  const stock = 0;

  const [count, setCount] = useState(1)

  const onIncrement = ()=>{
    setCount(count + 1)
  }

  const onDecrement = ()=>{
    setCount(count - 1)
  }

  return (
    <div>
      <div>
        <a href="./src/assets/yippee_image.png" target="_self ">
          <img src="./src/assets/yippee_image.png" alt="Yippee" />
        </a>
        <div>
          <h1>Rs. 15</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem veritatis, illo impedit consequatur explicabo error cumque sapiente odit aspernatur ex ullam qui, neque maiores perspiciatis esse vitae autem, maxime vero.</p>
          <p>Availability: {stock} in stock</p>
          <div>
            <button onClick={onDecrement}><FiMinus /></button>
            <span style={{ marginLeft: 10, marginRight: 10 }}>{count}</span>
            <button onClick={onIncrement}><FiPlus /></button>
          </div>
          <button>Add To Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default Product_Details
