import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
// import ReactDOM from 'react-dom';

// import { SignInContext } from './contextcomponent/googlesignin'

const clientid = "49538352252-98fab0tj827sl5enk4frf4nh9q1kiaqb.apps.googleusercontent.com"

function Signin() {

  let navigate = useNavigate()

  const url = "https://newserver-wy4a.onrender.com"

  function loginAsAdmin(){
    navigate('/signin/adminsignin')
  }

  const [user, setUser] = useState({});

  const res = (res) => {

    console.log(res)
    console.log("Encoded JWT ID token:" + res.credential)
    var userObject = jwtDecode(res.credential);
    // console.table(userObject);
    setUser(userObject);
    localStorage.setItem("userDetails", JSON.stringify(userObject))

  fetch(url)
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
      let newData = data.filter((e) => e.email === userObject.email)
      // console.log(newData[0].email);

      if (newData.length === 0) {
          const userLoginData = {
              picture:userObject.picture,
              name: userObject.name,
              email: userObject.email,
              phone: '',
              age:'',
              address:''
          }
          // console.log(userLoginData);
          fetch(`${url}/createUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userLoginData),
        })
            .then((response) => console.log(response))
            .then((data) => {
                console.log('Success : ', userLoginData);
                localStorage.setItem("userDetails", JSON.stringify(userObject))
                navigate('/registration')
            })
            .catch((error) => {
                console.error('Error : ', error)
            })
      }
      else {
          // console.log(newData);
          localStorage.removeItem('userDetails')
          // console.log(newData);
          // console.log(newData[0]);

          localStorage.setItem('userDetails', JSON.stringify(newData[0]))
          navigate('/home')
      }
      // console.log('user already exist');
  })
  }
console.log(user)
const err = (error) => {
console.log(error)
}

  return <>
  <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-3 fw-bold fs-5">Sign in</h5>
              <hr className='border border-info border-1 my-2'/>
                <div className="d-flex align-items-center justify-content-center mt-3" id="signindiv">
                  <GoogleLogin
                    clientId={clientid}
                    buttonText="Sign In with Google"
                    onSuccess={res}
                    onFailure={err}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center mt-3" id="signindiv">
                <button className="btn btn-info text-uppercase fw-bold mb-3 w-50 px-0 " type="submit" onClick={()=>loginAsAdmin()}>
                Sign In as Admin
              </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Signin
