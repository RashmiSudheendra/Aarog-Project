// import logo from './logo.svg';

// 49538352252-98fab0tj827sl5enk4frf4nh9q1kiaqb.apps.googleusercontent.com  --  client ID for google login
// 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 -- secret ID for goole login

// aarog client 1070159888086-bb0bq4oj2gkqrrdnn3b1egmnhmg5rq4a.apps.googleusercontent.com -- client ID for google login
// aarog client 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 -- secret ID for goole login

import './App.css';
import Signin from './components/signin';
import Home from './components/home';
import Profile from './components/Profile';
import Admin from './components/Admin';
import AdminSignIn from './components/AdminSignIn';
import Registration from './components/Registration';
import {Routes, Route} from "react-router-dom"
import { useEffect} from 'react';
// import axios from "axios";
// import jwtDecode from 'jwt-decode';
import { gapi } from 'gapi-script';
// import Googlesignin from './components/contextcomponent/googlesignin';

const clientid = "49538352252-98fab0tj827sl5enk4frf4nh9q1kiaqb.apps.googleusercontent.com"


function App() {

  const user = JSON.parse(localStorage.getItem('userDetails'))
  const users = JSON.parse(localStorage.getItem('userinfo'))
  // const detailuser = JSON.parse(sessionStorage.getItem('userinformation'))
  

  // const [user, setUser] = useState({});
  
  // function handleCallbackResponse(response){
  //   console.log("Encoded JWT ID token:" + response.credential)
  //   var userObject = jwtDecode(response.credential);
  //   console.table(userObject);
  //   setUser(userObject);
  // }

  

  useEffect(()=>{
    function start() {
      gapi.client.init({
        clientId: clientid,
        scope:""
      })
    }

    gapi.load('client:auth2', start)

  });

  // useEffect(()=>{
  //   /*global google*/
  //     google.accounts.id.initialize({
  //       client_id: "49538352252-98fab0tj827sl5enk4frf4nh9q1kiaqb.apps.googleusercontent.com",
  //       callback: handleCallbackResponse
  //     });

  //     google.accounts.id.renderButton(
  //       document.getElementById("signindiv"),
  //       {theme: "outline", size: "large"}
  //     )
  // },[]);

  return <>
    <div>
    {/* <Signin/> */}
      <Routes>
        <Route path= "/admin" element={<Admin/>}/>
        <Route path= "/signin/adminsignin" element={<AdminSignIn user={user}/>}/>
        <Route path= "/signin" element={<Signin/>}/>
        <Route path= "/home" element={<Home users={users}/>}/>
        <Route path= "/profile" element={<Profile/>}/>
        <Route path= "/registration" element={<Registration user={user}/>}/>
        <Route path='*' element={<Signin/>}/>
      </Routes>
      {/* <Signin/>
      <Home/> */}
    </div>
  </>
}

export default App;
