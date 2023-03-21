import React from "react";
// import BasicCard,{ProgressCard} from './Card'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';

function Admin(users) {

  let navigate = useNavigate();
  let url = "https://newserver-wy4a.onrender.com" 

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("userinfo", JSON.stringify(data))
    });

  console.table(users)
  const userD = Object.values(users || {})
  const len = userD[0].length;
  console.table(userD[0])

  // users.forEach((e)=>{
  //   console.table(e);
  // })

  function windowReload() {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }

  async function deleteNewUserData(i) {
    console.log('deleted')
    let data = await fetch(`${url}/deleteUser/${userD[0][i].email}`, {
      method: "Delete",
      headers: { "content-Type": "application/json" },
    });
    let res = await data.json();
    console.log(res);
    windowReload()
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
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Admin Dashboard</h1>
              <p
                href="Javascript(void)"
                className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"
              >
                <i className="fas fa-download fa-sm text-dark-50"></i> Generate
                Report
              </p>
            </div>

            {/* Content Row */}
            <div className="row">
              <div className="d-flex justify-content-between my-4">
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
             
              {/* Pending Requests Card Example */}
              {/* <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-warning shadow h-100 py-2">
                          <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                          Pending Requests</div>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">{props.data.pendingRequests}</div>
                                  </div>
                                  <div className="col-auto">
                                      <i className="fas fa-comments fa-2x text-gray-300"></i>
                                  </div>
                              </div>
                          </div> 
                      </div>
                  </div> */}
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
                    userD[0].map((e,i)=>{
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
