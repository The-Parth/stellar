import React from "react";
import Button from "../../components/Button";
import HoverText from "../../components/Hovertext";
import Footer from "../../components/Footer";
import heroSvg from "../../../assets/home/hero.svg";
import stellarLogo from "../../../assets/home/stellar.png";
import Star from "../../../assets/star.svg";
import Navbar from "../../components/Navbar";
import "./styles/home.css";

var offset_array = [
    {
        x: 99.8314972205186,
        y: 97.17744239237366,
        rotation: 193.13907142745458,
        width: 12.273987287901848,
        height: 7.875525331987481,
    },
    {
        x: 85.9304923711242,
        y: 35.90280756168922,
        rotation: 261.575083929433,
        width: 10.82118446441767,
        height: 10.463407807312027,
    },
    {
        x: 66.04343316493946,
        y: 60.06910479776912,
        rotation: 115.1642008637893,
        width: 8.778495381579381,
        height: 14.688188775237784,
    },
    {
        x: 54.71546746196376,
        y: 57.118247737513414,
        rotation: 233.92517797769773,
        width: 8.290995808165489,
        height: 9.113941915388866,
    },
    {
        x: 12.310899929971054,
        y: 84.86251458133952,
        rotation: 40.84703313599384,
        width: 13.393691865858472,
        height: 8.20465517174834,
    },
    {
        x: 38.92060403188873,
        y: 99.61803921845818,
        rotation: 88.80406259602955,
        width: 13.360655411013404,
        height: 12.193286796313416,
    },
    {
        x: 42.3633218914842,
        y: 55.700008326893254,
        rotation: 65.30126662746233,
        width: 14.92409273499887,
        height: 9.820606312878828,
    },
    {
        x: 50.32395600991162,
        y: 61.032400247518396,
        rotation: 122.22965050573522,
        width: 5.719070251744949,
        height: 6.793467297298839,
    },
    {
        x: 98.26780278545124,
        y: 22.283231441270956,
        rotation: 51.165214158040044,
        width: 7.7115289495047605,
        height: 10.415184403115221,
    },
    {
        x: 62.71915953938281,
        y: 84.13982378744562,
        rotation: 269.6645213929847,
        width: 6.884526426900424,
        height: 10.204885056054476,
    },
    {
        x: 94.40964780238129,
        y: 21.640816512864358,
        rotation: 151.02582028731027,
        width: 14.456377840080037,
        height: 14.04341518388893,
    },
    {
        x: 49.624197679441906,
        y: 38.6534092236527,
        rotation: 60.74414694772625,
        width: 11.675524577246158,
        height: 10.308181076350662,
    },
    {
        x: 35.33332904100881,
        y: 51.493684866948186,
        rotation: 128.09429929033587,
        width: 12.383586642122495,
        height: 13.761327296261276,
    },
    {
        x: 33.03921268590406,
        y: 23.296231752756192,
        rotation: 3.790601970683909,
        width: 8.211510680404047,
        height: 11.572657789916125,
    },
    {
        x: 11.582242316684678,
        y: 3.774568266443401,
        rotation: 9.481418882137138,
        width: 11.46495898529789,
        height: 10.776857365229704,
    },
    {
        x: 88.04331827122776,
        y: 16.476635293155084,
        rotation: 94.18439789349821,
        width: 10.541763180114291,
        height: 8.947609263280627,
    },
    {
        x: 67.76486959632022,
        y: 93.98304489108236,
        rotation: 347.24198347976494,
        width: 14.99417898092544,
        height: 13.246999802853288,
    },
    {
        x: 56.68797184939749,
        y: 81.70600622733473,
        rotation: 116.68197470151051,
        width: 10.015758293240038,
        height: 14.716679053987825,
    },
    {
        x: 3.784828698585496,
        y: 71.3326964330397,
        rotation: 72.76432009725882,
        width: 7.407655382999286,
        height: 7.1495642937223,
    },
    {
        x: 21.499517451641825,
        y: 14.515365899981902,
        rotation: 17.906260852408753,
        width: 11.49870701044276,
        height: 5.013062791198813,
    },
    {
        x: 15.67995723690312,
        y: 3.814376969650013,
        rotation: 164.79832640974644,
        width: 14.977738278056558,
        height: 7.980783907989717,
    },
    {
        x: 72.89987847893052,
        y: 0.08606868385299116,
        rotation: 56.75213416840216,
        width: 14.215560869925202,
        height: 10.259909951551675,
    },
    {
        x: 16.55724380080059,
        y: 21.696026404844805,
        rotation: 317.7068846702515,
        width: 6.523241925036425,
        height: 5.421871905543156,
    },
    {
        x: 34.32634453392507,
        y: 86.18641502977546,
        rotation: 296.0591132922245,
        width: 7.285472399796545,
        height: 9.016680190511279,
    },
    {
        x: 65.37290788460459,
        y: 24.105453315975446,
        rotation: 240.88319180115423,
        width: 9.616958949758684,
        height: 6.7461621099399505,
    },
    {
        x: 25.12422924979869,
        y: 13.113609582225049,
        rotation: 181.08987288885018,
        width: 7.288804779600246,
        height: 5.315357084681032,
    },
    {
        x: 43.83056474353393,
        y: 5.602293761658217,
        rotation: 228.99545554694836,
        width: 14.636009159403864,
        height: 6.286967343398535,
    },
    {
        x: 46.77129545610386,
        y: 14.44465460737443,
        rotation: 284.6880597427153,
        width: 5.172819993012143,
        height: 8.932185967949573,
    },
    {
        x: 3.6045362239933043,
        y: 43.548023836076254,
        rotation: 230.39792512218793,
        width: 6.7386351534375555,
        height: 5.498208420280044,
    },
    {
        x: 43.906179822275426,
        y: 43.418110325198555,
        rotation: 74.23415437048239,
        width: 7.115432535211661,
        height: 5.54200656272328,
    },
];
var offset_array2 = [];
const Home = () => {
    const fixed_offset_provided = true;
    return (
        <>
            <Navbar />

            <div className="background-div absolute inset-0 -z-20 flex flex-col justify-center items-center w-full h-content">
                {fixed_offset_provided
                    ? offset_array.map((offset, index) => {
                          return (
                              <img
                                  key={index}
                                  src={Star}
                                  alt="Star"
                                  style={{
                                      position: "absolute",
                                      top: `${offset.y}%`,
                                      left: `${offset.x}%`,
                                      transform: `rotate(${offset.rotation}deg) scale(3)`,
                                      width: `${offset.width}px`,
                                      height: `${offset.height}px`,
                                      zIndex: -10,
                                  }}
                              />
                          );
                      })
                    : Array.from({ length: 30 }).map((_, index) => {
                          const randomX = Math.random() * 100;
                          const randomY = Math.random() * 100;
                          const randomRotation = Math.random() * 360;
                          const randWidth = Math.random() * 10 + 5; // Ensure minimum size
                          const randHeight = Math.random() * 10 + 5; // Ensure minimum size

                          // append to offset array
                          offset_array.push({
                              x: randomX,
                              y: randomY,
                              rotation: randomRotation,
                              width: randWidth,
                              height: randHeight,
                          });

                          if (offset_array.length == 30) {
                              console.log(offset_array);
                          }
                          return (
                              <img
                                  key={index}
                                  src={Star}
                                  alt="Star"
                                  style={{
                                      position: "absolute",
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
                        <span className="text-[#4255ff] text-[8vh]">
                            Level up your{" "}
                            <span className="text-customBlueDark">
                                quiz game
                            </span>
                        </span>
                    </div>
                    <img
                        src={heroSvg}
                        alt="Hero"
                        className="hero-image w-[50vw] hidden md:block"
                    />
                </header>

                <nav className="navigation">
                    <Button label="Who are we?" />
                    <Button label="What are we giving?" />
                    <Button label="Our Goals" />
                </nav>

                <div className="content flex flex-col gap-6 py-10 px-4 md:px-20">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-between items-center">
                        <div className="custShadow bg-[#4255ff] text-white text-[2.5vh] p-5 py-10 md:py-20 rounded-2xl flex-1 order-1 md:order-none">
                            Create engaging quizzes to test your knowledge and
                            challenge your friends!
                        </div>
                        <div className="rounded-full overflow-hidden flex-1 max-w-md order-2 md:order-none">
                            <iframe
                                className="rounded-full shadow-2xl w-full h-56 md:h-72"
                                src="https://www.youtube.com/embed/9lNZ_Rnr7Jc?modestbranding=1&showinfo=0&controls=0"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-between items-center">
                        <div className="rounded-full overflow-hidden flex-1 max-w-md order-2 md:order-none">
                            <iframe
                                className="rounded-full shadow-2xl w-full h-56 md:h-72"
                                src="https://www.youtube.com/embed/9lNZ_Rnr7Jc?modestbranding=1&showinfo=0&controls=0"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="custShadow bg-[#4255ff] text-white text-[2.5vh] p-5 py-10 md:py-20 rounded-2xl flex-1 order-1 md:order-none">
                            Discover a variety of quiz categories and improve
                            your skills!
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-between items-center">
                        <div className="custShadow bg-[#4255ff] text-white text-[2.5vh] p-5 py-10 md:py-20 rounded-2xl flex-1 order-1 md:order-none">
                            Track your progress and see how you rank against
                            others!
                        </div>
                        <div className="rounded-full overflow-hidden flex-1 max-w-md order-2 md:order-none">
                            <iframe
                                className="rounded-full shadow-2xl w-full h-56 md:h-72"
                                src="https://www.youtube.com/embed/9lNZ_Rnr7Jc?modestbranding=1&showinfo=0&controls=0"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
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
