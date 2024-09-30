// import { PropTypes } from "prop-types";
// function Button(props) {

//     const { text, onClick, stylevar} = props;
//     let classProps = "text-center mx-2 text-text text-xl bg-secondary font-semibold py-2 px-2 mt-2 rounded transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-md hover:shadow-shadow"
//     if (stylevar) {
//         classProps = stylevar;
//     }
//     return (
//         <button
//             className= {classProps}
//             onClick={onClick}
//         >
//             {text}
//         </button>
//     );
// }

// PropTypes.DefaultProps = {
//     text: "Button",
//     onClick: () => {},
// };

// export default Button;
// Button.jsx
// Button.jsx
// Button.jsx
import React from 'react';

const Button = ({ label }) => {
  return (
    <button className="bg-white text-[#4255FF] border-2 border-[#1F61E0] py-2 px-6 rounded transition-colors duration-300 ease-in-out hover:bg-[#4255FF] hover:text-white hover:shadow-lg hover:shadow-[#4255FF]/50">
      {label}
    </button>
  );
};

export default Button;
