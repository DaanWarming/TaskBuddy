import "./top-bar.css"
import hamburgerIcon from "../assets/icons/hamburger-icon-gray.png"
import hamburgerIconLight from "../assets/icons/hamburger-icon-light-gray.png"
import { useState } from "react"

export default function TopBar({chatPersona, windowSize, setIsMenuOpen, isMenuOpen, isDarkMode}) {
    const [selectedImg, setSelectedImg] = useState(hamburgerIconLight)
    return (
        <div className={`top-bar ${isDarkMode && 'top-bar-dark'}`}>
            {windowSize < 1100 ? <img className="top-bar-hamburger-icon" onClick={() => setIsMenuOpen(true)} src={selectedImg} onMouseEnter={() => setSelectedImg(hamburgerIcon)} onMouseLeave={() => setSelectedImg(hamburgerIconLight)} /> : 
                isMenuOpen ? <img className="top-bar-hamburger-icon-desktop top-bar-hamburger-icon-desktop-open " onClick={() => setIsMenuOpen(!isMenuOpen)}  src={selectedImg} onMouseEnter={() => setSelectedImg(hamburgerIcon)} onMouseLeave={() => setSelectedImg(hamburgerIconLight)}/> : 
                <img className="top-bar-hamburger-icon-desktop top-bar-hamburger-icon-desktop-closed" onClick={() => setIsMenuOpen(!isMenuOpen)} src={selectedImg} onMouseEnter={() => setSelectedImg(hamburgerIcon)} onMouseLeave={() => setSelectedImg(hamburgerIconLight)}/>}
            <div className="top-bar--info">
                <p>Current Task: {chatPersona.name} </p>    
            </div>
        </div>
    )
}