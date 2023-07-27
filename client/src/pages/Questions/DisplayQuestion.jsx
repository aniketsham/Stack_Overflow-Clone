import React from "react";
import LeftSideBar from "../../components/LeftSidebar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import QuestionDetails from "./QuestionDetails";
const DisplayQuestion =()=>
{

    return (
        <div className="home-container-1">
        <LeftSideBar/>
        <div className="home-container-2">
        <QuestionDetails/>
        
        </div>
        <RightSideBar/>
        </div>
    );
}

export default DisplayQuestion