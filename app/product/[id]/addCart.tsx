"use client";

import { readCart, saveCart } from "@/app/lib/cart";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category:string;
};

type CartItem = Product & {
  quantity: number;
  size: string;
};


export default function AddToCartButton({ product }: { product: Product }) {
  

  const hasSizes = product.category === "men's clothing" || product.category === "women's clothing"
  
  const sizes = ["S","M","L"]

  const[size, setSize] = useState("S")
  const cartSize = hasSizes ? size : "";
  
  const [quantity, setQuantity] = useState(0)
  

  useEffect(() => {
  const cart = readCart<CartItem>();
  const item = cart.find(
    (item) => item.id === product.id && item.size === cartSize,
  );
  setQuantity(item?.quantity ?? 0);

}, [product.id, cartSize]);
  

  
  const handleAddToCart = () => {
    const cart = readCart<CartItem>();
    const existingItem = cart.find((item) => item.id === product.id && item.size === cartSize);

    const updatedCart = existingItem ? 
    
    cart.map((item) =>
          item.id === product.id && item.size === cartSize
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )

      : [...cart, { ...product, quantity: 1, size: cartSize }];

    saveCart(updatedCart);
    setQuantity(existingItem ? existingItem.quantity + 1 : 1);
  };

  const handleRemoveFromCart = () => {
    const cart = readCart<CartItem>();
    const existingItem = cart.find((item) => item.id === product.id && item.size === cartSize); 

    if (!existingItem) return;

    const updatedCart = existingItem
      ? cart
          .map((item) =>
            item.id === product.id && item.size === cartSize
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0)
      : cart;

          saveCart(updatedCart);
          setQuantity(existingItem ? existingItem.quantity - 1 : 0);
  }

return (

  

 <div className="mt-4 flex flex-col gap-4">

    <p className="text-[14px] font-semibold">{hasSizes? "Select Size:":""}</p>

    {hasSizes && (
      <div aria-label="Choose a size" className="flex gap-2 items-center">
        {sizes.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={size === option}
            onClick={() => setSize(option)}
            className={`border px-4 py-2 ${
              size === option
                ? "border-black bg-black text-white"
                : "border-gray-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    )}


      {quantity === 0 ? (
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-3 rounded-2xl bg-black px-4 py-2 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 text-[18px]"
        >
          <img
            src="/shopping-cart.png"
            alt=""
            width="20"
            height="20"
            className="invert"
          />
          <p>Add to Cart</p>
        </button>
        
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-black py-2 font-semibold text-black">
          
          
          <button
            onClick={handleRemoveFromCart}
            type="button"
            aria-label="Decrease quantity"
            className="px-4 text-[18px]"
          >
            {quantity == 1? <img src={"/trash.png"} width={20} height={20}/>:"-"}
         
          </button>

          <span>{quantity} in cart</span>

          <button
            onClick={handleAddToCart}
            type="button"
            aria-label="Increase quantity"
            className="px-4 text-[18px]"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}