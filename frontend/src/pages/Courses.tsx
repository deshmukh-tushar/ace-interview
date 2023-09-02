import { useNavigate } from "react-router-dom";

export default function Courses() {
    const navigate = useNavigate();
  
    const handleGetStartedClick = (field: any, level: any) => {
      // Save field and level in local storage
      localStorage.setItem("field", field);
      localStorage.setItem("level", level);
      // Navigate to the CourseDiv component or perform any other action
      // depending on your requirement
  
      navigate("/start-interview")
  
    };

  const Card = ({title,content,course}:{"title":String,content:String,course:String}) => (
    <div className="card w-96 bg-base-200"    style={{
      boxShadow: `0 0 50px 10px rgb(51 65 85)`,
    }}>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div className="card-actions">
        <button
      onClick={()=>handleGetStartedClick(course, "Low Level")}
          className="btn btn-accent btn-outline btn-wide md:btn-md gap-2 normal-case lg:gap-3"
        >
          <div>
            <span>Low difficulty</span>
          </div>{" "}
          <svg
            className="h-6 w-6 fill-current md:h-8 md:w-8"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
          </svg>
        </button>
      </div>
      <div className="card-actions">
        <button
          className="btn btn-accent btn-outline btn-wide md:btn-md gap-2 normal-case lg:gap-3"
          onClick={()=>handleGetStartedClick(course, "Medium Level")}
        >
          <div>
            <span>Medium difficulty</span>
          </div>{" "}
          <svg
            className="h-6 w-6 fill-current md:h-8 md:w-8"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
          </svg>
        </button>
      </div>
      <div className="card-actions">
        <button
         
          className="btn btn-accent btn-outline btn-wide md:btn-wide gap-2 normal-case lg:gap-3"
          onClick={()=>handleGetStartedClick(course, "High Level")}
        >
          <div>
            <span>High difficulty</span>
          </div>{" "}
          <svg
            className="h-6 w-6 fill-current md:h-8 md:w-8"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
          </svg>
        </button>
      </div>
      </div>
    </div>
  );

  const courseData = [{
    title:"Try Our Node JS Interview Session",
    content:"Get Ready for Your Upcoming Node JS Interviews with Our Comprehensive Preparation Program.",
    course:"Node JS"
  },
  {
    title:"Try Our Java Interview Session",
    content:"Get Ready for Your Upcoming JAVA Interviews with Our Comprehensive Preparation Program.",
    course:"JAVA"
  },{
    title:"Try Our MERN Interview Session",
    content:"Get Ready for Your Upcoming MERN Interviews with Our Comprehensive Preparation Program.",
    course:"MERN"
  }
];

  return (
    <div className="h-screen bg-base-100" style={{padding:10}}>
          <div className="flex space-evenly items-center">
   <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 mx-auto gap-10 mt-4 md:mt-8 lg:mt-39">
    {courseData.map((ele,ind)=>(
        <Card
        key={ind}
        {...ele}
        />
    ))}
    </div>
    </div>
    </div>
  );
}
