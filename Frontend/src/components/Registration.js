import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

function Registration() {
  let navigate = useNavigate()

  let user = JSON.parse(localStorage.getItem('userDetails'));

  const url = 'https://newserver-wy4a.onrender.com'    

  console.log(user.email)

  function submitToHome() {
    navigate(`/home`)
    console.log('Entering into update user')
    const userinformation = {
      name: document.getElementById("userName").value,
      email: document.getElementById("userEmail").value,
      phone: document.getElementById("userPhone").value,
      age: document.getElementById("userAge").value,
      address: document.getElementById("userAddress").value,
  };
  console.log(userinformation);
    fetch(`${url}/updateUser/${user.email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userinformation),
    })
      .then((response) => console.log(response))
      .then((data) => {
          console.log('Success : ', userinformation);
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
              <Image src={user.picture} alt="Profile-Pic"
                  className="rounded-circle img-fluid my-4" style={{width: '115px'}}/>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                <Form.Control id='userName' plaintext type="text" placeholder="Enter Name" defaultValue={user.name}/>
                </div>
              </div>
              <hr className='border border-info border-1'/>
              <div className="row">
                <div className="">
                  <p className="mb-0">Email</p>
                </div>
                <div className="">
                <Form.Control id='userEmail' plaintext type="text" placeholder="Enter Email" defaultValue={user.email}/>
                </div>
              </div>
              <hr className='border border-info border-1'/>
              <div className="row">
                <div className="">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="">
                <Form.Control id='userPhone' plaintext type="number" placeholder="Enter Mobile" defaultValue={user.phone}/>
                </div>
              </div>
              <hr className='border border-info border-1'/>
              <div className="row">
                <div className="">
                  <p className="mb-0">Age</p>
                </div>
                <div className="">
                <Form.Control id='userAge' plaintext type="number" placeholder="Age" defaultValue={user.age}/>
                </div>
              </div>
              <hr className='border border-info border-1'/>
              <div className="row">
                <div className="">
                  <p className="mb-0">Address</p>
                </div>
                <div className="">
                <Form.Control id='userAddress' plaintext type="text" placeholder="Address Line" defaultValue={user.address}/>
                </div>
              </div>
              <hr className='border border-info border-1'/>
            </div>
            <div className="d-flex justify-content-center w-100">
              <button className="btn btn-info text-uppercase fw-bold mb-3 w-25 px-0 " type="submit" onClick={()=>submitToHome()}>
                Submit
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

export default Registration
