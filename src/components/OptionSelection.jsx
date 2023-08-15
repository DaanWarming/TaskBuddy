import React, { useEffect } from 'react';
import { useState } from 'react';
import "./option-selection.css"
import characterIcon from "/assets/icons/user-icon-white.png"
import characterIconGray from "/assets/icons/user-icon-gray.png"
import characterIconBlack from "/assets/icons/user-icon-black.png"
import dragDotsIconDark from "/assets/icons/drag-icon-dark.png"
import dragDotsIconsWhite from "/assets/icons/drag-icon-white.png"
import plusIcon from "/assets/icons/plus-icon-white.png"
import settingsIcon from "/assets/icons/settings-icon-white.png"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { arrayItemsPrompts } from '../Prompts'
import { motion, AnimatePresence } from "framer-motion";

function FreeTrialRemaining({isDarkMode, apiTokens, setIsApiTokenPopupOpen}) {

    function closeFreeTrialRemaining(event) {
        if (event.target === event.currentTarget) {
            setIsApiTokenPopupOpen(false)
        }
    }

    return (
        <>
            <motion.div
                key="free-trial-pop-up-container-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.20, ease: "easeIn" }}
                className="free-trial-pop-up-container"
                onClick={closeFreeTrialRemaining}
            >
                <motion.div
                    key="free-trial-pop-up-card-animation"
                    initial={{ y: "10%", opacity: 0, scale: 0.8 }}
                    animate={{ y: "0%", opacity: 1, scale: 1 }}
                    exit={{ y: "10%", opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.20, ease: "easeIn" }}
                    className={isDarkMode ? "free-trial-pop-up-card-dark free-trial-pop-up-card" : "free-trial-pop-up-card"}
                >
                    <h2 className="free-trial--header">You have 50% of your free trial left</h2>
                    <h3 className="free-trial--title">Unlock Unlimited Access</h3>
                    <p className="free-trial--tag-line">This will be the tagline</p>
                    <div className="free-trial--package-container">
                        <div className="free-trial--package">free tier</div>
                        <div className="free-trial--package">Package 1</div>
                        <div className="free-trial--package">Package 2</div>
                    </div>
                    <div className="free-trial--policy-container">
                        <p className="free-trial--policy-text">All plans are monthly, 14-day money-back guarantee.</p>
                        <div className="free-trial--policy-links-container">
                            <a className="free-trial--policy-link">Privacy Policy</a>
                            <a className="free-trial--policy-link">Terms of Service</a>
                        </div>
                    </div>
                    <div className="free-trial--selling-point-container">
                        <div className="free-trial--selling-point">
                            <img className="free-trial--selling-point-icon" />
                            <div className="free-trial--selling-point-text-container">
                                <p className="free-trial--selling-point-text free-trial--selling-point-text-title">Selling point 1</p>
                                <p className="free-trial--selling-point-text free-trial--selling-point-text-sub">Sub text of selling point</p>
                            </div>
                        </div>
                        <div className="free-trial--selling-point">
                            <img className="free-trial--selling-point-icon" />
                            <div className="free-trial--selling-point-text-container">
                                <p className="free-trial--selling-point-text free-trial--selling-point-text-title">Selling point 2</p>
                                <p className="free-trial--selling-point-text free-trial--selling-point-text-sub">Sub text of selling point</p>
                            </div>
                        </div>
                        <div className="free-trial--selling-point">
                            <img className="free-trial--selling-point-icon" />
                            <div className="free-trial--selling-point-text-container">
                                <p className="free-trial--selling-point-text free-trial--selling-point-text-title">Selling point 3</p>
                                <p className="free-trial--selling-point-text free-trial--selling-point-text-sub">Sub text of selling point</p>
                            </div>
                        </div>
                        <div className="free-trial--selling-point">
                            <img className="free-trial--selling-point-icon" />
                            <div className="free-trial--selling-point-text-container">
                                <p className="free-trial--selling-point-text free-trial--selling-point-text-title">Selling point 4</p>
                                <p className="free-trial--selling-point-text free-trial--selling-point-text-sub">Sub text of selling point</p>
                            </div>
                        </div>
                    </div>
                    <div className="free-trial--social-proof-container">
                        <h4 className="free-trial--social-proof-title">Social Proof Section</h4>
                        <div>
                            <img className="free-trial--social-proof-logo" />
                            <img className="free-trial--social-proof-logo" />
                        </div>
                        <img className="free-trial--social-proof-stars" />
                        <p className="free-trial--social-proof-review">“This is a quote from a customer that is really good and will make you want to buy the product”</p>
                        <p className="free-trial--social-proof-customer">- Customer Name</p>
                        <a className="free-trial--social-proof-more-btn" href="">More reviews</a>
                    </div>
                    <div className="free-trial--faq-container">
                        <h4 className="free-trial--faq-title">FAQ</h4>
                        <div className="free-trial--faq-question-container">
                            <div className="free-trial--faq-qa">
                                <p className="free-trial--faq-question">Question 1</p>
                                <p className="free-trial--faq-answer">Answer 1</p>
                            </div>
                            <div className="free-trial--faq-qa">
                                <p className="free-trial--faq-question">Question 2</p>
                                <p className="free-trial--faq-answer">Answer 2</p>
                            </div>
                            <div className="free-trial--faq-qa">
                                <p className="free-trial--faq-question">Question 3</p>
                                <p className="free-trial--faq-answer">Answer 3</p>
                            </div>
                            <div className="free-trial--faq-qa">
                                <p className="free-trial--faq-question">Question 4</p>
                                <p className="free-trial--faq-answer">Answer 4</p>
                            </div>
                            <div className="free-trial--faq-qa">
                                <p className="free-trial--faq-question">Question 5</p>
                                <p className="free-trial--faq-answer">Answer 5</p>
                            </div>
                        </div>
                        <button>More FAQ</button>
                    </div>
                    <div>
                        <button>Close</button>
                        
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}

function ChatSettings({setShowChatSettings, isDarkMode, apiModel, apiTemperature, apiStream, setApiModel, setApiTemperature, setApiStream, setInitialApiInstruction, initialInstruction, setInitialInstruction, setLanguageOutput, languageOutput}) {
    const [selectModel, setSelectModel] = useState(apiModel)
    const [streamResponse, setStreamResponse] = useState(apiStream)
    const [temperature, setTemperature] = useState(apiTemperature)
    const [languageSelect, setLanguageSelect] = useState(languageOutput)


    function closeChatSettings(event) {
        if (event.target === event.currentTarget) {
            setShowChatSettings(false)
        }
    }

    useEffect(() => {
        setStreamResponse(streamResponse)
    }, [streamResponse])

    function resetInitialInstruction() {
        setInitialInstruction("You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.")
    }

    function resetTemperature() {
        setTemperature(0.7)
    }

    function applySettings() {
        setApiModel(selectModel)
        setApiTemperature(temperature)
        setApiStream(streamResponse)
        setInitialApiInstruction(initialInstruction)
        setShowChatSettings(false)
        setLanguageOutput(languageSelect)

        const settings = {
            apiModel: selectModel,
            apiTemperature: temperature,
            apiStream: streamResponse,
            initialApiInstruction: initialInstruction,
            showChatSettings: false,
            languageOutput: languageSelect
        };
    
        let storedSettings = localStorage.getItem('MODEL_SETTINGS');
        if (storedSettings) {
            storedSettings = JSON.parse(storedSettings);
            storedSettings = { ...storedSettings, ...settings };
        } else {
            storedSettings = settings;
        }
    
        localStorage.setItem('MODEL_SETTINGS', JSON.stringify(storedSettings));
    }

    return (
        <motion.div
            key="chat-settings-container-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.20, ease: "easeIn" }}
            className="chat-settings-container"
            onClick={closeChatSettings}
        >
            <motion.div
                key="chat-settings-card-animation"
                initial={{ y: "10%", opacity: 0, scale: 0.8 }}
                animate={{ y: "0%", opacity: 1, scale: 1 }}
                exit={{ y: "10%", opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.20, ease: "easeIn" }}
                className={isDarkMode ? "chat-settings-card dark-mode" : "chat-settings-card"}
            >
                <h3 className="chat-settings-title">Chat Settings</h3>
                <div className="chat-settings">
                    <div className="chat-settings-item">
                        <div className="chat-settings-item-row">
                            <label className="chat-settings-item-title">Model</label>
                            <a className="chat-settings-item-learn-more" target='_blank' href='https://platform.openai.com/docs/models/overview'>Learn more →</a>
                        </div>
                        <select className="chat-settings-model-select" value={selectModel} onChange={(e) => setSelectModel(e.target.value)} >
                            <option value="gpt-3.5-turbo">GPT-3.5 (Default)</option>
                            <option value="gpt-3.5-turbo-16k">GPT-3.5-turbo-16k</option>
                            <option value="gpt4">GPT-4 (Unavailable)</option>
                            <option value="gpt4-32k">GPT-4-32k (Unavailable)</option>
                        </ select>
                    </div>
                    <div className="chat-settings-item">
                        <div className="chat-settings-item-row initial-instructions-item-row">
                            <label className="chat-settings-item-title initial-instructions-title">Initial System Instruction</label>
                            <a className="chat-settings-item-reset chat-settings-item-reset-first" onClick={() => resetInitialInstruction()}>(Reset to default)</a>
                            <a className="chat-settings-item-learn-more" target='_blank' href='https://platform.openai.com/docs/guides/chat/instructing-chat-models'>Learn more →</a>
                        </div>
                        <textarea className="chat-settings-initial-instruction" value={initialInstruction} onChange={(e) => setInitialInstruction(e.target.value)} ></textarea>
                    </div>
                    {/* <div className="chat-settings-item stream-ai-line">
                        <input type="checkbox" className="chat-settings-item-checkbox" checked={false} onChange={(e) => setStreamResponse(e.target.checked)}/>
                        <h4 className="chat-settings-item-title stream-ai-title">Stream AI responses word by word -- Not yet available</h4>
                    </div> */}
                    <div className="chat-settings-item">
                        <div className="chat-settings-item-row">
                            <h4 className="chat-settings-item-title">Temperature {temperature}</h4>
                            <a className="chat-settings-item-reset" onClick={() => resetTemperature()}>(Reset to default)</a>
                        </div>
                        <p className="chat-settings-item-temperature-text">Higher values like 1 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.</p>
                        <input className="chat-settings-item-temperature-range" type="range" min="0" max="1.0" step="0.1" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}/>
                        <div className="chat-settings-item-row chat-settings-item-temperature-range-text">
                            <p>Precise</p>
                            <p>Neutral</p>
                            <p>Creative</p>
                        </div>
                    </div>
                    <div className="chat-settings-item">
                        <label className="chat-settings-item-title chat-settings-language-label">Output Language:</label>
                        <select className="chat-settings-model-select chat-settings-language-select" value={languageSelect} onChange={(e) => setLanguageSelect(e.target.value)} >
                            <option value="Default">Default</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Italian">Italian</option>
                            <option value="Portuguese">Portuguese</option>
                            <option value="Dutch">Dutch</option>
                            <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                            <option value="Afrikaans">Afrikaans</option>
                            <option value="Albanian">Albanian</option>
                            <option value="Arabic">Arabic</option>
                            <option value="Armenian">Armenian</option>
                            <option value="Basque">Basque</option>
                            <option value="Bengali">Bengali</option>
                            <option value="Bulgarian">Bulgarian</option>
                            <option value="Catalan">Catalan</option>
                            <option value="Cambodian">Cambodian</option>
                            <option value="Croatian">Croatian</option>
                            <option value="Czech">Czech</option>
                            <option value="Danish">Danish</option>
                            <option value="Estonian">Estonian</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finnish">Finnish</option>
                            <option value="Georgian">Georgian</option>
                            <option value="Greek">Greek</option>
                            <option value="Gujarati">Gujarati</option>
                            <option value="Hebrew">Hebrew</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Hungarian">Hungarian</option>
                            <option value="Icelandic">Icelandic</option>
                            <option value="Indonesian">Indonesian</option>
                            <option value="Irish">Irish</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Javanese">Javanese</option>
                            <option value="Korean">Korean</option>
                            <option value="Latin">Latin</option>
                            <option value="Latvian">Latvian</option>
                            <option value="Lithuanian">Lithuanian</option>
                            <option value="Macedonian">Macedonian</option>
                            <option value="Malay">Malay</option>
                            <option value="Malayalam">Malayalam</option>
                            <option value="Maltese">Maltese</option>
                            <option value="Maori">Maori</option>
                            <option value="Marathi">Marathi</option>
                            <option value="Mongolian">Mongolian</option>
                            <option value="Nepali">Nepali</option>
                            <option value="Norwegian">Norwegian</option>
                            <option value="Persian">Persian</option>
                            <option value="Polish">Polish</option>
                            <option value="Punjabi">Punjabi</option>
                            <option value="Quechua">Quechua</option>
                            <option value="Romanian">Romanian</option>
                            <option value="Russian">Russian</option>
                            <option value="Samoan">Samoan</option>
                            <option value="Serbian">Serbian</option>
                            <option value="Slovak">Slovak</option>
                            <option value="Slovenian">Slovenian</option>
                            <option value="Swahili">Swahili</option>
                            <option value="Swedish ">Swedish </option>
                            <option value="Tamil">Tamil</option>
                            <option value="Tatar">Tatar</option>
                            <option value="Telugu">Telugu</option>
                            <option value="Thai">Thai</option>
                            <option value="Tibetan">Tibetan</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Turkish">Turkish</option>
                            <option value="Ukrainian">Ukrainian</option>
                            <option value="Urdu">Urdu</option>
                            <option value="Uzbek">Uzbek</option>
                            <option value="Vietnamese">Vietnamese</option>
                            <option value="Welsh">Welsh</option>
                            <option value="Xhosa">Xhosa</option>
                        </ select>
                    </div>
                    <div className="chat-settings-btns">
                        <button className="chat-settings-save-button" onClick={() => applySettings()}>Apply</button>
                        <button className="chat-settings-cancel-button" onClick={() => setShowChatSettings(false)}>Cancel</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

function PersonaCard({ setChatPersona, setOldChat, item, showDragDots, setShowCharacterList, isDarkMode, editMode, selectedItems, setSelectedItems, isCustomPrompt, arrayItems, setArrayItems, setFirstSix, windowSize, setShowAddTask}) {
    const [selectedImg, setSelectedImg] = useState(isDarkMode ? characterIconGray : characterIcon);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [editTask, setEditTask] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        if (confirmDelete) {
            setTimeout(() => {
                setConfirmDelete(false)
            }, 2000)
        }
    }, [confirmDelete])

    useEffect(() => {
        if (showDragDots === true) {
            setSelectedImg(isDarkMode ? dragDotsIconsWhite : dragDotsIconDark)
        } else {
            setSelectedImg(isDarkMode ? characterIcon : characterIconGray)
        }
        
    }, [isDarkMode]);

    useEffect(() => {
        if (selectedItems !== undefined) {
            if (deleteClicked === true) {
                setSelectedItems(selectedItems => [...selectedItems, item.id]);
            } else if (deleteClicked === false) {
                setSelectedItems(selectedItems => selectedItems.filter(id => id !== item.id));
            }
        }
    }, [deleteClicked]);

    function handleDeleteItem(itemId) {
        // Find the index of the item to be deleted in the arrayItems
        const itemIndex = arrayItems.findIndex(item => item.id === itemId);
    
        if (itemIndex !== -1) {
            // Create a new array without the item to be deleted
            const updatedArrayItems = [...arrayItems.slice(0, itemIndex), ...arrayItems.slice(itemIndex + 1)];
    
            setArrayItems(updatedArrayItems);
            setFirstSix((windowSize < 810) ? updatedArrayItems.slice(0, 4) : updatedArrayItems.slice(0, 6));
            localStorage.setItem('arrayItems', JSON.stringify(updatedArrayItems));
        }
    }

    return (
        <>
            <div onClick={() => { 
                if (editMode === true) {
                    setDeleteClicked(!deleteClicked)
                } else {
                    setOldChat(false) 
                    setChatPersona(item)
                    setShowCharacterList(false) 
                }} 
                }
                className={`persona-card ${deleteClicked ? 'selected-task' : ''} ${editMode ? 'persona-card-edit' : ''}`}
                key={item.id}
                // onMouseEnter={() => setTimeout(() => handleMouseEnter(), 40)}
                // onMouseLeave={() => setTimeout(() => handleMouseLeave(), 40)}
                >
                    <div className="person-card-text">
                        <h3 className="persona-name"><img src={selectedImg}  className="character-icon-card" />{item.name}</h3>
                        <p className="persona-description">{item.description}</p>
                    </div>
                {isCustomPrompt && 
                    <div className="persona-action-btns-container">
                        <div className="persona-action-btn persona-action-btn-edit" onClick={(event) => {
                            event.stopPropagation()
                            setEditTask(true) }}>Edit</div>
                        {confirmDelete ? <div className="persona-action-btn persona-action-btn-delete" onClick={(event) => {
                            event.stopPropagation() 
                            handleDeleteItem(item.id)
                        }}>Sure?</div> :
                        <div className="persona-action-btn persona-action-btn-delete" onClick={(event) => {
                            event.stopPropagation() 
                            setConfirmDelete(true) 
                        }}>Delete</div> }
                        
                    </div>
                }
            </div>
            {editTask && <AddTask setEditTask={setEditTask} item={item} editTask={editTask} isDarkMode={isDarkMode} arrayItems={arrayItems} setArrayItems={setArrayItems} setFirstSix={setFirstSix} windowSize={windowSize} setShowAddTask={setShowAddTask} setShowCharacterList={setShowCharacterList} />}
                
        </>

    )
}

