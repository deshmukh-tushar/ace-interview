import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";




interface InterviewQuestion {
  [key: string]: string;
}


// const url = "http://localhost:9595/bot/chat";
// const authToken = "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"
const url = process.env.REACT_APP_URL;
const authToken = process.env.REACT_APP_KEY;

const Interview = () => {
  const [field, setField] = useState<string | null>(localStorage.getItem("field"));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userResponses, setUserResponses] = useState<{ [key: string]: string }>({});
  const [interviewQuestions, setInterviewQuestions] = useState<string | null>(localStorage.getItem("interviewQuestions"));
  const [parsedInterviewQuestions, setParsedInterviewQuestions] = useState<InterviewQuestion>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const storedOverall = localStorage.getItem("overall") || "[]";

  const [overall, setOverall] = useState<{rating:String}[]>(JSON.parse(storedOverall));
  let questionsLength = Object.keys(parsedInterviewQuestions).length;


    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    let { transcript, browserSupportsSpeechRecognition,resetTranscript } = useSpeechRecognition();
    
    useEffect(()=>{
      setUserResponses((prevResponses) => ({ ...prevResponses, [`answer${currentQuestionIndex + 1}`]: transcript }));
    },[transcript])

  useEffect(() => {
    if (interviewQuestions !== null) {
      const parsedQuestions: InterviewQuestion = JSON.parse(interviewQuestions);
      setParsedInterviewQuestions(parsedQuestions);
    }
  }, [interviewQuestions]);



  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questionsLength) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    else {
      // displayFeedback();
      setIsLoading(true);
      fetchFeedback();
    }
    resetTranscript();

  // Start listening again for the new question
  startListening();
  };

  // const interviewFeedback = {
  //   question1: "Tell me about yourself.",
  //   answer1: "Veerangana",

  //   question2: "What are your strengths and weaknesses?",
  //   answer2: "strengths",

  //   question3: "Why do you want to work for our company?",
  //   answer3: "Biotech",

  //   question4:
  //     "Describe a challenging situation you faced at work and how you dealt with it.",
  //   answer4: "situation",
  //   question5: "Where do you see yourself in 5 years?",
  //   answer5: "Senior role",

  //   question6: "How do you handle pressure or stressful situations?",
  //   answer6: "time management",
  //   question7: "Do you have any questions for us?",
  //   answer7: "no",
  //   query:
  //     "I have provided object of questions and answer given by candidate, please review all the answers and provide me overall feedback of whole interview and not for each question rating out off 10 and also areas of improvement that candidate need give me in object format ",
  // };

  const handleResponseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    // Update the userResponses state array with the current response
    // setUserResponses((prevResponses) => {
    //   const updatedResponses = [...prevResponses];
    //   updatedResponses[currentQuestionIndex] = value;
    //   return updatedResponses;
    // });


    setUserResponses((prevResponses) => ({ ...prevResponses, [`answer${currentQuestionIndex + 1}`]: value }));
  };

  const fetchFeedback = async () => {
    // const url = "http://localhost:8080/bot/chat"; // Replace with your API endpoint
    // const authToken = "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"; // Replace with your actual authorization token


    // Convert the object to a string format using JSON.stringify()
    // const interviewFeedbackString = JSON.stringify(interviewFeedback);

    let quesAnsPair: { [key: string]: string } = {};

    for (let i = 0; i < questionsLength; i++) {
      quesAnsPair[`question${i+1}`] = parsedInterviewQuestions[`question${i+1}`]
      quesAnsPair[`answer${i+1}`] = userResponses[`answer${i+1}`]
    }

    quesAnsPair[`query`] = `I have provided object of questions and answer given by candidate, please review all the answers and provide me overall feedback of whole interview and not for each question rating out off 10 and rating should strict and also areas of improvement that candidate need give me in object format {
        "feedback": "overall feedback",
        "rating": "rating/10",
        "areasOfImprovement": "areasOfImprovement",
        "ConceptualUnderstanding":"score/10",
   "Fundamentals":"score/10",
     "CriticalThinking":"score/10"
      }`

    console.log(quesAnsPair);

    let quesAnsPairString = JSON.stringify(quesAnsPair);

    try {
      const response = await axios({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        params: {
          prompt: quesAnsPairString,
        },
      });

      console.log(response.data);



      if (response.data) {
        setIsLoading(false);

        localStorage.setItem("feedback", response.data.feedback);
        localStorage.setItem("rating", response.data.rating);
        localStorage.setItem("areasOfImprovement", response.data.areasOfImprovement);
        localStorage.setItem("ConceptualUnderstanding", response.data.ConceptualUnderstanding.split("/")[0])
        localStorage.setItem("Fundamentals",response.data.Fundamentals.split("/")[0])
        localStorage.setItem("CriticalThinking",response.data.CriticalThinking.split("/")[0])


        const addingToOverall = [...overall]
        addingToOverall.push({"rating":response.data.rating.split("/")[0]})
        localStorage.setItem("overall",JSON.stringify(addingToOverall))
        navigate("/feedback");
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

  // const displayFeedback = async () => {

  //     try {

  //         // let arrayOfPromptAndAnswer : Object[] = [];

  //         // for(let i=0; i<interviewQuestions.length; i++){
  //         //     let obj : QuestionAnswerInterface = {
  //         //         prompt: "",
  //         //         answer: ""
  //         //     };

  //         //     obj.prompt = interviewQuestions[i];
  //         //     obj.answer = userResponses[i];

  //         //     arrayOfPromptAndAnswer.push(obj);
  //         // }

  //         // console.log(arrayOfPromptAndAnswer);

  //         const res =

  //         console.log(res);
  //     }
  //     catch (error) {
  //         console.error(error);
  //     }
  // }
//   const fetchFeedback = async () => {
    
//     // const url = "http://localhost:8080/bot/chat"; // Replace with your API endpoint
//     // const authToken = "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"; // Replace with your actual authorization token


//     // Convert the object to a string format using JSON.stringify()
//     // const interviewFeedbackString = JSON.stringify(interviewFeedback);

//     let quesAnsPair: { [key: string]: string } = {};

//     for (let i = 0; i < questionsLength; i++) {
//       quesAnsPair[`question${i+1}`] = parsedInterviewQuestions[`question${i+1}`]
//       quesAnsPair[`answer${i+1}`] = userResponses[`answer${i+1}`]
//     }

//     const objForNode={
//         "Node.js Proficiency":"score out of 10",
//         "JavaScript Proficiency":"score out of 10",
//         "Node.js Ecosystem and Frameworks":"score out of 10"
//     }
//     const objForJava={
//         "Problem Solving and Algorithmic Thinking":"score out of 10",
//         "Object-Oriented Programming (OOP)":"score out of 10",
//         "Java Language Proficiency":"score out of 10"
//     }
//     const objForMERN={
//         "Full-Stack Proficiency":"score out of 10",
//         "Front-End Development":"score out of 10",
//         "Back-End Development:":"score out of 10"
//     }

//     quesAnsPair[`query`] = `I have provided object of questions and answer given by candidate, please review all the answers and give me feedback according this object i'm sending in query, the keys are the parameters and the values are how the feedback should be given, give me all of the response in object format {
//         "feedback": "overall feedback",
//         "rating": "rating/10",
//         "areasOfImprovement": "areasOfImprovement",
//         "Conceptual Understanding":"score/10",
//         "Fundamentals":"score/10",
//         "Critical Thinking":"score/10"
        
//       }`

//     console.log(quesAnsPair,"ya");
// let objToSend = field=== "MERN"? {...objForMERN}:field==="JAVA"?{...objForJava}:{...objForNode}
//     let quesAnsPairString = JSON.stringify({...objToSend,...quesAnsPair});

//     try {
//       const response = await axios({
//         method: "GET",
//         url: url,
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           "Content-Type": "application/json"
//         },
//         params: {
//           prompt: quesAnsPairString,
//         },
//       });

//       console.log(response.data);



//       if (response.data) {
//         setIsLoading(false);

//         localStorage.setItem("feedback", response.data.feedback);
//         localStorage.setItem("rating", response.data.rating);
//         localStorage.setItem("areasOfImprovement", response.data.areasOfImprovement);

//         navigate("/feedback");
//       }

//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }

//   };

if (!browserSupportsSpeechRecognition) {
  return null
}


  return (
    <div className="h-screen flex items-center bg-base-100">
      {/* {currentQuestionIndex < questionsLength &&  */}
      {!isLoading ?
        <div className=" p-12 m-auto w-8/12 rounded-2xl card bg-base-200" style={{
          boxShadow: `0 0 50px 10px rgb(51 65 85)`,
        }}>
          {/* <h2 className='pb-5'>Question {currentQuestionIndex+1}</h2> */}
          <div className="pb-5 flex flex-row justify-between">
            <h2>Question {currentQuestionIndex + 1}</h2>
            <h2>{`${currentQuestionIndex + 1}/${questionsLength
              }`}</h2>
          </div>
          <p className="pb-5 text-2xl">
            {parsedInterviewQuestions[`question${currentQuestionIndex + 1}`]}
          </p>
          <textarea
            rows={6}
            cols={100}
            value={userResponses[`answer${currentQuestionIndex + 1}`] || ""}
            onChange={(e) => handleResponseChange(e)}
            className="bg-[#e2e8f0] text-black"
          />
          {currentQuestionIndex + 1 < questionsLength ? (
            <button
              onClick={handleNextQuestion}
              className="btn btn-accent btn-outline btn-full md:btn-md gap-2 normal-case lg:gap-3 mt-5"
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="btn btn-accent btn-outline md:btn-md gap-2 normal-case lg:gap-3 p-4 px-9 rounded-lg bg-base-100 text-white font-medium mt-5 ease-in-out duration-300 hover:bg-[#2674bf]"
            >
              Submit
            </button>
          )}
           <div className="flex flex-col md:flex-row justify-end gap-3 mt-3">


<button className="btn btn-accent btn-outline btn-sm md:btn-md gap-2 normal-case lg:gap-3" onClick={startListening}>Start Listening</button>
<button className="btn btn-accent btn-outline btn-sm md:btn-md gap-2 normal-case lg:gap-3" onClick={SpeechRecognition.stopListening}>Stop Listening</button>

</div>
        </div> : (
          <div className="flex items-center justify-center m-auto h-screen">
            <Loader />
          </div>
        )
      }
     
    </div>
  );
};

export default Interview;
