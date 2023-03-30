import { useEffect, useState, useRef } from 'react'
import './App.css'
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator  } from '@chatscope/chat-ui-kit-react';
import { arrayItems } from './Prompts'
import OptionSelection from './components/OptionSelection'
import SideMenu from './components/SideMenu';
import TopBar from './components/TopBar';
import stopIcon from "./assets/icons/stop-icon-white.png"

const API_KEY = import.meta.env.VITE_API_KEY


// scrollbar should be moved to side of screen
// make input box background cover bottom of screen
// make a stop button
// set when api is responding cant send second message
// make input box keep width when send button is away
// when to many chat history, make it scrollable
// add a feedback screen
// style menu settings
// style the home page
// style scroll bar in chat history
// change chat history list to Components list
// add edit button to old chat title's
// fix confirm and cancel chat title edit buttons
// fix delete old chat button pushing menu wider

// fixed pasting text into input box
// improve prompts info in chat
// style select characters popup
// search for good prompts
// test prompts

// fixed text input grow when text is bigger than input box  ~ 1 hour
// fix when text is copied into input box  ~ 5 minutes
// added extra colors to option-selection ~ 15 minutes
// add scroll to character popup ~ 1 minute
// add good description to all prompts ~ 45 minutes
// add on paste to input box ~ 20 minutes
// fix when chat is loading and switching to other chat it keeps loading ~ 5 minutes
// add animations to cards ~ 5 minutes
// on hover change character icon to white ~ 30 minutes
// add different color icons on hover to old chat ~ 30 minutes
// fix when old chat is true that focus went to right input box ~ 40 minutes
// added old chat background color is changed when selected ~ 50 minutes
// add animation when more characters screen is opened ~ 20 minutes
// add animation when feedback screen is opened ~ 5 minutes
// when chat is loaded scroll to bottom ~ 30 minutes

// made mobile menu ~ 1 hour
// made mobile menu fade in ~ 30 minutes
// made mobile friendly ~ 1 hour
// add new chat button ~ 20 minutes

// woensdag
// make hamburger menu option always visible  ~ 15 minutes
// add animation to menu desktop open ~ 10 minutes
// add darker hamburger icon on hover ~ 10 minutes
// fixed on hover effect new chat button ~ 5 minutes
// fixed home screen height chat box ~ 5 minutes
// change text from character to task  ~ 10 minutes
// add dark mode to app ~ 80 minutes

// donderdag
// add dark mode color to task cards ~ 20 minutes
// save dark mode in the local storage, ask chat gpt how to do this ~ 5 minutes
// trying to add animation to side menu ~ 35 minutes
// change placeholder text of input box on dark mode ~ 10 minutes
// fixed some dark mode bugs ~ 15 minutes

// change text of tasks



// add stop button functionality
// add a FAQ screen
// add a privacy policy screen
// add a terms of service screen
// add dark mode
// add favorite button to old chats
// add option to change model
// add settings screen
// add not selecting text when clicking on buttons
// add not selecting text to text in top bar
// add a copy to clipboard button to chats



// big features

// add token count to user
// add settings screen to change chat behavior
// make custom titles for old chats
// keep text input when changing between chats
// add search bar too tasks list











