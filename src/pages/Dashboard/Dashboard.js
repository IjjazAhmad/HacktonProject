import React from 'react'
import { Link } from 'react-router-dom';
import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import 'mdb-ui-kit/css/mdb.min.css';
import Route from './Route'
import { useAuthContext } from '../Contaxt/AuthContaxt';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
export default function Dashboard(){
  const {dispatch}= useAuthContext()
  const HandleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" })
        window.notify("SignOut User successfuly!", "Success")
      })
      .catch((err) => {
        window.notify("Something wants wrong", "error")
      })
  }
  return (
    <>
      <div className="dashBoard">


        <div className="container-fluid">
          <div className="row">
            <div className="col">

              {/* <!--Main Navigation--> */}
              <header>
                {/* <!-- Sidebar --> */}

                <nav
                  id="sidebarMenu"
                  tabIndex="-1"
                  className="collapse d-lg-block sidebar collapse "
                >
                  <div className="position-sticky ">
                    <div className="list-group list-group-flush mx-3 mt-4 ">
                      <Link to={"/"}

                        className="list-group-item list-group-item-action py-2 ripple  text-white"
                        aria-current="true"
                      >
                        <i className="fas fa-tachometer-alt fa-fw me-3"></i
                        ><span>Home</span>
                      </Link>
                      <Link to={"/student"}

                        className="list-group-item list-group-item-action py-2 ripple  text-white"
                      >
                        <i className="fa-solid fa-user-tie fa-fw me-3"></i><span>Students</span>
                      </Link>
                      <Link to={'/course'}

                        className="list-group-item list-group-item-action py-2 ripple  text-white"
                      ><i className="fa-solid fa-file-lines fa-fw me-3"></i><span>Courses</span></Link>


                      <Link to={"/attendance"}

                        className="list-group-item list-group-item-action py-2 ripple  text-white"
                      ><i className="fas fa-chart-bar fa-fw me-3"></i><span>Attendance</span></Link>
                     
          
                    </div>
                  </div>
                </nav>
                {/* <!-- Sidebar --> */}

                {/* <!-- Navbar --> */}
                <nav
                  id="main-navbar"
                  className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
                >
                  {/* <!-- Container wrapper --> */}
                  <div className="container">

                    {/* <!-- Toggle button --> */}

                    <button
                      className="navbar-toggler"
                      type="button"
                      data-mdb-toggle="collapse"
                      data-mdb-target="#sidebarMenu"
                      aria-controls="sidebarMenu"
                      // aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <i className="fas fa-bars"></i>
                    </button>

                    {/* <!-- Brand --> */}
                    <Link to={'/'} className="navbar-brand">
                      {/* <img
                            src={images.slider3}
                            height="25"
                            alt=""
                            loading="lazy"
                        /> */}
                      Admin Portal
                    </Link>
                    {/* <!-- Search form --> */}
                    <form className="d-none d-md-flex input-group w-auto my-auto">
                      <input
                        autoComplete="off"
                        type="search"
                        className="form-control rounded ms-5"
                        placeholder='Search...'
                        style={{ minWidth: "225px" }}
                      />
                      <span className="input-group-text border-0"
                      ><i className="fas fa-search"></i
                      ></span>
                    </form>

                    {/* <!-- Right links --> */}
                    <ul className="navbar-nav ms-auto d-flex flex-row">
                     
                     

                      {/* <!-- Avatar --> */}
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"

                          id="navbarDropdownMenuLink"
                          role="button"
                          data-mdb-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                            className="rounded-circle"
                            height="22"
                            alt=""
                            loading="lazy"
                          />
                        </a>
                        <ul
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="navbarDropdownMenuLink"
                        >
                          <li><Link className="dropdown-item" onClick={HandleLogout} >Logout</Link></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- Container wrapper --> */}
                </nav>
                {/* <!-- Navbar --> */}
              </header>
              {/* <!--Main Navigation--> */}

              {/* <!--Main layout--> */}
              <main style={{ marginTop: "58px" }}>
                <div className="container pt-4">
                  <Route />
                  {/* <h1>helo</h1> */}

                </div>
              </main>
              {/* <!--Main layout--> */}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
