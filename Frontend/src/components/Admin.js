import React, {useState, useEffect} from "react";
// import BasicCard,{ProgressCard} from './Card'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';

function Admin() {

  let navigate = useNavigate();

  const userD = JSON.parse(localStorage.getItem('userinfo'))

  console.log(userD)

  let [user, setUser] = useState([userD])

  let url = "https://newserver-wy4a.onrender.com" 

  fetch("https://newserver-wy4a.onrender.com")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUser(data);
      localStorage.setItem("userinfo", JSON.stringify(data))
    })

  useEffect(()=>{
    fetch("https://newserver-wy4a.onrender.com")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      setUser(data);
      // localStorage.setItem("userinfo", JSON.stringify(data))
    });
  },[user])

  console.table(user)
  // const userD = Object.values(users || {})
  const len = user.length;
  async function deleteNewUserData(i) {
    console.log(i)
    console.log('deleted')
    let data = await fetch(`${url}/deleteUser/${user[i].email}`, {
      method: "Delete",
      headers: { "content-Type": "application/json" },
    });
    console.log(data);
    let res = await data.json();
    console.log(res);
    navigate('/admin')
  }
  

  function logoutAsAdmin(){
    navigate('/signin')
  }
  // console.log(props.data)
  return (
    <>
      {/* Content Wrapper*/}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="container-fluid">
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-center mb-0">
              <h1 className="h3 mt-5 text-gray-800">Admin Dashboard</h1>
            </div>

            {/* Content Row */}
            <div className="row">
              <div className="d-flex justify-content-between mb-4 mt-2">
                <div className="bg-info border border-5 border-info rounded-2 shadow p-2">
                    <div className="row no-gutters align-items-center w-100 mx-2">
                      <div className="col mr-2 px-0">
                        <div className="font-weight-bold text-dark mb-1">
                          <h5>No of users</h5>
                        </div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                              {len}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-user fa-2x text-gray-300"></i>
                      </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end" id="signindiv">
                <button className="btn btn-info text-uppercase fw-bold mb-3 h-50 " type="submit" onClick={() => logoutAsAdmin()}>
                  Sign Out
                </button>
              </div>
              </div>
            </div>
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    user.map((e,i)=>{
                      // componentDidMount()
                        return <tr key={i}>
                            <td>{i+1}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.phone}</td>
                            <td>{e.age}</td>
                            <td>{e.address}</td>
                            <td>
                                <Button variant='danger' onClick={()=>deleteNewUserData(i)}>
                                    <i className="fas fa-fw fa-user-slash"></i>&nbsp;&nbsp;Delete
                                </Button>
                            </td>
                        </tr>
                    })
                  }
                </tbody>
              </Table>
            </div>
          </div>
          {/* /.container-fluid */}
        </div>

        {/* End of Main Content */}

        {/* Footer */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2021</span>
            </div>
          </div>
        </footer>
        {/* End of Footer */}
        {/* <ToastContainer 
      position="top-center"
      autoClose={1500}
 /> */}
      </div>

      {/* End of Content Wrapper */}
    </>
  );
}

export default Admin;
