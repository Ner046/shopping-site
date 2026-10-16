// src/components/CartCounter.jsx
'use client'; 

import { useState, useEffect } from 'react';
import { readCart } from "@/app/lib/cart";



type CartItem = {
  quantity: number;
};


export default function cartCounter() {

  const [cart, setCart] = useState<CartItem[]>([]);


  useEffect(() => {
    function updateCart() {
      setCart(readCart<CartItem>());
    }

    updateCart();
    
    window.addEventListener("cart-updated", updateCart);

    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);


    const quantityTotal = cart.reduce((sum, item) => sum + item.quantity, 0);

  return <>{quantityTotal}</>;

  }
