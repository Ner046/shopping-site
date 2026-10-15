"use client";

import { useEffect, useState } from "react";
import { readCart, saveCart } from "../lib/cart";


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

  console.log(cart)

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 text-black">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-5 text-xl md:text-3xl  font-bold tracking-tighter text-[#2b2b2b]">
           {cart.length === 0 ? "Your cart is empty":`Shopping Cart - ${cart.length} ${cart.length === 1 ? "item":"items"}`}
        </h1>

        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex items-center justify-between border-t border-black/80 py-5 text-[1rem] md:text-2xl"
          >
            <div className="flex items-center gap-5">
          
              <img src={item.image} width={64} height={64}></img>
        
        
              <p className=" font-bold leading-none text-[#2d2d2d]">
                {item.title}
              </p>

              <p>{item.size}</p>

            </div>

            <div className="flex flex-col items-center gap-5">
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
          </div>
        ))}

        <div className={`flex flex-col gap-3 md:flex-row md:items-center justify-between border-t border-black/80 pt-5 ${cart.length === 0 && 'hidden'}`} >
          <button onClick = {()=>setCart([])} className="inline-flex items-center gap-3 text-[1.05rem] text-black" type="button">
            <img src="/trash.png" alt="Trash Can" width="22" height="22" />
            <span>Empty your cart</span>
          </button>

          <p className="text-[1.1rem] font-bold text-[#2d2d2d]">
            Subtotal: ${subtotal.toFixed(2)}
          </p>
          
        </div>

        <button className={`mt-6 flex cursor-pointer items-center justify-center gap-3 rounded-full bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800" type="button" ${cart.length === 0 ? 'hidden':''}`}>
          Proceed to checkout
        </button>
      </section>
    </main>
  );
}
