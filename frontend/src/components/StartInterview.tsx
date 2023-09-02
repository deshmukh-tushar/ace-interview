import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

// const url = "http://localhost:9595/bot/chat";
// const authToken = "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"
const url = process.env.REACT_APP_URL;
const authToken = process.env.REACT_APP_KEY;

const StartInterview = () => {
  const [interviewQuestions, setInterviewQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [field, setField] = useState<string | null>(localStorage.getItem("field"));
  const [level, setLevel] = useState<string | null>(localStorage.getItem("level"));

  useEffect(() => {
    if (field && level) {
      const promptVar = `send me five questions on both theortical and practical ${field} concepts of difficulty ${level} in this format {
        "question1": "output question",
        "question2": "output question",
        "question3": "output question",
        "question4": "output question",
        "question5": "output question"
      }`;

      fetchQuestions(promptVar);
    }
  }, [field, level]);

  const fetchQuestions = (promptVar: string) => {
    // const url = "http://localhost:8080/bot/chat"; // Replace with your API endpoint
    // const authToken = "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"; // Replace with your actual authorization token

    setIsLoading(true);

    axios({
      method: "GET",
      url: url,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      params: {
        prompt: promptVar,
      },
    })
      .then((response:any) => {
        console.log(response.data);
        if (response.data) {
          setIsLoading(false);
          localStorage.setItem("interviewQuestions", JSON.stringify(response.data));
        }
      })
      .catch((error:any) => {
        console.error("Error fetching data:", error);
      });
  };


  return (
    <div className="h-screen flex items-center bg-base-100 ">
      {
        isLoading ? (
          <div className="flex items-center justify-center m-auto h-screen">
            <Loader />
          </div>
        ) : (
          <div className=" p-12 m-auto w-8/12 rounded-2xl card bg-base-200" style={{
            boxShadow: `0 0 50px 10px rgb(51 65 85)`,
          }}>
            <p className="pb-5 text-2xl">You will be asked to answer 5 interview questions</p>
            <p className="pb-5 text-2xl">
              When you're done, you'll receive feedback on how you did
            </p>
            <p className="pb-5 text-2xl">
             Good luck and do your best :)
            </p>
            <Link to={"/interview"}>
              <button className="btn btn-accent btn-outline btn-wide md:btn-md gap-2 normal-case lg:gap-3 mt-5">
                Start Interview
              </button>
            </Link>
          </div>
        )
      }
    </div >
  );
};

export default StartInterview;