function AddTask({isDarkMode, arrayItems, setArrayItems, setFirstSix, windowSize, setShowAddTask, setShowCharacterList, item, isCustomPrompt, setEditTask, editTask}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instruction, setInstruction] = useState("");
    const [firstQuestion, setFirstQuestion] = useState("");
    const [iconSrc, setIconSrc] = useState(characterIconGray);
    
    function closeAddTask(event) {
        event.preventDefault()
        if (event.target === event.currentTarget && editTask === false) {
            setShowAddTask(false)
        } else if (event.target === event.currentTarget && editTask === true) {
            setEditTask(false)
        }
    }

    function handleCancelClick() {
        if (editTask === true) {
            setEditTask(false)
        } else {
        setShowAddTask(false)
        setShowCharacterList(true)
        }
    }

    useEffect(() => {
        if (editTask === true) {
            setTitle(item.name)
            setDescription(item.description)
            setInstruction(item.systemMessage.content)
            setFirstQuestion(item.firstQuestion)
        }
    }, [])

    function handleAddTaskClick() {
        if (editTask) {
            // Find the index of the task to be updated in the arrayItems
            const taskIndex = arrayItems.findIndex(task => task.id === item.id);
    
            if (taskIndex !== -1) {
                // Create a new task object with the updated values
                const updatedTask = {
                    name: title,
                    id: item.id,
                    description: description,
                    firstQuestion: firstQuestion,
                    systemMessage: {
                        role: "system",
                        content: instruction,
                    },
                    isCustomPrompt: true
                };
    
                // Update the task in the arrayItems
                const updatedArrayItems = [...arrayItems];
                updatedArrayItems[taskIndex] = updatedTask;
    
                setArrayItems(updatedArrayItems);
                setFirstSix((windowSize < 810) ? updatedArrayItems.slice(0, 4) : updatedArrayItems.slice(0, 6));
                localStorage.setItem('arrayItems', JSON.stringify(updatedArrayItems));
                setEditTask(false)
            }
        } else {
            // Create a new task object with the input values
            const newTask = {
                name: title,
                id: Date.now().toString(), // Use a timestamp as the ID
                description: description,
                firstQuestion: firstQuestion,
                systemMessage: {
                    role: "system",
                    content: instruction,
                },
                isCustomPrompt: true
            };
    
            const newArrayItems = [newTask, ...arrayItems];
    
            setArrayItems(newArrayItems);
            setFirstSix((windowSize < 810) ? newArrayItems.slice(0, 4) : newArrayItems.slice(0, 6));
            localStorage.setItem('arrayItems', JSON.stringify(newArrayItems));
            setShowAddTask(false);
        }
    }

    useEffect(() => {
        setIconSrc(isDarkMode ? characterIcon : characterIconGray);
    }, [isDarkMode]);

    return (
        <motion.div
            key="add-task-container-animation"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.20, ease: "easeIn" }}
            className={`add-task-container ${editTask && "add-task-container-edit-mode"} `}
            onClick={closeAddTask}
        >
            <motion.div
                key="add-task-card-animation"
                initial={{ y: "10%", opacity: 0, scale: 0.8 }}
                animate={{ y: "0%", opacity: 1, scale: 1 }}
                exit={{ y: "10%", opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.20, ease: "easeIn" }}
                className={isDarkMode ? "add-task-card add-task-card-dark" : "add-task-card"}
            >
                <div className="add-task-header-container">
                    <h3 className="add-task-header-title">{editTask ? "Edit Task" : "Add a Task"}</h3>
                    <div className="add-task-example-card">
                        <div className="add-task-example-card-icon-title">
                            <img className="add-task-example-card-icon" src={iconSrc} />
                            <h3 className="add-task-example-card-title">{title === "" ? "Your Task Title": title}</h3>
                        </div>
                        <p className="add-task-example-card-description">{description === "" ? "Your task Description" : description}</p>
                    </div>
                </div>
                <div className="add-task-example-input-container">
                    <label className="add-task-example-input-label">Title:</label>
                    <input className="add-task-example-input-input" type="text" placeholder="E.g., Product Manager" value={title} onChange={(event) => setTitle(event.target.value)} />
                    <label className="add-task-example-input-label">Description (optional):</label>
                    <textarea className="add-task-example-input-input" type="text" placeholder="E.g., I'll write a Product Requirements Document using specific headers, such as problem statement, goals and objectives, etc." value={description} onChange={(event) => setDescription(event.target.value)} />
                    <label className="add-task-example-input-label">Instruction (prompt):</label>
                    <textarea className="add-task-example-input-input add-task-prompt-input" type="text" placeholder="E.g., Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these headers: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks" value={instruction} onChange={(event) => setInstruction(event.target.value)} />               
                    <label className="add-task-example-input-label">First Question:</label>
                    <textarea className="add-task-example-input-input add-task-first-question" type="text" placeholder="E.g., Start by giving me a subject" value={firstQuestion} onChange={(event) => setFirstQuestion(event.target.value)} />
                </div>
                <div className="add-task-btns-container">
                    <button className="add-task-btns-btn add-task-button" onClick={() => handleAddTaskClick()}>{editTask ? "+ Edit Task" : "+ Add Task"}</button>
                    <button className="add-task-btns-btn cancel-task-button" onClick={() => handleCancelClick()}>Cancel</button>    
                </div>
                </motion.div>
            </motion.div>
    )
}

