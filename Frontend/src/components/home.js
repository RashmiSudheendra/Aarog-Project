import React from 'react'
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom';
// import { GoogleOAuthProvider, googleLogout} from '@react-oauth/google';
// import { SignInContext } from './contextcomponent/googlesignin'


function Home({user}) {

  let navigate = useNavigate()

  function windowReload() {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }


  // let context = useContext(SignInContext)
  fetch('https://newserver-wy4a.onrender.com')
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
      let newData = data.filter((e) => e.email === user.email)
      console.log(newData);
      localStorage.setItem("userinformation", JSON.stringify(newData))
    })
    

  const detailuser = JSON.parse(localStorage.getItem('userinformation'))
  let uD = Object.values(detailuser || {})

  console.log(uD)

  function handleSignOut(){
    localStorage.clear();
    navigate(`/signin`)
  }

  function editProfile() {
    navigate(`/profile`) 
    window.location.reload();
  }
  

  return <>
    <div className="container">
      <div className='d-flex flex-row align-item-center justify-content-center m-5' onLoad={()=> windowReload()}>
      <div className="card border-0 shadow rounded-3 mt-5 w-100 d-flex flex-column align-items-center justify-content-center">
        <h2 className='mt-3' onLoad={()=> windowReload()}>Welcome {uD[0].name}</h2>
        <Image src={uD[0].picture} roundedCircle width="100"></Image>
        <h2 className='w-75'> <hr className='border border-info border-1'/></h2> 
        <h3>{uD[0].email} / {uD[0].phone}</h3>
        <h5>{uD[0].address}</h5>
        <div id="signOut">
        {/* <GoogleOAuthProvider clientId={clientid}>
          <googleLogout clientId={clientid}
              buttonText="Sign Out"
              onLogoutSuccess={onSuccess}/>
          </GoogleOAuthProvider>; */}
          
        </div>
        <div className="d-flex justify-content-center w-100">
          <button className="btn btn-info text-uppercase fw-bold m-3 " type="submit" onClick={()=>editProfile()}>
            Edit Profile
          </button>
          <button className="btn btn-info text-uppercase fw-bold m-3 " type="submit" onClick={()=>handleSignOut()}>
            Sign out
          </button>
        </div>
        </div>
      </div>
    </div>
  </>
}
  // <div className="col-lg-4">
  //           <div className="card mb-4">
  //             <div className="card-body text-center">
  //               <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
  //                 className="rounded-circle img-fluid" style={{width: '150px'}}/>
  //               <h5 className="my-3">John Smith</h5>
  //               <p className="text-muted mb-1">Full Stack Developer</p>
  //               <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
  //               <div className="d-flex justify-content-center mb-2">
  //                 <button type="button" className="btn btn-primary">Follow</button>
  //                 <button type="button" className="btn btn-outline-primary ms-1">Message</button>
  //               </div>
  //             </div>
  //           </div>

export default Home
