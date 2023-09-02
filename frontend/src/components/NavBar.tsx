import { useNavigate } from "react-router-dom"

export default function Navbar(){
  const navigate = useNavigate()

    return (
        <div className="navbar bg-base-200 shadow flex flex-col md:flex-row" >
          <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl" href="/">Ace Your Tech Interview</a>
          </div>
          <div className="flex-none">
    <button onClick={()=>{navigate("/progress")}} className="btn btn-accent btn-outline btn-wide md:btn-md gap-2 normal-case lg:gap-3">
     Track Your Progress
    </button>
  </div>
        
      </div>
    )
}