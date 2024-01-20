import React,{useState} from "react";
import axios from "axios";


const SignIn= ({displayData})=>{


    let[user, setUser]= useState({username:"",password:""});
    // console.log(user);
    let {username,password}=user;


    function authNameandPass(e){

        let key= e.target.name;
        // console.log(key);
        setUser({...user,[key]:((e.target.value).trim())})
        

    }
    // console.log(user);

    function fetchData(e){ 

        e.preventDefault();
        axios.post("https://dummyjson.com/auth/login",
        {
            
                username:`${username}`,
                password:`${password}`
            
        },
        {
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(response=>{
            // console.log(response.data)
            let responseObj= response;
            let responseData= response.data;
            // console.log(responseObj);
            // console.log(responseData);
            if(+responseObj.status===200){
                // console.log("Status OK")
                localStorage.setItem("userDataObj",JSON.stringify(responseData))
                displayData();
                
                
            }
        })
        .catch(err=>{
            // console.log(err)
            alert(err);
        });

        // This step is to make input fields empty after clicking log in button
        setUser({...user,username:"",password:""}) 
    }  

    return(
        <form className="signIn-form" onSubmit={fetchData}>
            
            <div>
                <p>Username</p>
                <input type="text" placeholder="Enter Username" onChange={authNameandPass}
                name="username" value={username} required
            >

            </input>
            </div>

            <div>
                <p>Password</p>
                <input type="text" placeholder="Enter Password" onChange={authNameandPass}
                name="password" value={password} required
            >

            </input>
            </div>
            <button className="form-btn">Log In</button>
        </form>
    )
}

export default SignIn