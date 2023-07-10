import { useState } from 'react';
import './App.css';
import SendIcon from '@mui/icons-material/Send';
import Typewriter from 'typewriter-effect';
import axios from 'axios';

function App() {

  const [question, setQuestion] = useState("")
  const [tempQuestion, setTempQuestion] = useState("")
  const [questionView, setQuestionView] = useState(false)
  const [answer, setAnswer] =  useState("")
  const [answerView, setAnswerView] =  useState(false)

  const userMessage_Func = (e) => {
     setTempQuestion(e.target.value)
  }

  const test = (answer)=>{
      console.log(answer)
      return answer
  }

  const sendMessage_Func = async() => {
    setQuestionView(false)
    setQuestionView(true)
    setAnswerView(false)
    setQuestion(tempQuestion)

    const url = "https://chatai-vhp5.onrender.com/chatAi"
    if(tempQuestion==""){
      setAnswer("Hey dude... Please enter anything...")
      setTimeout(() => {
        setAnswerView(true)
      }, 3000);
    }
    else{
      const response = await axios.get(url,{params: {question: tempQuestion}}).then(res=>{
        setAnswer(res.data.answer)
        setTimeout(() => {
          setAnswerView(true)
        }, 2000);
      }).catch(
        function (error) {
          console.log('Show error notification! -> ',error)
        })
      }

    setTempQuestion("")
     
}



  return (

    <>
    <div className="header">
      <h3 className='headingText'>WelCome To ChatAI</h3>
    </div> 
    <div className="content"> 
      {questionView && <p><b>
        {/* <Typewriter
          onInit={(typewriter) => {
              typewriter.typeString("Qn : " + question)
                .callFunction(() => {
                  console.log('String typed out!');
                })
                .pauseFor(2500)
                .start();
            }}
        />  */}
       Qn : {question} </b></p>}
      
      {!answerView&& 
        <div class="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      }
      {/* {answerView && <p className="answer typing-effect"> <span style={{color:"white"}}><b>Ans : </b></span> {answer} </p> } */}

      {answerView&&
      <div className="answer">
          <Typewriter
          options={{
            delay: 30
          }}
             onInit={(typewriter) => {
              typewriter
                  .typeString("<span style={{color: 'white'}}><b>Ans : </b></span>" + answer)
                  .start();
             }}
             
           />
      </div>
      }

      
    </div>
    <div className="footer"> 
       <input className='inputField' onChange={userMessage_Func} value={tempQuestion} placeholder='Enter Your Question'/>
       <SendIcon className='sendIcon' onClick={sendMessage_Func} fontSize='small'/>
    </div>
    </>
  );
}

export default App;