function ResetTaskListPopUp({setShowResetConfirmation, resetTaskList, isDarkMode}) {
    function closeResetPopUp(event) {
        event.preventDefault()
        if (event.target === event.currentTarget) {
            setShowResetConfirmation(false)
        }
    }

    function handleResetClick() {
        setShowResetConfirmation(false)
        resetTaskList()
    }

    return (
        <motion.div
            key="chat-settings-container-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.20, ease: "linear" }}
            className="character-list-full-reset-container"
            onClick={closeResetPopUp}
        >
            <motion.div
                key="chat-settings-card-animation"
                initial={{ y: "10%", opacity: 0, scale: 1 }}
                animate={{ y: "0%", opacity: 1, scale: 1 }}
                exit={{ y: "10%", opacity: 0, scale: 1 }}
                transition={{ duration: 0.20, ease: "linear" }}
                className={isDarkMode ? "character-list-full-reset-card character-list-full-reset-card-dark" : "character-list-full-reset-card"}
            >
                <div className="reset-card-text-container">
                    <h3 className="reset-card-text-title">Reset Task List</h3>
                    <p className="reset-card-text-text">Warning: Are you absolutely certain you want to reset the Task List? Please be aware that by clicking the "Reset" button, all of your custom Tasks will be permanently erased. This action cannot be undone, so please double-check before proceeding. </p> 
                </div>
                <div className="character-list-full-card-button-container">
                    <button className="character-list-close-btn" onClick={() => setShowResetConfirmation(false)}>Cancel</button>
                    <button className="character-list-reset-list-btn" onClick={() => handleResetClick()}>Reset Tasks</button>
                </div>
            </ motion.div>
        </motion.div>
    )
}


