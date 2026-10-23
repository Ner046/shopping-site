import Link from "next/link";



export default function thanks() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 text-black grid justify-center items-start text-center gap-15">
        <h1 className="text-3xl md:text-5xl text-amber-400 place-self-end leading-tight">Thank you, <span className="block">your order has been placed</span></h1>

        <Link href="/" className={`flex cursor-pointer items-center justify-center gap-3 rounded-full bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800 w-full`}>
            Continue Shopping
      </Link>

    </main>
  )
}