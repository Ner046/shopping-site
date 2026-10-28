"use client";

import { useEffect, useState } from "react";
import { readCart, saveCart } from "../lib/cart";
import Link from "next/link";


type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  size: string
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const quantityTotal = cart.reduce((sum, item) => sum + item.quantity, 0);


  useEffect(() => {
    setCart(readCart<CartItem>());
    setCartLoaded(true);
  }, []);
  

  useEffect(() => {
    if (!cartLoaded) return;

    saveCart(cart);
  }, [cart, cartLoaded]);
  

  const updateQuantity = (id: number, size:string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>item.id === id && item.size === size ? 
       { ...item, quantity: item.quantity + change } : item,)
      .filter((item) => item.quantity > 0),
    );
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 text-black">
      
          
      <section className="mx-auto max-w-3xl">

        <Link href="/" className="hover:text-gray-500 underline text-gray-900 mb-8 font-semibold text-[0.875rem]">
          Return to home page
        </Link>    

        
        <h1 className="mb-5 text-xl md:text-3xl py-4 font-bold tracking-tighter text-[#2b2b2b]">
           {cart.length === 0 ? "Your cart is empty":`Shopping Cart - ${quantityTotal} ${quantityTotal === 1 ? "item":"items"}`}
        </h1>

        <ul>

           {cart.map((item) => (

          <li
            key={`${item.id}-${item.size}`}
            className="flex items-center justify-between  border-t-2 last:border-b-2 border-gray-300 py-8 text-[1rem] "
          >
            <div className="flex items-center gap-5">
          
              <img src={item.image} width={64} height={64}></img>


              <div className="flex flex-col gap-2 font-bold leading-none text-[#2d2d2d]">
                <p className="text-[14px] md:text-[18px]">{item.title}</p>
                <p className="text-[12px] md:text-[16px] font-semibold"> {item.size? `Size: ${item.size}`:``}</p>

              </div>

                
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="font-bold leading-none text-[#2d2d2d]">
                ${item.price.toFixed(2)}
              </p>

              <div className="flex items-center gap-3 rounded-full border border-[#b7c98a] px-3 py-1 text-[1.1rem] font-medium text-[#3b4f1b]">
                <button
                  onClick={() => updateQuantity(item.id, item.size, -1)}
                  className="text-[1.5rem] leading-none"
                  type="button"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                
                <span className="min-w-5 text-center leading-none">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.size, 1)}
                  className="text-[1.5rem] leading-none"
                  type="button"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}

        </ul>

       

        <div className={`flex flex-col gap-3 md:flex-row md:items-center justify-between pt-5 ${cart.length === 0 && 'hidden'}`} >
          <button onClick = {()=>setCart([])} className="inline-flex items-center gap-3 text-[1.05rem] text-black" type="button">
            <img src="/trash.png" alt="Trash Can" width="22" height="22" />
            <span className="text-[0.9rem] md:text-[1rem]">Empty your cart</span>
          </button>

          <p className="text-[0.9rem] md:text-[1rem] font-bold text-[#2d2d2d]">
            Total: ${subtotal.toFixed(2)}
          </p>
          
        </div>

        <Link href= "/summary/" >
        <button 
        className={`mt-6 flex cursor-pointer items-center justify-center text-[14px] md:text-[16px] gap-3 rounded-full bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800 type="button" ${cart.length === 0 ? 'hidden':''}`}>
          Order Summary
        </button>
        </Link>


      </section>
    </main>
  );
}
