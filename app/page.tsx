"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StarRating from "./starRating";
import fallbackProducts from "./backupData/products.json"
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating:{
    rate:number
    count:number
  }
};


export default function Home() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const search = (searchParams.get("query") ?? "").trim().toLowerCase();



  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await res.json();
        setProducts(data);
        console.info("Live data successfully loaded from FakeStoreAPI.")
        
      } catch (error) {
        console.warn("FakeStoreAPI is down. Recovering with fallbackProducts data:", error);
          setProducts(fallbackProducts); 
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);


  console.log (products)



  const allowedCategories = ["men's clothing", "women's clothing", "jewelery"];

const filteredProducts = products.filter((product) => {
  
  
  const matchesSearch = search.trim() === "" || product.title.toLowerCase().includes(search.toLowerCase());
  
  
  const matchesCategory = 
  category === "all" ? allowedCategories.includes(product.category) :
  category === "men" ? product.category === "men's clothing" :
  category === "women" ? product.category === "women's clothing" :
  category === "jewelery" ? product.category === "jewelery" : 

  false;

return matchesSearch && matchesCategory;


});

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading products...</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 md:px-6">
      <section className="grid gap-4 py-20 text-center">
        <h1 className="text-[44px] font-bold md:text-[56px] xl:text-[64px]">
          Delivering Amazing Clothing Wares
        </h1>
        <p className="text-2xl">
          Aim to offer the best clothing wear at competitive prices.
        </p>
      </section>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-4 pt-6">
        <button onClick={()=>setCategory("all")} className={`cursor-pointer rounded-2xl border-2 border-black px-4 py-2 font-bold text-black hover:bg-black hover:text-white ${category === "all" ? "bg-black text-white" : ""}`}>
          All Products
        </button>
        <button onClick={()=>setCategory("men")} className={`cursor-pointer rounded-2xl border-2 border-black px-4 py-2 font-bold text-black hover:bg-black hover:text-white  ${category === "men" ? "bg-black text-white" : ""}`}>
          Men Clothing
        </button>
        <button onClick={()=>setCategory("women")} className={`cursor-pointer rounded-2xl border-2 border-black px-4 py-2 font-bold text-black hover:bg-black hover:text-white ${category === "women" ? "bg-black text-white" : ""}`}>
          Women Clothing
        </button>
        <button onClick={()=>setCategory("jewelery")} className={`cursor-pointer rounded-2xl border-2 border-black px-4 py-2 font-bold text-black hover:bg-black hover:text-white ${category === "jewelery" ? "bg-black text-white" : ""}`}>
          Jewelry
        </button>
      </div>

      <section className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2 lg:grid-cols-3 ">
        {filteredProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>

          <article
            className="flex flex-col gap-4 min-h-full rounded-lg border border-gray-300 p-4 hover:bg-gray-50"
          >
            <img src={product.image} alt={product.title} className="product-image min-[500px]:mx-auto" />
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p>{product.rating.rate.toFixed(1)} <StarRating rating = {product.rating.rate}/> ({product.rating.count})</p> 
            <p className="text-2xl font-bold mt-auto">${product.price.toFixed(2)}</p>
          </article>
          </Link>
        ))}
      </section>   
    </main>
  );
}

