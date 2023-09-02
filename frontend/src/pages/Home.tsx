import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Home(){


  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showToast, setShowToast] = useState(false);


  const handleGetStartedClick = () => {
    if (email.trim() === "" || name.trim() === "") {
      setShowToast(true);
    } else {
      // Save name and email in local storage
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      navigate("/courses");
    }
  };

    const navigate = useNavigate()
    return (
        <div className="hero min-h-screen bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Join Our Interview Program</h1>
            <p className="py-6">Get Ready for Your Upcoming Interviews with Our Comprehensive Preparation Program.</p>
            <input type="text" placeholder="Enter name here" className="input input-bordered w-full max-w-xs" onChange={(e) => setName(e.target.value)} value={name}/>
            <input style={{marginTop:10}} type="email" placeholder="Enter email here" className="input input-bordered w-full max-w-xs" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <button style={{marginTop:20}}onClick={handleGetStartedClick} className="btn btn-accent btn-outline btn-wide md:btn-md gap-2 normal-case lg:gap-3">Get Started</button>
            {showToast && (
          <div className="text-red-500 mt-2">
            Please fill all boxes before clicking Get Started.
          </div>
        )}
          </div>
        </div>
      </div>
    )
}