import React from "react";
import Navbar from "../components/Navbar";

const Index = () => {
    return (
        <>
        <Navbar/>
        <div className="center">
            <h1>Welcome!</h1>
            <h3>Best tracks!</h3>
        </div>

        <style jsx>
            {`
                .center {
                    margin-top: 150px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            `}
        </style> 
        </>
    );
};

export default Index;