import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center py-4 bg-gray-400">
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
  )
}

export default Footer