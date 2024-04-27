import "./login.css"

import { useState } from 'react'
function Login(){

    const [username, setusername] = useState('')
	const [password, setPassword] = useState('')

    //async function loginUser(event)
    const handleSubmit = async (e) =>{
		e.preventDefault()

		const response = await fetch('http://localhost:5000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			//window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
		}
	}


return (
    <div className="login">
        <h1>Admin Login</h1>
        
        <input type="text" name="email"  onChange={(e) => setusername(e.target.value)} placeholder="Enter your username Email"></input>
    <input type="password" name="password"  onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your Password" ></input>
        <div className="button" onClick={handleSubmit} >Login</div>
       
    </div>
)
}

export default Login;