function App() {
  const [typingStatus, setTypingStatus] = useState(false)
  const [chatPersona, setChatPersona] = useState({
    name: 'ChatGpt',
    id: "chatgpt",
    description: "Act as ChatGpt",
    firstQuestion: "Ask me a question",
    systemMessage: {
        role: "system",
        content: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.`
    }
  })
  const [messages, setMessages] = useState([
    {
      message: `Hello I'm a ${chatPersona.name} `,
      sender: "ChatGpt"
    },{
      message: `${chatPersona.description}`,
      sender: "ChatGpt"
    },{
      message: `${chatPersona.firstQuestion}`,
      sender: "ChatGpt"
    }
  ])
  const [chatId, setChatId] = useState()
  const [oldChat, setOldChat] = useState(false)
  const controller = new AbortController();
  const signal = controller.signal;
  const inputTxt = useRef(null)
  const [inputValue, setInputValue ] = useState(""); 
  const [clickedId, setClickedId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });


  function getRandomNumber() { 
    return Math.floor(100000 + Math.random() * 90000000)
  }

  function scrollToBottom() {
    const bottomChat = document.querySelector(".cs-message-list__scroll-to")
    setTimeout(() => {bottomChat.scrollIntoView({ behavior: "smooth" })}, 100)
    setClickedId(chatId)
  }


  // Generates a new chat id on page load
  useEffect(() =>  {
    if (oldChat === false) {
      setChatId(`CHAT_${getRandomNumber()}`)
    }
    // Checks if dark mode is enabled in local storage
    const storedDarkMode = localStorage.getItem('dark-mode');
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode);
    }
  }, [])

  // Sets the initial message when a new chat persona is selected, and generates a new chat id
  useEffect(() => {
    if (oldChat === false) {
      setMessages([
        {
          message: `Hello I'm a ${chatPersona.name} `,
          sender: "ChatGpt"
        },{
          message: `${chatPersona.description}`,
          sender: "ChatGpt"
        },{
          message: `${chatPersona.firstQuestion}`,
          sender: "ChatGpt"
        }
      ])
      setChatId(`CHAT_${getRandomNumber()}`)
    }
    scrollToBottom()
    setTypingStatus(false)
  }, [chatPersona])

  // Saves the chat to local storage
  useEffect(() => {
    if (messages.length > 3) {
      scrollToBottom()
      inputTxt.current.focus()
      localStorage.setItem(`${chatId}`, JSON.stringify({
        persona: chatPersona,
        chatId: chatId,
        messages: messages
      }))
    }
  }, [messages])

  // Handle stop button when api is thinking
  function handleStop() {
    controller.abort()
    setTypingStatus(false)
  }
  
  // Handles the sending of messages to openai api
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
  }
    const newMessages = [...messages, newMessage]

    setMessages(newMessages)
    setTypingStatus(true)
    await processMessageToChatGPT(newMessages)
  }

  // Sends the message to the openai api, and sets the response to the chat
  async function processMessageToChatGPT(chatMessages) {

    let apiMessages = chatMessages.map((messageObject) => {
      let role = ""
      if (messageObject.sender === "ChatGpt") {
        role = "assistant"
      } else {
        role = "user"
      }
      return { role: role, content: messageObject.message }
    })

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        chatPersona.systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody),
      signal: controller.signal
    }).then((data) => {
        return data.json()
    }).then((data) => {
      setMessages([
        ...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGpt",
        }
      ])
      setTypingStatus(false)
    })
  }
  
  return (
    <div className={`app ${isDarkMode && 'app-dark'}`}>
      <SideMenu setChatPersona={setChatPersona} messages={messages} setMessages={setMessages} setOldChat={setOldChat} setChatId={setChatId} clickedId={clickedId} setClickedId={setClickedId} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} windowSize={windowSize} setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>
      <div className="top-and-main">
        <TopBar chatPersona={chatPersona} windowSize={windowSize} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} isDarkMode={isDarkMode} />
        <div className="main-section">
          <OptionSelection arrayItems={arrayItems} setChatPersona={setChatPersona} setOldChat={setOldChat} windowSize={windowSize} isDarkMode={isDarkMode} />
          <div className={`chat-box`}>
            <MainContainer style={{border: "none", overflow: "visible"}}>
              <ChatContainer >
                <MessageList
                  style={{overflow: "visible !important"}}
                  scrollBehavior='smooth'
                  typingIndicator={typingStatus ? <TypingIndicator content="ChatGpt is typing..." /> : null}
                >
                  {messages.map((message, i) => {
                    return <Message key={i} model={message} />
                  })}
                </MessageList>
                <MessageInput fancyScroll={false} ref={inputTxt} placeholder="Type message here" disabled={typingStatus} sendButton={!typingStatus} 
                  onSend={() => {
                    handleSend(inputValue) 
                    setInputValue("") }} 
                  attachButton={false} 
                  onChange={(val) => setInputValue(val)} 
                  value={inputValue} 
                  onPaste={(evt) => { evt.preventDefault(); document.execCommand('insertText', false, evt.clipboardData.getData("text")); }}
                  />
              </ChatContainer>
            </MainContainer>
          </div>
          {/* {typingStatus && 
          <div className="chat-action-btns">
            <button className="stop-chat" onClick={() => handleStop()}><img className="stop-icon" src={stopIcon} />Stop</button>
          </div>
          } */}
        </div>
        
      </div>
    </div>
  )
}

export default App
