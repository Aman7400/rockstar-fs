import React from 'react'

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section className='mx-auto h-80 flex drop-shadow-lg flex-col w-1/2 justify-center items-center'>
        <h1 className='text-7xl mb-2 text-heading font-sans-serif font-bold'>
          Send Super Big Files
        </h1>
        <p className='text-5xl mb-2 text-white font-sans-serif font-semibold'>
          Simple. Fast. Beautiful.
        </p>
      </section>
      {/* Drop Zone */}
      <section className='p-32 border-none hover:border-2 hover:border-dashed border-heading my-8 w-2/3 mx-auto rounded-2xl  shadow-lg cursor-pointer flex flex-col justify-center items-center bg-white'>
        <h1 className='text-3xl text-center text-heading font-sans-serif font-bold'>
          Drop it like its hot
        </h1>
      </section>
    </div>
  );
}

export default Home;