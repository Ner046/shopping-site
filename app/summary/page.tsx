"use client"

import { useEffect, useState } from "react"
import { readCart, saveCart } from "../lib/cart";
import Link from "next/link";


type OrderItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
  size: string
  rating:{
    rate:number
    count:number

  }
};


export default function orderSummary() {

  const [order, setOrder] = useState<OrderItem[]>([])
    const subtotal = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

   useEffect(() => {
      setOrder(readCart<OrderItem>());
    }, []);


  return (
    
    <main className="mx-auto w-full max-w-4xl px-4 py-8 text-black">
      <section>

          <p className="text-gray-900 mb-4 font-semibold text-[0.875rem]">
                <Link href="/cart" className="hover:text-gray-500 p-4 underline cursor-pointer">
                    Return to cart page
                </Link>
            </p>


        <h1 className="font-semibold text-3xl p-4 ">Order Summary</h1>

        <ul className="grid p-4 ">
           {order.map((item)=>(
          

            <li key={`${item.id}-${item.size}`}  className="flex flex-col md:flex-row gap-5 border-t-2 last:border-b-2 border-gray-300 py-8">
          
              <img alt="" src={item.image} width={64} className="aspect-square"></img>


              <div className="flex flex-col gap-2 font-bold leading-none text-[#2d2d2d]">
                <p className="max-w-100 text-[14px] md:text-[18px]">{item.title}</p>
                <p className="text-[14px] font-semibold"> {item.size? `Size: ${item.size}`:``}</p>
              </div>

              
            <div className="flex flex-col md:ml-auto gap-5">
              <p className="font-bold leading-none text-[#2d2d2d] text-[0.9rem]">
                ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </p>
              </div>

            </li>


        ))}

        </ul>
        
           <p className="text-[1.1rem] font-bold text-[#2d2d2d] md:text-right p-4">
            Total: ${subtotal.toFixed(2)}
          </p>

        <Link href="/thanks"  onClick = {()=>saveCart([])} className={`mt-6 flex items-center justify-center gap-3 rounded-full bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800 w-full`}>
       
          Confirm Order
  
       </Link>

      </section>


    </main>    
  )
}