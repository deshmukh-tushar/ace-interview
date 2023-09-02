import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import Interview from "../pages/Interview";
import StartInterview from "../components/StartInterview";
import Feedback from "./Feedback";
import ProgressChart from "../pages/ProgressChart";

export default function AllRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/interview" element={<Interview/>}/>
            <Route path="/start-interview" element={<StartInterview/>}/>
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/progress" element={<ProgressChart/>}/>
        </Routes>
    )
}