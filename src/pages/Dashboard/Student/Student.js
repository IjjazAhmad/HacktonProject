import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UesDocContaxt } from '../../Contaxt/DocContaxt'
import { fireStore } from '../../../config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'
export default function Order() {
  const { allStd,setAllStudents } = UesDocContaxt()

  const [ delDocId, setdelDocId ] = useState("")
  const handleDelete = async (student) => {

    setdelDocId(student.id)
   
    try {
      await deleteDoc(doc(fireStore, "students", student.id));
      let newdocument = allStd.filter(doc => doc.id !== student.id)
      setAllStudents(newdocument)
      window.notify("successfuly Deleted ", "success")

    } catch (err) {
      console.log(err);
      window.notify("SomeThing wants worng on deleting user!", "error")

    }

  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <span className='fs-2 fw-medium'> Students </span>
            <Link to={"/AddStd"} className="btn btn-primery float-end btn btn-warning text-white">Add Student</Link>
          </div>
        </div>


        <div className="row my-3 cart">
          <div className="col">
            <div className="table-responsive border">
              <table className="table table-hover align-middle align-middle">
                <thead className='table-light'>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Course ID</th>
                    <th scope="col">PhoneNo</th>
                    <th scope="col">Status</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allStd.map((student, i) => {
                      return (
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{student.id}</td>
                          <td> <img src={student.imgurl} alt="loading.." style={{width:"50px"}} /> </td>
                          <td>{student.stdName}</td>
                          <td >{student.courseName}</td>
                          <td>{student.phone}</td>
                          
                          <td ><span className='text-success '>{student.status}</span></td>
                          <td >
                          {delDocId !== student.id ?
                          <i className="fa-solid fa-trash float-end" style={{color: "#b0b0b0" , cursor: "pointer"}} onClick={() => { handleDelete(student) }}></i>
                          :
                          <>
                          <div>
                            <div className="spinner-border" role="status" >
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                          </>

                        }
                          </td>
                        </tr>
                      )
                    })
                  }





                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="container paginat position-absolute bottom-0 end-0">
        <div className="row">
          <div className="col">
            <ul className="pagination modal-4 float-end">
              <li><a href="#" className="prev">
                <i className="fa fa-chevron-left"></i>
                Previous
              </a>
              </li>
              <li><a href="#">1</a></li>
              <li> <a href="#">2</a></li>
              <li> <a href="#" className="active">3</a></li>
              <li> <a href="#">4</a></li>
              <li><a href="#" className="next"> Next
                <i className="fa fa-chevron-right"></i>
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    </>


  )
}
