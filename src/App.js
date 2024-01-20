import React, { useState } from "react";
import Heading from "./Components/Heading";
import SignIn from "./Components/SignIn";
import axios from "axios";


const App = ()=>{

    const[LsData,setLsData] = useState("");

    function displayData(){
        // console.log("hellllllloooooo");
        let displayDiv= document.querySelector(".display-data");
        let appDiv= document.querySelector(".app");
        appDiv.classList.toggle("hide");
        displayDiv.classList.toggle("hide");


        let dataForId = JSON.parse(localStorage.getItem("userDataObj"));
        let userId= dataForId.id;
        // console.log(userId);

        axios.get(`https://dummyjson.com/users/${userId}`)
        .then((response)=>{
            // console.log(response.data);
            let responseData= response.data;
            localStorage.setItem("userDataObj", JSON.stringify(responseData));
            setLsData(JSON.parse(localStorage.getItem("userDataObj")))
        })
        .catch(err=>{
            alert(err);
        })
        
    }

    return(
        <div>
            {/* <h1>Hello,jst starting</h1> */}
            
            <div className="app">
                <Heading />
                <SignIn displayData={displayData}/>
            </div>
            <div className="display-data hide">
                {LsData && (<div className="display-data"> <div className="imgDisplay"><img src={LsData.image} alt="userImage"></img></div>
                <div>
                    <p>ID:{LsData.id}</p>
                    <p>First Name: {LsData.firstName}</p>
                    <p>Last Name: {LsData.lastName}</p>
                    <p>Maiden Name: {LsData.maidenName}</p>
                    <p>
                        Address: <span>{LsData.company.address.address} , {LsData.company.address.city} , {LsData.company.address.state}</span>
                    </p>
                    <p>
                        Company: <span>{LsData.company.name} , Department: {LsData.company.department} ,Title: {LsData.company.title}</span>
                    </p>
                    <p>Gender:{LsData.gender}</p>
                    <p>Age: {LsData.age}</p>
                    <p>Birth Date:{LsData.birthDate}</p>
                    <p>Phone Number:{LsData.phone}</p>
                    <p>Username:{LsData.username}</p>
                    <p>Password: {LsData.password}</p>
                    <p>Email: {LsData.email}</p>
                    <p>Weight: {LsData.weight}</p>
                    <p>Height: {LsData.height+" cm"}</p>
                    <p>Eye Color: {LsData.eyeColor}</p>
                    <p>Blood Group: {LsData.bloodGroup}</p>
                    <p>University: {LsData.university}</p>
                    <p>
                        Bank Details: <span>Card Number: {LsData.bank.cardNumber} </span>
                        <span>Card Type: {LsData.bank.cardType} </span><span>Card Expiry: {LsData.bank.cardExpire}</span>
                    </p>
                </div> 
                </div>)
                }
            </div>

        </div>
    )
}

export default App