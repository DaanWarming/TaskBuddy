import React, { useEffect } from 'react';
import { useState } from 'react';
import "./option-selection.css"
import characterIcon from "../assets/icons/user-icon-white.png"
import characterIconGray from "../assets/icons/user-icon-gray.png"
import characterIconBlack from "../assets/icons/user-icon-black.png"
import plusIcon from "../assets/icons/plus-icon-white.png"


function PersonaCard({setChatPersona, setOldChat, item, setShowCharacterList, isDarkMode}) {
    const [selectedImg, setSelectedImg] = useState(isDarkMode ? characterIconBlack : characterIcon);

    useEffect(() => {
        setSelectedImg(isDarkMode ? characterIcon : characterIconBlack);
    }, [isDarkMode]);

    function handleMouseEnter() {
        if (isDarkMode) {
            setSelectedImg(characterIconBlack);
        } else {
        setSelectedImg(characterIcon);
        }
    }

    function handleMouseLeave() {
        if (isDarkMode) {
            setSelectedImg(characterIcon);
        } else {
        setSelectedImg(characterIconBlack);
        }
    }


    return (
        <div onClick={() => { 
            setOldChat(false) 
            setChatPersona(item)
            setShowCharacterList(false) }} 
            className="persona-card"
            key={item.id}
            onMouseEnter={() => setTimeout(() => handleMouseEnter(), 40)}
            onMouseLeave={() => setTimeout(() => handleMouseLeave(), 40)}>
            <h3 className="persona-name"><img src={selectedImg}  className="character-icon-card" />{item.name}</h3>
            <p className="persona-description">{item.description}</p>
        </div>
    )
}


function CharacterList({arrayItems, setChatPersona, setShowCharacterList, setOldChat, isDarkMode}) {
    
    function closeCharacterList(event) {
        event.preventDefault()
        if (event.target === event.currentTarget) {
            setShowCharacterList(false)
        }
    }
    return (
        <div className="character-list-full-container" onClick={closeCharacterList}>
            <div className="character-list-full-card">
                <h3 className="character-list-full-card-title">Select a Task</h3>
                <div className="character-list-full">
                    {arrayItems.map((item) => {
                        return (
                            <PersonaCard setChatPersona={setChatPersona} setOldChat={setOldChat} item={item} setShowCharacterList={setShowCharacterList} isDarkMode={isDarkMode} />
                        )
                    })}
                </div>
            </div>
            
        </div>
    )
}



export default function OptionSelection({arrayItems, setChatPersona, setOldChat, windowSize, isDarkMode}) {
    const [showCharacterList, setShowCharacterList] = useState(false)
    const [firstSix, setFirstSix] = useState(arrayItems.slice(0, 6))

    useEffect(() => {
        if (windowSize < 810) {
            setFirstSix(arrayItems.slice(0, 4))
            
        } else {
            setFirstSix(arrayItems.slice(0, 6))
        }
    }, [windowSize])

    function startNewChat() {
        setChatPersona({
            name: 'ChatGpt',
            id: "chatgpt",
            description: "Act as ChatGpt",
            firstQuestion: "Ask me a question",
            systemMessage: {
                role: "system",
                content: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.`
            }
        })
        setOldChat(false)
    }


    return ( 
        <>
        <div className={`option-selection ${isDarkMode && 'option-selection-dark'}`}>
            <h1 className="title">TaskGPT</h1>
            <p className="tag-line">A Faster way to use ChatGPT</p>
            <p className="select-a-task">Select a Task</p>
            <div className='persona-card-container'>
                {firstSix.map((item) => {
                    return (
                        <PersonaCard setChatPersona={setChatPersona} setOldChat={setOldChat} item={item} isDarkMode={isDarkMode} />
                    )
                })}
            </div>
            <div className="option-btns-container">
                <a onClick={() => setShowCharacterList(true)} className="action-btn show-more-btn"><img className="character-icon" src={characterIcon} />More Tasks</a>
                <a onClick={() => startNewChat()} className="action-btn new-chat-btn-home"><img className="character-icon" src={plusIcon} />New Chat</a>
            </div>
            
            {showCharacterList && <CharacterList arrayItems={arrayItems} setChatPersona={setChatPersona} setShowCharacterList={setShowCharacterList} setOldChat={setOldChat} isDarkMode={isDarkMode}/>}
        </div>
            
        </>
    );
}
