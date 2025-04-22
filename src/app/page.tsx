import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-1 items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Welcome to the Serverless e-Commerce Store using AWS and Next.js
        </h1>
        <p className="text-lg text-center sm:text-left">
          This is a sample project to demonstrate the use of various AWS services with
          Next.js, including S3, DynamoDB, and Lambda. You can browse our products, search, and add them to your cart, and proceed to checkout.
        </p>
        <div className="w-full flex justify-center">
          <Image src='/architecture.png' alt='System Architecture' width={600} height={400} className="rounded-lg shadow-lg" />
        </div>
        <div className="flex justify-center w-full gap-4">
          <Link
            href="/products"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Proceed to Demo
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div
          className="flex items-center gap-2"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Created by <a className="text-blue-300 font-bold hover:underline hover:underline-offset-4" href="https://www.github.com/ammanabua" target="_blank" rel="noopener noreferrer">Amman</a> and <a className="text-yellow-300 font-bold hover:underline hover:underline-offset-4" href="https://www.github.com/JhonatanBellaiza" target="_blank" rel="noopener noreferrer">Jhonatan</a>
        </div>
      </footer>
    </div>
  );
}
