const CART_KEY = "shopping-app-cart";

export function readCart<T>(){
    if(typeof window === "undefined") return [] as T []

    const saved = localStorage.getItem(CART_KEY);

    if (!saved) return [] as T[];

    try{
        return JSON.parse(saved) as T[];
    }
    catch{
        return [] as T[]

    }

}

export function saveCart<T>(items:T[]){
    localStorage.setItem(CART_KEY, JSON.stringify(items))
    window.dispatchEvent(new Event("cart-updated"));

}