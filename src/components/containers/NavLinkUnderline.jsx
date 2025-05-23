import React from "react";
import { NavLink } from "react-router-dom";

export const NavLinkUnderlined = ({ to, children, onClick }) => {
    return (
        <NavLink
            onClick={onClick ? onClick : null}
            to={to}
            className="text-primary text-bold transition underline-animation lg:text-primary lg:hover:text-primary lg:transition lg:underline-animation hover:text-customBlueLight"
        >
            {children}
        </NavLink>
    );
};