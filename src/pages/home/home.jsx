import React from 'react';
import Button from '../../components/Button';
import HoverText from '../../components/Hovertext';
import Footer from '../../components/Footer';
import heroSvg from '../../../assets/home/hero.svg';
import stellarLogo from '../../../assets/home/stellar.png';
import Star from '../../../assets/star.svg';
import './styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <img src={stellarLogo} alt="Stellar Logo" className="stellar-logo" />
        <h1 className="main-title">
          WE SELL <span className="highlight-quiz">QUIZZES</span>
          <span className="highlight-skills">SKILLS</span>
        </h1>
        <img src={heroSvg} alt="Hero" className="hero-image" />
      </header>

      <nav className="navigation">
        <Button label="Who are we?" />
        <Button label="What are we giving?" />
        <Button label="Our Goals" />
      </nav>

      <div className="content">
        <HoverText text="01 - ID INTERDUM VELIT LAOREET ID DONEC ULTRICES TINCIDUNT ARCU NON SODALES NEQUE SODALES UT ETIAM SIT AMET NISL" />
        <HoverText text="02 - ID INTERDUM VELIT LAOREET ID DONEC ULTRICES TINCIDUNT ARCU NON SODALES NEQUE SODALES UT ETIAM SIT AMET NISL" />
        <HoverText text="03 - ID INTERDUM VELIT LAOREET ID DONEC ULTRICES TINCIDUNT ARCU NON SODALES NEQUE SODALES UT ETIAM SIT AMET NISL" />
      </div>

      {/* Stars positioned according to your request */}
      <img src={Star} alt="Long Star" className="long-star" style={{ left: '163.52px', top: '569.12px' }} />
      <img src={Star} alt="Long Star" className="long-star" style={{ left: '1208.44px', top: '1244.93px' }} />
      <img src={Star} alt="Wide Star" className="wide-star" style={{ left: '1378.48px', top: '972.27px' }} />
      <img src={Star} alt="Wide Star" className="wide-star" style={{ left: '41.82px', top: '1488.28px' }} />
      <img src={Star} alt="Wide Star" className="wide-star" style={{ left: '1423.96px', top: '1841px' }} />

      <Footer />
    </div>
  );
};

export default Home;
