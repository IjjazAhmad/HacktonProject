import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UesDocContaxt } from '../../Contaxt/DocContaxt'
import { fireStore } from '../../../config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

export default function Course() {
  const { allCourses,setAllCourses } = UesDocContaxt()
  const [ delDocId, setdelDocId ] = useState("")
  const handleDelete = async (cours) => {

    setdelDocId(cours.id)
   
    try {
      await deleteDoc(doc(fireStore, "courses", cours.id));
      let newdocument = allCourses.filter(doc => doc.id !== cours.id)
      setAllCourses(newdocument)
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
            <Link to={"/addcourse"} className='btn btn-warning' >Add Course</Link>
          </div>
        </div>
        <div className="row">
          {
            allCourses.map((cours, i) => {
              return (
                <div className="col-6 col-md-4 col-lg-4">
                  <div className="product-card">
                    <div className="product-tumb">
                      <img src={cours.imgurl} alt="..." />
                    </div>
                    <div className="product-details">
                      <h4>{cours.name}</h4>
                      <div dangerouslySetInnerHTML={{__html: cours.detail}}></div>
                      <div className="product-bottom-details">
                      <div className="product-price">Code:{cours.code}</div>
                        <div className="product-links">
                        {delDocId !== cours.id ?
                          <i className="fa-solid fa-trash float-end" style={{color: "#b0b0b0" , cursor: "pointer"}} onClick={() => { handleDelete(cours) }}></i>
                          :
                          <>
                          <div>
                            <div className="spinner-border" role="status" >
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                          </>

                        }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>

  )
}
