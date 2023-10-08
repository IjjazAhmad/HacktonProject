import React, { useState } from 'react'

import { fireStore, storage } from '../../../config/firebase';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { UesDocContaxt } from '../../Contaxt/DocContaxt';

const initialValues = { stdName: '', phone: "",courseName:"", }


export default function AddStd() {
  const {allCourses} = UesDocContaxt()
  const [state, setState] = useState(initialValues)
  const [file, setFile] = useState({})
  const [progress, setProgress] = useState(0)
  const [imgUrl, setimgUrl] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const handlefile = e => {
    let file = e.target.files[0]
    if (!file.size) {
      window.notify("plz! select image", "error")
      return
    }

    setFile(file)

  }
  const handleUpload = () => {
    if (!file.size) {
      window.notify("plz! select image", "error")
      return
    }

    const fileExt = file.name.split('.').pop()
    const randomId = Math.random().toString(36).slice(2)
    // setisLoading(true)
    try {
      const imagesRef = ref(storage, `images/${randomId}.${fileExt}`);
      const uploadTask = uploadBytesResumable(imagesRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(progress);
          setProgress(progress)

        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              window.notify("image storage/unauthorized!", "error")
              break;
            case 'storage/canceled':
              window.notify("image storage/unauthorized!", "error")
              break;
            case 'storage/unknown':
              window.notify("image storage/unknown!", "error")
              break;
          }
        },

        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setimgUrl(downloadURL)
            console.log('File available at', downloadURL);
          });
        }

      )
      uploadBytes(imagesRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        window.notify("image added successfully!", "success")
      });


    }
    catch (err) {
      window.notify("Something wants wrong! image not added", "error")
    }
    setisLoading(false)
  }
  // ================= 
  

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value 
  }))
  const handleSubmit = async (e) => {
    e.preventDefault()
    let { stdName, phone,courseName} = state

    if (stdName.length<3) { return   window.notify("Name manimum 3 char", "error") }
    if (!phone) { return   window.notify("add Phone number", "error") }
    if (!courseName) { return   window.notify("select course", "error") }

    const std = {
      stdName, phone,courseName,
      imgurl:imgUrl,
      status: "active",
      dateCreated: serverTimestamp(),
      id: Math.random().toString(36).slice(2)
    }

    try {
      setProgress(true)
      await setDoc(doc(fireStore, "students", std.id), std);
      window.notify("Add student Successfully", "succes")
      setProgress(false)
    } catch (e) {
      window.notify("student not added Error!", "error");
    }
  }
  return (
    <>


      <div className="addproduct">

        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Add Course :</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row Box my-4">
              <div className="col-12 col-md-6 col-lg-6">
                <span className='span'>
                  <input className="gate" id="stdName" type="text" placeholder="Name!" name='stdName' onChange={handleChange}  /><label htmlFor="stdName">Name</label>
                  
                </span>

              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <span className='span'>
                  <input className="gate" id="phone" type="number" placeholder="Enter Phone Number!" name='phone' onChange={handleChange}  /><label htmlFor="phone">Phone</label>
                </span>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <span className='span'>

                  <select className="gate " id="courseName" name='courseName' onClick={handleChange} >
                    {
                      allCourses.map((cours,i)=>{
                        return(
                          <option value={cours.code}>{cours.courseName}</option>
                        )
                      })
                    }
                  </select>
                  <label htmlFor="courseName">Course</label>
                  
                </span>
              </div>
            </div>
           

            <div className="row Box my-4">
              <div className="col-6">
                <span className='span'>
                  <input className="gate" id="img" type="file" accept='image/*' placeholder="Upload Image!" name='file' onChange={handlefile} /><label htmlFor="img">image</label>
                </span>
                
              </div>
              <div className="col-6 text-center ">
                <span className='span'>
                  {progress ?
                    <button className="btn bg-info btn-primary" type="button" disabled>
                      <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                      <span role="status">Loading...</span>
                    </button>
                    :
                    <button type='button' className='btn btn-warning' onClick={handleUpload}  >Upload</button>
                  }
                </span>
              </div>
              <div className="col-12">
                { progress ?
                  <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar bg-warning progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }}></div>
                  </div>
                  :
                  null
                }

              </div>
            </div>
            
            <div className="row Box my-4">
              <div className="col-12 text-center">
                {isLoading ?
                  <button className="btn bg-info btn-primary" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                    <span role="status">Loading...</span>
                  </button>
                  :
                  <button type='submit' className='btn btn-warning'   >ADD STUDENT</button>
                }
              </div>

            </div>
          </form>
        </div >
      </div >



    </>
  )
}
