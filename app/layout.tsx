import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import SearchForm from "./searchform";
import CartCounter from "./cartQuantity"

export const metadata: Metadata = {
  title: "My Shopping Site",
  description: "Browse and shop for great products on My Shopping Site.",
};



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en">

      <body className="min-h-screen grid grid-rows-[auto_1fr_auto] gap-10 bg-[#F7F5F5]">

         <header className=" grid gap-4 bg-[#D2CCCC] px-16 py-6  md:px-14 md:py-4">

          <nav className="flex items-center justify-between ">
            
            <Link href="/" className="flex items-center gap-2">
              <img src ="/logo.svg" alt="My Shopping Site Logo" width="40" height="40" />
              <p>Shop</p>
            </Link>

            <Link href="/cart" className="flex items-center gap-1 text-[16px]">
              <img src ="/shopping-cart.png" alt="Shopping Cart" width="32" height="32" />
                My Cart (<CartCounter/> )
            </Link>
          </nav>

          <SearchForm />

        </header>

        {children}
        
        <footer className="grid justify-center gap-7 text-center bg-[#D2CCCC] px-6 py-6">


          <div className="flex gap-5 justify-center">
            <a href="#"><img src = "/instagram.png" width={32} height={32}/></a>
            <a href="#"><img src = "/snapchat.png" width={32} height={32}/></a>
            <a href="#"><img src = "/twitter.png" width={32} height={32}/></a>
            <a href="#"><img src= "/facebook.png" width={32} height={32}/></a>
            
          </div>

          <nav className="flex flex-col md:flex-row gap-4 ">
            <a href="#">Home</a>    
            <a href="#">About</a>     
            <a href="#">Terms</a>     
            <a href="#">Privacy Policy</a>     
          </nav>

          <p className="font-semibold">Nero @ {new Date().getFullYear()}</p>

        </footer>

      
      </body>

    </html>
  );
}
