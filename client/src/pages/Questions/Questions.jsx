import React from "react";
import '../../App.css'
import HomeMainBar from "../../components/HomeMainBar/HomeMainBar";
import LeftSideBar from "../../components/LeftSidebar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";

const Questions = () =>{

 
    return(
        <div className="home-container-1">
        <LeftSideBar/>
        <div className="home-container-2">
        <HomeMainBar/>
        <RightSideBar/>
        </div>
        </div>
    )
}

export default Questions;