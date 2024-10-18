import React from 'react';
import Button from '../../components/Button';
import HoverText from '../../components/Hovertext';
import Footer from '../../components/Footer';
import heroSvg from '../../../assets/home/hero.svg';
import stellarLogo from '../../../assets/home/stellar.png';
import Star from '../../../assets/star.svg';
import Navbar from '../../components/Navbar';
import './styles/home.css';

const Home = () => {
  return (
    <>
    <Navbar />
    
       <div className="background-div absolute inset-0 -z-20 flex flex-col justify-center items-center w-full h-content">
      {Array.from({ length: 50 }).map((_, index) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomRotation = Math.random() * 360;
        const randWidth = Math.random() * 10 + 5; // Ensure minimum size
        const randHeight = Math.random() * 10 + 5; // Ensure minimum size
    
        return (
          <img
            key={index}
            src={Star}
            alt="Star"
            style={{
              position: 'absolute',
              top: `${randomY}%`,
              left: `${randomX}%`,
              transform: `rotate(${randomRotation}deg) scale(3)`,
              width: `${randWidth}px`,
              height: `${randHeight}px`,
              zIndex: -10,
            }}
          />
        );
      })}
    </div>

    <div className="">
      <header className="flex flex-row gap-[20%] justify-center items-center mb-[12vh] ml-[5vw]">
        <div>
          <span className='text-[#4255ff] text-[8vh]'>Level up your <span className='text-customBlueDark'>quiz game</span></span>
        </div>
        <img src={heroSvg} alt="Hero" className="hero-image w-[50vw]" />
      </header>

      <nav className="navigation">
        <Button label="Who are we?" />
        <Button label="What are we giving?" />
        <Button label="Our Goals" />
      </nav>

      <div className="content flex flex-col gap-6 py-10 px-20">
        <div className='flex flex-row gap-64 justify-between items-center align-center'>
         <div className='custShadow bg-[#4255ff] text-white text-[2.5vh] p-5 py-20 rounded-xl'>01 - ID INTERDUM VELIT LAOREET ID DONEC ULTRICES TINCIDUNT ARCU NON SODALES NEQUE SODALES UT ETIAM SIT AMET NISL</div>
          <div className='rounded-full bg-white'><iframe className='rounded-full shadow-2xl' width="520" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
        </div>
        </div>
        <div className='flex flex-row gap-64 justify-between items-center align-center'>
        <div className='rounded-full bg-white'><iframe className='rounded-full shadow-2xl' width="520" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
        </div>
          <div className='custShadow bg-[#4255ff] text-white text-[2.5vh] p-5 py-20 rounded-xl'>01 - ID INTERDUM VELIT LAOREET ID DONEC ULTRICES TINCIDUNT ARCU NON SODALES NEQUE SODALES UT ETIAM SIT AMET NISL</div>
        </div>
        <div className='flex flex-row gap-64 justify-between items-center align-center'>
          <div className='custShadow bg-[#4255ff] text-white text-[2.5vh] p-5 py-20 rounded-xl'>01 - ID INTERDUM VELIT LAOREET ID DONEC ULTRICES TINCIDUNT ARCU NON SODALES NEQUE SODALES UT ETIAM SIT AMET NISL </div>
          <div className='rounded-full bg-white'><iframe className='rounded-full shadow-2xl' width="520" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
          </div>
        </div>
      </div>

      {/* Stars positioned according to your shitty request */}
      


    </div>
    <Footer />
    </>
  );
};

export default Home;