function EditList({isDarkMode, arrayItems, setArrayItems, setFirstSix, windowSize, setShowAddTask, setShowCharacterList, setShowEditList}) {
    const [selectedItems, setSelectedItems] = useState([])
    const [showResetConfirmation, setShowResetConfirmation] = useState(false)

    function closeEditList(event) {
        event.preventDefault()
        if (event.target === event.currentTarget) {
            setShowEditList(false)
            setShowCharacterList(true)
        }
    }

    function handleCancelClick() {
        setShowEditList(false)
        setShowCharacterList(true)
    }

    function handleDeleteClick() {
        setShowEditList(false)
        const filteredItems = removeItems(selectedItems, arrayItems);
        setArrayItems(filteredItems);
        setFirstSix((windowSize < 810) ? filteredItems.slice(0, 4) : filteredItems.slice(0, 6));
        localStorage.setItem('arrayItems', JSON.stringify(filteredItems));
    }

    function removeItems(selectedItems, arrayItems) {
        return arrayItems.filter(function(item) {
            return !selectedItems.includes(item.id);
        });
    }

    function resetTaskList() {
        setArrayItems(arrayItemsPrompts);
        setShowEditList(false)
        setShowCharacterList(true)
    }

    return (
        <motion.div
            key="character-list-full-edit-container-animation"
            initial={{ opacity: 0.90 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "linear" }}
            className="character-list-full-container"
            onClick={closeEditList}
        >
            <motion.div
                key="character-list-full-card-edit-animation"
                initial={{ y: "100%", opacity: 1, scale: 1 }}
                animate={{ y: "0%", opacity: 1, scale: 1 }}
                exit={{ y: "100%", opacity: 1, scale: 1 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="character-list-full-card"
            >
                <div className="character-list-full-card-add-task"> 
                    <h3 className="character-list-full-card-title">Chose Tasks to Delete</h3>
                    <button className="character-list-full-card-delete-btn " onClick={() => handleDeleteClick()}>Delete Selected</button>
                </div>
                <div className="character-list-full">
                    {arrayItems.map((item) => {
                        return (
                            <div className="character-list-full__div">
                                <PersonaCard key={item.id} editMode={true} item={item} isDarkMode={isDarkMode} setSelectedItems={setSelectedItems} selectedItems={selectedItems} setShowCharacterList={setShowCharacterList}/>
                            </div>
                        )
                    })}
                </div>
                <div className="character-list-full-card-button-container">
                    <button className="character-list-close-btn" onClick={() => handleCancelClick()}>Cancel</button>
                    <button className="character-list-reset-list-btn" onClick={() => setShowResetConfirmation(true)}>Reset Tasks</button>
                </div>
            </motion.div>
            {showResetConfirmation && <ResetTaskListPopUp setShowResetConfirmation={setShowResetConfirmation} resetTaskList={resetTaskList} isDarkMode={isDarkMode} />}
        </motion.div>
    )
}


function CharacterList({arrayItems, setArrayItems, setFirstSix, windowSize, setChatPersona, setShowAddTask, setShowCharacterList, setShowEditList, setOldChat, isDarkMode}) {
    const [searchTerm, setSearchTerm] = useState('');

    const data = JSON.parse(localStorage.getItem('arrayItems')) || arrayItems;

    useEffect(() => {
        // Filter the array based on the search term
        const filteredItems = data.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setArrayItems(filteredItems);
    }, [searchTerm]);

    function handleSearch(event) {
        setSearchTerm(event.target.value);
    }

    function closeCharacterList(event) {
        event.preventDefault()
        if (event.target === event.currentTarget) {
            setShowCharacterList(false)
        }
    }
    
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
    
        const items = Array.from(arrayItems);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        setArrayItems(items);
        setFirstSix((windowSize < 810) ? items.slice(0, 4) : items.slice(0, 6));
        localStorage.setItem('arrayItems', JSON.stringify(items));
    };

    function handleAddTaskClick() {
        setShowAddTask(true)
        setShowCharacterList(false)
    }

    function handleEditListClick() {
        setShowEditList(true)
        setShowCharacterList(false)
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <motion.div
                key="character-list-full-container-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: "linear" }}
                className="character-list-full-container"
                onClick={closeCharacterList}
            >
                <motion.div
                    key="character-list-full-card-animation"
                    initial={{ y: "100%", opacity: 1, scale: 1 }}
                    animate={{ y: "0%", opacity: 1, scale: 1 }}
                    exit={{ y: "100%", opacity: 1, scale: 1 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="character-list-full-card"
                >
                    <div className="character-list-full-card-header-container">
                        <h3 className="character-list-full-card-title">Select a Task</h3>
                        <div className="character-list-full-card-add-task"> 
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Search a task..."
                                className="character-list-full-card-search"
                            />
                            <button className="character-list-full-card-add-task-btn" onClick={() => handleAddTaskClick()}>Add a Task</button>
                        </div>
                    </div>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="character-list-full">
                                {arrayItems.map((item, index) => {
                                    return (
                                    <Draggable key={item.id} draggableId={item.id} index={index} className="draggable-task-element">
                                        {(provided) => (
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="character-list-full__div">
                                            <PersonaCard  key={item.id} setChatPersona={setChatPersona} setOldChat={setOldChat} item={item} showDragDots={true} setShowCharacterList={setShowCharacterList} isDarkMode={isDarkMode} isCustomPrompt={item.isCustomPrompt} arrayItems={arrayItems} setArrayItems={setArrayItems} setFirstSix={setFirstSix} />
                                        </div>
                                    )}
                                    </Draggable>
                                )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div className="character-list-full-card-button-container">
                        <button className="character-list-close-btn" onClick={() => setShowCharacterList(false)}>Close</button>
                        <button className="character-list-edit-list-btn" onClick={() => handleEditListClick()}>Edit List</button>
                    </div>
                </motion.div>
            </motion.div>
        </DragDropContext>
    )
    }



export default function OptionSelection({setIsApiTokenPopupOpen, apiTokens, isApiTokenPopupOpen, arrayItems, setArrayItems, setChatPersona, setOldChat, windowSize, isDarkMode, apiModel,
    apiTemperature, apiStream, setApiModel, setApiTemperature, setApiStream, initialApiInstruction, setInitialApiInstruction, setInitialInstruction, initialInstruction, setLanguageOutput, languageOutput}) {
    const [showCharacterList, setShowCharacterList] = useState(false)
    const [firstSix, setFirstSix] = useState(arrayItems.slice(0, 6))
    const [showChatSettings, setShowChatSettings] = useState(false)
    const [showAddTask, setShowAddTask] = useState(false)
    const [showEditList, setShowEditList] = useState(false)

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
            description: "I'm the same ChatGpt you know from OpenAI",
            firstQuestion: "Ask me a question",
            systemMessage: {
                role: "system",
                content: initialInstruction
            }
        })
        setOldChat(false)
    }


    return ( 
        <>
        <div className={`option-selection ${isDarkMode && 'option-selection-dark'}`}>
            <h1 className="title">TaskBuddy</h1>
            <p className="tag-line">An Easier way to complete your tasks</p>
            <p className="select-a-task">Select a Task</p>
            <div className='persona-card-container'>
                {firstSix.map((item) => {
                    return (
                        <div className="character-list-full__div" key={item.id}>
                            <PersonaCard key={item.id} setChatPersona={setChatPersona} setOldChat={setOldChat} item={item} isDarkMode={isDarkMode} setShowCharacterList={setShowCharacterList}/>
                        </div>
                    )
                })}
            </div>
            <div className="option-btns-container">
                <button onClick={() => setShowChatSettings(true)} className="action-btn chat-settings-btn-home"><img className="character-icon settings-icon" src={settingsIcon} /><span className="settings-btn-text">Chat Settings</span></button>
                <button onClick={() => setShowCharacterList(true)} className="action-btn show-more-btn"><img className="character-icon" src={characterIcon} />More Tasks</button>
                <button onClick={() => startNewChat()} className="action-btn new-chat-btn-home"><img className="character-icon new-chat-icon" src={plusIcon} />New Chat</button>
            </div>
            <AnimatePresence> 
                {showCharacterList && (
                        <CharacterList arrayItems={arrayItems} setShowEditList={setShowEditList} setArrayItems={setArrayItems} setFirstSix={setFirstSix} setShowAddTask={setShowAddTask} windowSize={windowSize} setChatPersona={setChatPersona} showCharacterList={showCharacterList} setShowCharacterList={setShowCharacterList} setOldChat={setOldChat} isDarkMode={isDarkMode}/>
                )}
                {showChatSettings && <ChatSettings setShowChatSettings={setShowChatSettings} setLanguageOutput={setLanguageOutput} languageOutput={languageOutput} isDarkMode={isDarkMode} apiModel={apiModel} apiTemperature={apiTemperature} 
                                        apiStream={apiStream} setApiModel={setApiModel} setApiTemperature={setApiTemperature} setApiStream={setApiStream} setInitialApiInstruction={setInitialApiInstruction}
                                        setInitialInstruction={setInitialInstruction} initialInstruction={initialInstruction} />}
                {showAddTask && <AddTask isDarkMode={isDarkMode} arrayItems={arrayItems} setArrayItems={setArrayItems} setFirstSix={setFirstSix} windowSize={windowSize} setShowAddTask={setShowAddTask} setShowCharacterList={setShowCharacterList}/>}
                {showEditList && <EditList setShowEditList={setShowEditList} isDarkMode={isDarkMode} arrayItems={arrayItems} setArrayItems={setArrayItems} setFirstSix={setFirstSix} windowSize={windowSize} setShowAddTask={setShowAddTask} setShowCharacterList={setShowCharacterList}/>}
                {/* {isApiTokenPopupOpen && <FreeTrialRemaining isDarkMode={isDarkMode} apiTokens={apiTokens} setIsApiTokenPopupOpen={setIsApiTokenPopupOpen} />} */}
            </AnimatePresence>
            </div>
            
        </>
    );
}
