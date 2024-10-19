// Footer.jsx
import React from 'react';

import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#191970] text-white text-center py-4">
      <div className="text-base">
        <p>Stellar</p>
        <p className="text-xs text-gray-400 flex items-center justify-center">
          <FaRegCopyright className="mr-1" style={{ fontSize: '0.8em' }} /> 2024 Parth Bhanushali, Manas Bhambhra and Swapnil Pawar
        </p>
        <p className="text-xs text-gray-500">All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
