import React, { useEffect, useState, useRef } from 'react';
import './side-menu.css'
import trashBin from "../assets/icons/gray-trash-icon.png"
import trashBinWhite from "../assets/icons/white-trahs-icon.png"
import pencil from "../assets/icons/edit-gray-icon.png"
import pencilWhite from "../assets/icons/edit-white-icon.png"
import chatCloud from "../assets/icons/chat-white-icon.png"
import sunIcon from "../assets/icons/sun-icon.png"
import feedbackIcon from "../assets/icons/feedback-icon-white.png"
import crossIcon from "../assets/icons/cross-icon-grey.png"
import whiteCrossIcon from "../assets/icons/cross-icons-white.png"
import checkIcon from "../assets/icons/check-icon-grey.png"
import whiteCheckIcon from "../assets/icons/check-icon-white.png"
import closeIcon from "../assets/icons/close-icons-white.png"



function PencilIcon({setShowEdit}) {
    const [pencilImg, setPencilImg] = useState(pencil);
    return (
        <img className="menu-icon" 
        onMouseEnter={() => setPencilImg(pencilWhite)}
        onMouseLeave={() => setPencilImg(pencil)}
        src={pencilImg}
        onClick={() => setShowEdit(true)} />
    )
}

function TrashIcon({setShowDelete}) {
    const [trashImg, setTrashImg] = useState(trashBin);
    return (
        <img className="menu-icon menu-icon-trash" 
        onMouseEnter={() => setTrashImg(trashBinWhite)}
        onMouseLeave={() => setTrashImg(trashBin)}
        src={trashImg}
        onClick={() => setShowDelete(true)} />
    )
}

function CrossIcon({setShowEdit}) {
    const [crossImg, setCrossImg] = useState(crossIcon);
    return (
        <img className="menu-icon edit-icons cross-icon" 
        onMouseEnter={() => setCrossImg(whiteCrossIcon)}
        onMouseLeave={() => setCrossImg(crossIcon)}
        src={crossImg} 
        onClick={() => setShowEdit(false)} />
    )
} 

function CheckIcon({editChatName, chatInfo}) {
    const [checkImg, setCheckImg] = useState(checkIcon);
    return (
        <img className="menu-icon edit-icons" 
        onMouseEnter={() => setCheckImg(whiteCheckIcon)}
        onMouseLeave={() => setCheckImg(checkIcon)}
        src={checkImg} 
        onClick={() => editChatName(chatInfo)} />
    )
}

function FeedbackScreen({setFeedbackScreen}) {
    
    function closeCharacterList(event) {
        event.preventDefault()
        if (event.target === event.currentTarget) {
            setFeedbackScreen(false)
        }
    }
    return (
        <div className="feedback-screen-container" onClick={closeCharacterList}>
            <div className="feedback-screen">
                <h3>Send Feedback</h3>
                <p>All feedback, suggestions, feature requests, and bug reports are welcomed!</p>
                <a>feedback@company.com</a>
                <a className="close-btn" onClick={() => setFeedbackScreen(false)}>Close</a>
            </div>
        </div>
    )
}

function OldChatHistory({chatId, chatInfo, setUpdateList, updateList, setOldChat, setChatPersona, setMessages, setChatId, messages, clickedId, setClickedId}) {
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [editText, setEditText] = useState(chatInfo.persona.name)

    useEffect(() => {
        if (showDelete) {
            setTimeout(() => {
                setShowDelete(false)
            }, 2000)
        }
    }, [showDelete])

    useEffect(() => {
        if (showEdit) {
            editTextFocus.current.focus()
        }
    }, [showEdit])


    
    function editChatName(chatInfo) {
        const updatedPersona = {
            ...chatInfo.persona,
            name: editText
        }
        const updatedObject = {
            ...chatInfo,
            persona: updatedPersona
        }
        localStorage.setItem(`${chatInfo.chatId}`, JSON.stringify(
            updatedObject
        ))
        setShowEdit(false)
        setUpdateList(!updateList)
    }

    // when delete button clicked delete the chat
    function deleteChat(id) {
        localStorage.removeItem(id)
        setUpdateList(!updateList)
    }

    function openChat(key, chatInfo) {
        setOldChat(true)
        setChatPersona(chatInfo.persona)
        setMessages(chatInfo.messages)
        setChatId(key)
        
        setClickedId(key);
    }

    return (
        <li key={chatId} className={`chat-history-chat ${clickedId === chatId ? "clicked-chat" : ""}`}>
            <img className="menu-icon menu-icon-bubble" src={chatCloud} onClick={() => openChat(key, chatInfo)} />
            <div className="chat-history-text"  onClick={() => {showEdit == false && openChat(chatId, chatInfo)}} onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}>
                {showEdit ? <textarea ref={editTextFocus} className="edit-title-area" value={editText} onChange={e => setEditText(e.target.value)}></textarea> : <p className="chat-history-title">{chatInfo.persona.name}</p>}
                <p className="chat-history-description">{chatInfo.persona.description}</p>
            </div>
            {showEdit ? 
                <div className="action-icons">
                    <CheckIcon editChatName={editChatName} chatInfo={chatInfo} />
                    <CrossIcon setShowEdit={setShowEdit} />
                </div> : 
                <div className="action-icons">
                    <PencilIcon setShowEdit={setShowEdit} />
                    {showDelete ? <p className="confirm-delete" onClick={() => deleteChat(chatId)}>Sure?</p> : <TrashIcon setShowDelete={setShowDelete}/>}
                </div>
            }
        </li>
    )
}


