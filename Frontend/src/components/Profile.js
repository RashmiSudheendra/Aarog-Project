import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

function Profile() {
  let navigate = useNavigate()

  let uD = JSON.parse(sessionStorage.getItem('userDetails'))
  let userD = uD[0]
  let [user, setUser] = useState([userD])
  const url = 'https://newserver-wy4a.onrender.com'
    

  console.log(userD)
  console.log(user)

  function updateUser() {
    navigate(`/home`)
    console.log('Entering into update user')
    const userDetails= {
      name: document.getElementById("userName").value,
      email: document.getElementById("userEmail").value,
      phone: document.getElementById("userPhone").value,
      age: document.getElementById("userAge").value,
      address: document.getElementById("userAddress").value,
  };
  console.log(userDetails);
  setUser(userDetails);
    fetch(`${url}/updateUser/${userD.email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    })
      .then((response) => console.log(response))
      .then((data) => {
          console.log('Success : ', userDetails);
      })
      .catch((error) => { 
          console.error('Error : ', error)
      })
    }

  return <>
    <div style={{backgroundColor: 'javascript(void)eee'}}>
      <div className="container py-5">
        <div>
          <Form>
          <div className="d-flex justify-content-center w-100">
          <div className="card m-5 d-flex justify-content-center w-50">
            <div className="d-flex justify-content-center w-100">
              <Image src={user[0].picture} alt="Profile-Pic"
                  className="rounded-circle img-fluid my-4" style={{width: '115px'}}/>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                <Form.Control id='userName' plaintext type="text" placeholder="Enter Name" defaultValue={user[0].name}/>
                </div>
              </div>
              <hr className='border border-info border-1'/>
              <div className="row">
                <div className="">
                  <p className="mb-0">Email</p>
                </div>
                <div className="">
                <Form.Control id='userEmail' plaintext type="text" placeholder="Enter Email" defaultValue={user[0].email} readOnly/>
                </div>
              </div>
              <hr className='border border-info border-1'/>
              <div className="row">
                <div className="">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="">
                <Form.Control id='userPhone' plaintext type="number" placeholder="Enter Mobile" defaultValue={user[0].phone}/>
                </div>
              </div>
              <hr className='border border-info border-1'/>
              <div className="row">
                <div className="">
                  <p className="mb-0">Age</p>
                </div>
                <div className="">
                <Form.Control id='userAge' plaintext type="number" placeholder="Age" defaultValue={user[0].age}/>
                </div>
              </div>
              <hr className='border border-info border-1'/>
              <div className="row">
                <div className="">
                  <p className="mb-0">Address</p>
                </div>
                <div className="">
                <Form.Control id='userAddress' plaintext type="text" placeholder="Address Line" defaultValue={user[0].address}/>
                </div>
              </div>
              <hr className='border border-info border-1'/>
            </div>
            <div className="d-flex justify-content-center w-100">
              <button className="btn btn-info text-uppercase fw-bold mb-3 w-25 px-0 " type="submit" onClick={()=>updateUser()}>
                Update
              </button>
            </div>
          </div>
          </div>
          </Form>
        </div>
  </div>
</div>
  </>
}

export default Profile
