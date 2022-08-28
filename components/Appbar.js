import Link from 'next/link';
import React from 'react';

const Appbar = () => {
  return (
    <div className='p-8 px-16 flex flex-row items-center justify-between'>
      {/* Logo */}
      <h1 className='text-heading drop-shadow-sm text-4xl hover:drop-shadow-md cursor-pointer font-sans-serif font-bold'>
        <Link href='/'>Rockstar FS</Link>
      </h1>

      <section className='flex flex-row'>
        {['features', 'pricing', 'invite'].map((menu, i) => (
          <p
            key={i}
            className='mx-8 text-heading hover:scale-105 ease-in-out duration-200 text-xl drop-shadow-sm font-sans-serif capitalize font-medium'
          >
            <Link href={menu}>{menu}</Link>
          </p>
        ))}
      </section>

      {/* CTA's */}
      <section className='flex flex-row items-center drop-shadow-sm '>
        <p className='text-heading hover:scale-105 ease-in-out duration-300 text-xl font-sans-serif font-semibold'>
          <Link href='/auth/login'>Sign In</Link>
        </p>
        <p className='p-2 px-4 text-xl cursor-pointer ml-8 hover:scale-105 ease-in-out duration-200 font-sans-serif font-semibold text-white bg-heading rounded-md'>
          <Link href='/auth/register'>Create account</Link>
        </p>
      </section>
    </div>
  );
};

export default Appbar;
