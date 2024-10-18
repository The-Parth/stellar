import React, { useEffect } from "react";

const LogoComponent = ({click}) => {

    if (!click) {
        click = () => {
            console.log("Clicked on logo");
        };
    }

    return (
        <div className="logo-container hover:cursor-pointer" onClick={click}>
            <h1 class="bg-gradient-to-r from-[#19196f] from-[5%] via-[#4355ff] via-[60%] to-[#5292c3] inline-block text-transparent bg-clip-text to-[90%] md:whitespace-nowrap text-2xl font-bold leading-9 tracking-tight text-blue-500" style={{ fontSize: "2rem" }}>
                Stellar
            </h1>
        </div>
    );
};

export default LogoComponent;
