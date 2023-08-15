import React, { useEffect, useState, useRef } from 'react';
import './side-menu.css'
import trashBin from "/assets/icons/gray-trash-icon.png"
import trashBinWhite from "/assets/icons/white-trahs-icon.png"
import pencil from "/assets/icons/edit-gray-icon.png"
import pencilWhite from "/assets/icons/edit-white-icon.png"
import chatCloud from "/assets/icons/chat-white-icon.png"
import sunIcon from "/assets/icons/sun-icon.png"
import feedbackIcon from "/assets/icons/feedback-icon-white.png"
import crossIcon from "/assets/icons/cross-icon-grey.png"
import whiteCrossIcon from "/assets/icons/cross-icons-white.png"
import checkIcon from "/assets/icons/check-icon-grey.png"
import whiteCheckIcon from "/assets/icons/check-icon-white.png"
import closeIcon from "/assets/icons/close-icons-white.png"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AnimatePresence, motion } from "framer-motion";



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

function FeedbackScreen({setFeedbackScreen, isDarkMode}) {
    
    function closeCharacterList(event) {
        event.preventDefault()
        if (event.target === event.currentTarget) {
            setFeedbackScreen(false)
        }
    }
    return (
        <div className="feedback-screen-container" onClick={closeCharacterList}>
            <div className={`feedback-screen ${isDarkMode ? 'feedback-screen-dark' : ''}`}>
                <h3>Send Feedback</h3>
                <p>All feedback, suggestions, feature requests, and bug reports are welcomed!</p>
                <a>feedback@placeholder.com</a>
                <a className="close-btn" onClick={() => setFeedbackScreen(false)}>Close</a>
            </div>
        </div>
    )
}

