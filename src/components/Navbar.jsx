import React from 'react'
import './styles/navbar.css';

const Navbar = () => {
    return (
     <>
        <div className='flex flex-row justify-between align-center px-4 py-3'>
            <span className='custFont text-[#4255ff] font-semibold text-[4vh]'>Stellar</span>
            <img src="./logo.svg" className='w-[8vh]'/>
            <img src="./hamBurgy.svg" className='w-[6vh]' />
        </div>
     </>
    )
}
export default Navbar