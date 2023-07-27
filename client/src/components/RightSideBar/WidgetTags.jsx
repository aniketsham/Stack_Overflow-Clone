import React from "react";
import './RightSideBar.css'


const WidgetTags=()=>
{
    const tags=['c','css','express','firebase','html','java','javascript','MERN','PHP','python','monogodb','sql','next.js','node']
    return (
        <>
        <div className="widget-tags">
            <h3>Watched tags</h3>
            <div className="widget-tags-div">
                {
                    tags.map((tag)=>(
                        <p key={tag}>{tag}</p>
                    ))
                }
            </div>

        </div>
        </>
    )
}

export default WidgetTags;
