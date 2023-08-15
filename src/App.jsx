import { useEffect, useState, useRef } from 'react'
import './App.css'
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator  } from '@chatscope/chat-ui-kit-react';
import { arrayItemsPrompts } from './Prompts'
import OptionSelection from './components/OptionSelection'
import SideMenu from './components/SideMenu';
import TopBar from './components/TopBar';
import stopIcon from "/assets/icons/stop-icon-white.png"
import copyIcon from "/assets/icons/copy-icon-gray.png"
import { motion } from 'framer-motion';

const API_KEY = import.meta.env.VITE_API_KEY


///////////// priority //////////////////////

// fix drag and drop of tasks bug


// finish popup screen of 50% and 10% left of free trial

// make a popup screen when api has error


// add a user limit of tokens
// add premium subscription



// add google analytics when there is a url?


// add a FAQ screen
// add a privacy policy screen
// add a terms of service screen
// add not selecting text when clicking on buttons
// add not selecting text to text in top bar














function App() {
  const [typingStatus, setTypingStatus] = useState(false)
  const [chatPersona, setChatPersona] = useState({
    name: 'ChatGpt',
    id: "chatgpt",
    description: "I'm the same ChatGpt you know from OpenAI",
    firstQuestion: "Ask me a question",
    systemMessage: {
        role: "system",
        content: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.`
    }
  })
  const [messages, setMessages] = useState([
    {
      message: `Hello, I'm ${chatPersona.name} `,
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
  const inputTxt = useRef(null)
  const [inputValue, setInputValue ] = useState(""); 
  const [clickedId, setClickedId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(localStorage.getItem('menu-open') === 'true');
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('dark-mode') === null ? true : localStorage.getItem('dark-mode') === 'true');
  const [apiModel, setApiModel] = useState("gpt-3.5-turbo");
  const [apiTemperature, setApiTemperature] = useState(0.7);
  const [apiStream, setApiStream] = useState(false);
  const [initialApiInstruction, setInitialApiInstruction] = useState("You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.");
  const [initialInstruction, setInitialInstruction] = useState(initialApiInstruction)
  const [languageOutput, setLanguageOutput] = useState("Default");
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [apiTokens, setApiTokens] = useState(Number(localStorage.getItem('apiTokens')) || 0);
  const [arrayItems, setArrayItems] = useState(() =>
    JSON.parse(localStorage.getItem('arrayItems')) || arrayItemsPrompts
  );
  const [isApiTokenPopupOpen, setIsApiTokenPopupOpen] = useState(false);

  // saves the apiTokens to local storage
  useEffect(() => {
    const hasPopupHalfOpened = localStorage.getItem('isPopupOpenedHalf')
    const hasPopupTenOpened = localStorage.getItem('isPopupOpenedTen');

    localStorage.setItem('apiTokens', apiTokens);
    if (apiTokens > 10000 && hasPopupHalfOpened != 'true') {
      setIsApiTokenPopupOpen(true)
      localStorage.setItem('isPopupOpenedHalf', 'true');
    } else if (apiTokens > 18000 && hasPopupTenOpened != 'true') {
      setIsApiTokenPopupOpen(true)
      localStorage.setItem('isPopupOpenedTen', 'true');
    }
  }, [apiTokens]);

  // Loads the chat settings from local storage if it exists
  useEffect(() => {
    const modelSettings = localStorage.getItem("MODEL_SETTINGS");
    if (modelSettings) {
      const {
        apiModel: storedApiModel,
        apiTemperature: storedApiTemperature,
        apiStream: storedApiStream,
        initialApiInstruction: storedInitialApiInstruction,
        languageOutput: storedLanguageOutput
      } = JSON.parse(modelSettings);
      setApiModel(storedApiModel);
      setApiTemperature(storedApiTemperature);
      setApiStream(storedApiStream);
      setInitialApiInstruction(storedInitialApiInstruction);
      setLanguageOutput(storedLanguageOutput);
      setChatPersona({
        name: 'ChatGpt',
        id: "chatgpt",
        description: "I'm the same ChatGpt you know from OpenAI",
        firstQuestion: "Ask me a question",
        systemMessage: {
            role: "system",
            content: storedInitialApiInstruction
        }
      })
    }

    const hasTutorialBeenShown = localStorage.getItem("hasTutorialBeenShown");
      if (!hasTutorialBeenShown) {
          setIsTutorialOpen(true);
          localStorage.setItem("hasTutorialBeenShown", true);
      }
  }, []);

  
  useEffect(() => {
      const handleWindowResize = () => {
          setWindowSize(window.innerWidth);
      };
      window.addEventListener('resize', handleWindowResize);
      return () => {
          window.removeEventListener('resize', handleWindowResize);
      };
  });

  // Generates a random number for the chat id
  function getRandomNumber() { 
    return Math.floor(100000 + Math.random() * 90000000)
  }

  // Scrolls to the bottom of the chat
  function scrollToBottom() {
    const bottomChat = document.querySelector(".cs-message-list__scroll-to")
    setTimeout(() => {bottomChat.scrollIntoView({ behavior: "smooth" })}, 100)
    setClickedId(chatId)
  }


  useEffect(() => {
    const elements = document.querySelectorAll('.cs-message__content-wrapper');
    elements.forEach(element => {
      element.addEventListener('click', handleCopyToClipboard);
      element.addEventListener('mouseout', handleMouseOut);
    });
  
    return () => {
      elements.forEach(element => {
        element.removeEventListener('click', handleCopyToClipboard);
        element.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, [typingStatus]);

  // copies message to clipboard when clicked
  function handleCopyToClipboard(event) {
    const parentEl = event.target.closest('.cs-message__content-wrapper');
    const copiedTextEl = parentEl.querySelector('.copied-text');
  
    if (!copiedTextEl) {
      const textToCopy = parentEl.querySelector('.cs-message__html-content').textContent;
      navigator.clipboard.writeText(textToCopy);
  
      const copiedText = document.createElement('p');
      copiedText.classList.add('copied-text');
      copiedText.textContent = 'Copied!';
      parentEl.appendChild(copiedText);
  
      setTimeout(() => {
        const toRemove = parentEl.querySelector('.copied-text');
        if (toRemove) {
          toRemove.parentNode.removeChild(toRemove);
        }
      }, 1200); // adjust the delay time as needed
    }
  }
  
  function handleMouseOut(event) {
    const copiedText = event.target.closest('.cs-message__content-wrapper').querySelector('.copied-text');
    if (copiedText) {
      copiedText.parentNode.removeChild(copiedText);
    }

  }

  // Generates a new chat id on page load ///   removed because it was causing a bug when refreshing the page
  useEffect(() =>  {
    if (oldChat === false) {
      setChatId(`CHAT_${getRandomNumber()}`)
    }
    // Checks if dark mode is enabled in local storage
    // const storedDarkMode = localStorage.getItem('dark-mode');
    // if (storedDarkMode) {
    //   setIsDarkMode(storedDarkMode);
    // }
  }, [])

  // Sets the initial message when a new chat persona is selected, and generates a new chat id
  useEffect(() => {
    if (oldChat === false) {
      setMessages([
        {
          message: `Hello, I'm ${chatPersona.name} `,
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

    // changes the language of the chat output when a language is selected
    const languagePrompt = languageOutput === "Default" ? "" : `This text is typed in english but that doesn't mean you should respond in english. You have to always respond in ${languageOutput} please, never respond in another language!`
    const newApiPrompt = `${chatPersona.systemMessage.content} ${languagePrompt}`
    const apiMessageWithLanguage = { role: 'system', content: newApiPrompt}

    const apiRequestBody = {
      "model": apiModel,
      "temperature": apiTemperature,
      "messages": [
        apiMessageWithLanguage,
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
      setApiTokens( apiTokens + data.usage.total_tokens)
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
      <SideMenu apiTokens={apiTokens} setChatPersona={setChatPersona} messages={messages} setMessages={setMessages} setOldChat={setOldChat} setChatId={setChatId} clickedId={clickedId} 
                setClickedId={setClickedId} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} windowSize={windowSize} setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} initialInstruction={initialInstruction}/>
      <div className={`top-and-main ${isMenuOpen ? 'top-and-main-open' : 'top-and-main-closed'}`}>
        <TopBar chatPersona={chatPersona} windowSize={windowSize} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} isDarkMode={isDarkMode} isTutorialOpen={isTutorialOpen} setIsTutorialOpen={setIsTutorialOpen} />
        <div className="main-section">
          <OptionSelection apiTokens={apiTokens} setIsApiTokenPopupOpen={setIsApiTokenPopupOpen} isApiTokenPopupOpen={isApiTokenPopupOpen} arrayItems={arrayItems} setArrayItems={setArrayItems} setLanguageOutput={setLanguageOutput} languageOutput={languageOutput} setChatPersona={setChatPersona} setOldChat={setOldChat} windowSize={windowSize} isDarkMode={isDarkMode} apiModel={apiModel} 
          apiTemperature={apiTemperature} apiStream={apiStream} setApiModel={setApiModel} setApiTemperature={setApiTemperature} setApiStream={setApiStream} initialApiInstruction={initialApiInstruction} 
          setInitialApiInstruction={setInitialApiInstruction} setInitialInstruction={setInitialInstruction} initialInstruction={initialInstruction} />
          <div className={`chat-box`}>
            <MainContainer style={{border: "none", overflow: "visible"}}>
              <ChatContainer >
                <MessageList
                  style={{overflow: "visible !important"}}
                  scrollBehavior='smooth'
                  typingIndicator={typingStatus ? <TypingIndicator content="TaskBuddy is typing..." /> : null}
                >
                  {messages.map((message, i) => {
                    return <Message key={i} model={message} />
                  })}
                </MessageList>
                <MessageInput fancyScroll={false} ref={inputTxt} placeholder="Send a message..." disabled={typingStatus} sendButton={!typingStatus} 
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
        </div>
      </div>
    </div>
  )
}

export default App
