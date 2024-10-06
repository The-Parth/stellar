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
    <div className="home-container">
      <header className="flex flex-row gap-[20%] justify-center items-center mb-[12vh]">
        <div>
          <span className='text-[#4255ff] text-[8vh]'>We Sell <span className='titleHeroParent line-through font-bold'>Quizes<span className='titleHeroChild text-[#363995] no-underline'>Skills</span></span></span>
        </div>
        <img src={heroSvg} alt="Hero" className="hero-image w-[60vh]" />
      </header>

      <nav className="navigation">
        <Button label="Who are we?" />
        <Button label="What are we giving?" />
        <Button label="Our Goals" />
      </nav>

      <div className="content flex flex-col gap-6 py-10 px-20">
        <div className='flex flex-row gap-64 justify-between items-center align-center'>
          <div className='custShadow bg-[#4255ff] text-white text-[2.5vh] p-5 py-20 rounded-xl'>01 - ID INTERDUM VELIT LAOREET ID DONEC ULTRICES TINCIDUNT ARCU NON SODALES NEQUE SODALES UT ETIAM SIT AMET NISL</div>
          <div className='rounded-full bg-white'><iframe className='rounded-full shadow-2xl' width="520" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY" />
        </div>
        </div>
        <div className='flex flex-row gap-64 justify-between items-center align-center'>
        <div className='rounded-full bg-white'><iframe className='rounded-full shadow-2xl' width="520" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY" />
        </div>
          <div className='custShadow bg-[#4255ff] text-white text-[2.5vh] p-5 py-20 rounded-xl'>01 - ID INTERDUM VELIT LAOREET ID DONEC ULTRICES TINCIDUNT ARCU NON SODALES NEQUE SODALES UT ETIAM SIT AMET NISL</div>
        </div>
        <div className='flex flex-row gap-64 justify-between items-center align-center'>
          <div className='custShadow bg-[#4255ff] text-white text-[2.5vh] p-5 py-20 rounded-xl'>01 - ID INTERDUM VELIT LAOREET ID DONEC ULTRICES TINCIDUNT ARCU NON SODALES NEQUE SODALES UT ETIAM SIT AMET NISL </div>
          <div className='rounded-full bg-white'><iframe className='rounded-full shadow-2xl' width="520" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY" />
          </div>
        </div>
      </div>

      {/* Stars positioned according to your shitty request */}
      <img src={Star} alt="Long Star" className="long-star" />

      <Footer />
    </div>
    </>
  );
};

export default Home;
