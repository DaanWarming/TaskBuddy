import "./top-bar.css"
import hamburgerIcon from "/assets/icons/hamburger-icon-gray.png"
import hamburgerIconLight from "/assets/icons/hamburger-icon-light-gray.png"
import hamburgerIconWhite from "/assets/icons/hamburger-icon-white.png"
import homeIconWhite from "/assets/icons/home-icon-white.png"
import homeIconGrey from "/assets/icons/home-icon-grey.png"
import homeIconDark from "/assets/icons/home-icon-dark.png"
import taskSelectDesktopLight from "/assets/images/task-select-desktop-light.png"
import taskSelectDesktopDark from "/assets/images/task-select-desktop-dark.png"
import taskSelectMobileLight from "/assets/images/task-select-mobile-light.png"
import taskSelectMobileDark from "/assets/images/task-select-mobile-dark.png"
import chatInstructionLightMobile from "/assets/images/chat-instruction-light-mobile.png"
import chatInstructionDarkMobile from "/assets/images/chat-instruction-dark-mobile.png"
import chatInstructionLightDesktop from "/assets/images/chat-instruction-light-desktop.png"
import chatInstructionDarkDesktop from "/assets/images/chat-instruction-dark-desktop.png"
import moreTasksLight from "/assets/images/more-tasks-light.png"
import moreTasksDark from "/assets/images/more-tasks-dark.png"
import dragTaskLight from "/assets/images/drag-task-light.png"
import dragTaskDark from "/assets/images/drag-task-dark.png"
import oldChatsLight from "/assets/images/old-chats-light.png"
import oldChatsDark from "/assets/images/old-chats-dark.png"
import changeLanguageLight from "/assets/images/change-language-light.png"
import changeLanguageDark from "/assets/images/change-language-dark.png"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

function TutorialScreen({isDarkMode, setIsTutorialOpen, windowSize}) {

    function closeTutorialOpen(event) {
        if (event.target === event.currentTarget) {
            setIsTutorialOpen(false)
        }
    }

    return (
        <motion.div
                key="tutorial-container-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "linear" }}
                className="tutorial-container"
                onClick={closeTutorialOpen}
        >
            <motion.div
                        key="tutorial-card-animation"
                        initial={{ y: "80%", opacity: 1, scale: 1 }}
                            animate={{ y: "0%", opacity: 1, scale: 1 }}
                            exit={{ y: "30%", opacity: 1, scale: 1 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                        className={isDarkMode ? "tutorial-card tutorial-card-dark" : "tutorial-card"}
            >
                <h2 className="tutorial-card-title">TaskBuddy</h2>
                <p className="tutorial-card-title-sub-text">An Easier way to complete your tasks</p>
                {/* <div className="tutorial-card-free-trial tutorial-card-free-trial-first">
                    <h4 className="tutorial-card-free-trial-text">10 Day Free Trial.</h4>
                    <button className="tutorial-card-free-trial-btn">Start Free Trial</button>
                </div> */}
                <div className="tutorial-card-content">
                    <h4 className="tutorial-card-text">Start a chat by selecting a task</h4>
                    <img className="tutorial-card-image" src={windowSize < 811 ? isDarkMode ? taskSelectMobileDark : taskSelectMobileLight : isDarkMode ? taskSelectDesktopDark : taskSelectDesktopLight}/>
                    <h4 className="tutorial-card-text">You can follow the text instructions or type anything you like in the chat.</h4>
                    <img className="tutorial-card-image" src={windowSize < 811 ? isDarkMode ? chatInstructionDarkMobile : chatInstructionLightMobile : isDarkMode ? chatInstructionDarkDesktop : chatInstructionLightDesktop}/>
                    <h4 className="tutorial-card-text">Click "More Tasks" for additional task options.</h4>
                    <img className="tutorial-card-image" src={isDarkMode ? moreTasksDark : moreTasksLight} />
                    <h4 className="tutorial-card-text">{windowSize < 811 ? "Drag tasks to reorder them. The first 4 are shown on the front page." : "Drag tasks to reorder them. The first 6 are shown on the front page."}</h4>
                    <img className="tutorial-card-image" src={isDarkMode ? dragTaskDark : dragTaskLight} />
                    <h4 className="tutorial-card-text">Access old chats in the side menu.</h4>
                    <img className="tutorial-card-image" src={isDarkMode ? oldChatsDark : oldChatsLight} />
                    <h4 className="tutorial-card-text">Change the output Language in the chat settings.</h4>
                    <img className="tutorial-card-image" src={isDarkMode ? changeLanguageDark : changeLanguageLight} />
                </div>
                <div className="tutorial-card-free-trial">
                    {/* <h4 className="tutorial-card-free-trial-text">10 Day Free Trial.</h4> */}
                    <button className="tutorial-card-free-trial-btn" onClick={() => setIsTutorialOpen(false)}>Start Free Trial</button>
                </div>
            </motion.div>
        </motion.div>
    )
}


export default function TopBar({chatPersona, windowSize, setIsMenuOpen, isMenuOpen, isDarkMode, isTutorialOpen, setIsTutorialOpen}) {
    const [selectedImg, setSelectedImg] = useState(hamburgerIconLight)
    const [homeIcon, setHomeIcon] = useState(homeIconGrey)

    
    function handleHamburgerClick() {
        setIsMenuOpen(!isMenuOpen)
        localStorage.setItem('menu-open', !isMenuOpen);
    }

    return (
        <div className="top-bar-container">
            <div className={`top-bar ${isDarkMode && 'top-bar-dark'}`}>
                {windowSize < 1100 ? <img className="top-bar-hamburger-icon" onClick={() => handleHamburgerClick()} src={selectedImg} onMouseEnter={() => setSelectedImg(hamburgerIcon)} onMouseLeave={() => setSelectedImg(hamburgerIconLight)} /> : 
                    <img className="top-bar-hamburger-icon-desktop top-bar-hamburger-icon-desktop-closed" onClick={() => handleHamburgerClick()} src={selectedImg} onMouseEnter={() => setSelectedImg(isDarkMode ? hamburgerIconWhite : hamburgerIcon)} onMouseLeave={() => setSelectedImg(hamburgerIconLight)}/>}
                <div className="top-bar--info">
                    <p>Current Task: {chatPersona.name} </p>    
                </div>
                <img className="top-bar-home-icon" onClick={() => setIsTutorialOpen(true)}  src={homeIcon} onMouseEnter={() => setHomeIcon(isDarkMode ? homeIconWhite : homeIconDark)} onMouseLeave={() => setHomeIcon(homeIconGrey)}/>
                <AnimatePresence>
                    {isTutorialOpen && <TutorialScreen windowSize={windowSize} setIsTutorialOpen={setIsTutorialOpen} isDarkMode={isDarkMode}/>}
                </AnimatePresence>
            </div>
        </div>
        
    )
}