export default function SideMenu({setChatPersona, messages, setMessages, setOldChat, setChatId, clickedId, setClickedId, isMenuOpen, setIsMenuOpen, windowSize, setIsDarkMode, isDarkMode}) {
    const [chatArchiveList, setChatArchiveList] = useState([])
    const [updateList, setUpdateList] = useState(false)
    const [feedbackScreen, setFeedbackScreen] = useState(false)
    
    function closeMobileMenu(event) {
        event.preventDefault()
        if (event.target === event.currentTarget) {
            setIsMenuOpen(false)
        }
    }

    // toggles dark mode and saves it to local storage
    function toggleDarkMode() {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('dark-mode', isDarkMode);
    }


    // get all chats from local storage and display them in left menu
    useEffect(() => {
        var chatArchive = []
        for(let i = 0, len=localStorage.length; i<len; i++) {
            var key = localStorage.key(i);
            var value = localStorage[key];

            if (key.includes("CHAT_")) {
                let chatInfo = JSON.parse(value)
                let chatId = chatInfo.chatId
                chatArchive.push( 
                    <OldChatHistory key={chatId} chatId={chatId} chatInfo={chatInfo} setUpdateList={setUpdateList} updateList={updateList} setOldChat={setOldChat} 
                    setChatPersona={setChatPersona} setMessages={setMessages} setChatId={setChatId} messages={messages} clickedId={clickedId} setClickedId={setClickedId}/>
                )
            }
        }
        setChatArchiveList(chatArchive)
    }, [ , updateList, messages])


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

    function SideMenuScreen() {
        return (
            <div className={`side-menu ${isMenuOpen ? 'side-menu--open' : ''}`}>
                <div className="new-chat">
                    <button className="new-chat-btn" onClick={startNewChat}><img className="menu-icon new-chat-icon" src={chatCloud}/>New Chat</button>
                </div>
                <div className="chat-archive-container">
                    <ul className="chat-archive">{chatArchiveList}</ul>
                </div>
                <div className="settings">
                    <p className="account-status">Account: Free Trial</p>
                    <div className="settings-info-bottom">
                        <p className="settings-copyright">TaskGPT © 2023</p>
                        <div className="settings-info-links">
                            <a className="settings-info-links-link">Privacy |</a>
                            <a className="settings-info-links-link"> Terms |</a>
                            <a className="settings-info-links-link"> FAQs</a>
                        </div>
                        <div className="settings-buttons">
                            <a className="buttons-feedback" onClick={() => setFeedbackScreen(true)}><img src={feedbackIcon} className="settings-icon feedback-icon"/>Send Feedback</a>
                            <img src={sunIcon}  className="settings-icon buttons-darkmode" onClick={() => toggleDarkMode()}/>
                        </div>
                    </div>
                </div>
                {feedbackScreen && <FeedbackScreen setFeedbackScreen={setFeedbackScreen} />}
            </div>
    )
    }

    return (
        <>
            {windowSize > 1100 ? 
                isMenuOpen && <SideMenuScreen /> : 
                isMenuOpen && 
                <div className="side-menu-mobile-container" onClick={closeMobileMenu}>
                    <div className="side-menu-mobile">
                        <SideMenuScreen />
                    </div>
                    <img className="side-menu-close" onClick={closeMobileMenu} src={closeIcon} />
                </div>}
        </>
        
        
    )
}