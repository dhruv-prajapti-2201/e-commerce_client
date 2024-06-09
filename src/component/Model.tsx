import React from 'react'

type props={
    children:JSX.Element
}

const Model = ({children}:props) => {
  return (
    <div className='absolute top-0 flex items-center justify-center left-0 h-screen w-full bg-black/80'>
        <div className='bg-white p-5 rounded-md'>{children}</div>
    </div>
  )
}

export default Model