function OldChatHistory({chatId, chatInfo, setUpdateList, updateList, setOldChat, setIsMenuOpen, windowSize, setChatPersona, setMessages, setChatId, messages, clickedId, setClickedId}) {
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [editText, setEditText] = useState(chatInfo.persona.name)
    const editTextFocus = useRef(null)

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
        if (windowSize < 1100) {
            setIsMenuOpen(false)
        }
    }

    return (
        <li key={chatId} className={`chat-history-chat ${clickedId === chatId ? "clicked-chat" : ""}`}>
            <img className="menu-icon menu-icon-bubble" src={chatCloud} onClick={() => openChat(key, chatInfo)} />
            <div className="chat-history-text"  onClick={() => {showEdit == false && openChat(chatId, chatInfo)}} >
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


export default function SideMenu({apiTokens, setChatPersona, messages, setMessages, setOldChat, setChatId, clickedId, setClickedId, isMenuOpen, setIsMenuOpen, windowSize, setIsDarkMode, isDarkMode, initialInstruction}) {
    const [chatArchiveList, setChatArchiveList] = useState([])
    const [updateList, setUpdateList] = useState(false)
    const [feedbackScreen, setFeedbackScreen] = useState(false)
    
    function closeMobileMenu(event) {
        event.preventDefault()
        if (event.target === event.currentTarget) {
            setIsMenuOpen(false)
            localStorage.setItem('menu-open', false);
        }
    }

    // toggles dark mode and saves it to local storage
    function toggleDarkMode() {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem('dark-mode', newDarkMode);
    }

    useEffect(() => {
        var chatArchive = [];
        var chatOrder = JSON.parse(localStorage.getItem('ORDER')) || [];
    
        // Create an array of chat IDs in the order stored in local storage
        var chatOrderIds = chatOrder.map(chat => chat.chatId);
        for (let i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var value = localStorage[key];
        
            if (key.includes('CHAT_')) {
            let chatInfo = JSON.parse(value);
            let chatId = chatInfo.chatId;
            chatArchive.push(
                <OldChatHistory
                    key={chatId}
                    chatId={chatId}
                    chatInfo={chatInfo}
                    setUpdateList={setUpdateList}
                    updateList={updateList}
                    setOldChat={setOldChat}
                    setChatPersona={setChatPersona}
                    setMessages={setMessages}
                    setChatId={setChatId}
                    messages={messages}
                    clickedId={clickedId}
                    setClickedId={setClickedId}
                    setIsMenuOpen={setIsMenuOpen}
                    windowSize={windowSize}
                />
            );
            }
        }
        
        // If chatOrderIds is not empty and has the same length as chatArchive, re-order the chatArchive
        if (chatOrderIds.length > 0 && chatOrderIds.length === chatArchive.length) {
            chatArchive.sort((a, b) => {
            const aIndex = chatOrderIds.indexOf(a.props.chatId);
            const bIndex = chatOrderIds.indexOf(b.props.chatId);
            return aIndex - bIndex;
            });
        }
        
        // Update the order of the chats in local storage
        chatOrder = chatArchive.map(chat => ({
            chatId: chat.props.chatId,
            chatInfo: chat.props.chatInfo
        }));
        localStorage.setItem('ORDER', JSON.stringify(chatOrder));
        
        setChatArchiveList(chatArchive);
    }, [updateList, messages]);

    

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        
        const items = Array.from(chatArchiveList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        
        // Update the order of the chats in local storage
        const chatOrder = items.map(chat => ({
            chatId: chat.props.chatId,
            chatInfo: chat.props.chatInfo
        }));
        localStorage.setItem('ORDER', JSON.stringify(chatOrder));
        
        setChatArchiveList(items);
    }

    function startNewChat() {
        setChatPersona({
            name: 'ChatGpt',
            id: "chatgpt",
            description: "I'm the same ChatGpt you know from OpenAI",
            firstQuestion: "Ask me a question",
            systemMessage: {
                role: "system",
                content: initialInstruction
            }
        })
        setOldChat(false)
        if (windowSize < 1100) {
            setIsMenuOpen(false)
        }
    }

    function SideMenuScreen({isDarkMode}) {
        return (
            <div className={`side-menu ${isMenuOpen ? 'side-menu-open' : 'side-menu-closed'}`}>
                <div className="new-chat">
                    <button className="new-chat-btn" onClick={startNewChat}><img className="menu-icon new-chat-icon" src={chatCloud}/>New Chat</button>
                </div>
                {chatArchiveList.length === 0 ? 
                <div className="no-chats-container">
                    <h4 className="no-chats-text no-chats-title">No chats yet</h4>
                    <p className="no-chats-text no-chats-description">Old chats will be displayed here</p> 
                </div>
                    : 
                <div className="chat-archive-container">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="chat-archive">
                        {(provided) => (
                            <div className="chat-archive" ref={provided.innerRef} {...provided.droppableProps}>
                            {chatArchiveList.map((chat, index) => (
                                <Draggable key={chat.key} draggableId={chat.props.chatId} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        {chat}
                                    </div>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                        </Droppable>
                    </DragDropContext>
                </div>
                }
                <div className="settings">
                    <div className="settings-account">
                        <p className="settings-account-status">Account: Free Trial</p>
                        <p className="settings-account-status-tokens">{Math.round(100 - apiTokens / 20000 * 100)}% Remaining</p>
                    </div>
                    
                    <div className="settings-info-bottom">
                        <p className="settings-copyright">TaskBuddy © 2023</p>
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
                {feedbackScreen && <FeedbackScreen setFeedbackScreen={setFeedbackScreen} isDarkMode={isDarkMode} />}
            </div>
    )
    }

    return (
        <>
        <AnimatePresence>
            {windowSize > 1100 ? 
                isMenuOpen && <SideMenuScreen isDarkMode={isDarkMode} /> : 
                isMenuOpen && 
                <motion.div
                    key="side-menu-mobile-container-animation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.20, ease: "linear" }}
                    className="side-menu-mobile-container"
                    onClick={closeMobileMenu}
                >
                    <motion.div
                        key="side-menu-mobile-animation"
                        initial={{ x: "-300px" }}
                        animate={{ x: "0px" }}
                        exit={{ x: "-300px" }}
                        transition={{ duration: 0.40, ease: "easeOut" }}
                        className="side-menu-mobile"
                        onClick={closeMobileMenu}
                    >
                        <SideMenuScreen isDarkMode={isDarkMode}/>
                    </motion.div>
                    <img className="side-menu-close" onClick={closeMobileMenu} src={closeIcon} />
                </motion.div>}
        </AnimatePresence>
        </>
        
        
    )
}