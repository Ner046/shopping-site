import { notFound } from "next/navigation";
import fallbackProducts from "../../backupData/products.json";
import StarRating from "@/app/starRating";
import AddToCartButton from "./addCart";


type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
    
}



export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {

    
    const { id } = await params;

    let product: Product | undefined
    
    product = fallbackProducts.find((item) => item.id === Number(id));


    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!res.ok) {
            throw new Error(`Product request failed with status ${res.status}`);
        }

    product = await res.json() as Product;
    
    console.log(product)

    } catch (error) {
        console.warn(`Could not load product ${id} from FakeStoreAPI; using fallback data.`, error);
    }

    if (!product) {
        notFound();
    }

    return(
        <main className="mx-auto w-full max-w-7xl px-6 py-8 text-black" >

            <p className="text-gray-900 mb-8 font-semibold text-[0.875rem]">
                <a href="/" className="hover:text-gray-500 p-4 underline cursor-pointer">
                    Return to home page
                </a>
            </p>

            <section className ="grid grid-cols-1 md:grid-cols-2 gap-20">

            <img src={product.image} width="400"  alt={product.title} className="mx-auto aspect-square w-full md:h-full" />

            <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold">{product.title}</h1>
            <p>{product.rating.rate.toFixed(1)} <StarRating rating = {product.rating.rate}/> ({product.rating.count})</p>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            <AddToCartButton product={product}/>

            </div>

            </section>
        </main>
    )
}