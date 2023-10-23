import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { collection, getDocs} from 'firebase/firestore';
import { fireStore } from '../../config/firebase'



const DocContaxt = createContext()
export default function DocContaxtProvider(props) {
  const [allCourses, setAllCourses] = useState([])
  const [allStd, setAllStudents] = useState([])
  const [isApploading, setisApploading] = useState(true)

  // -------------------------------- get task doc ------------------
  useEffect(() => {
    fetchcourse()
  }, [])

  const fetchcourse = async () => {
    const querySnapshot = await getDocs(collection(fireStore, "courses"));
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      array.push(data)
    });
    setAllCourses(array)
  }
useEffect(()=>{
  fetchstd()
},[])
  
const fetchstd = async () => {
  const querySnapshot = await getDocs(collection(fireStore, "students"));
  const array = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data()
    array.push(data)
  });
  setAllStudents(array)
}




  return (
    <DocContaxt.Provider value={{allCourses,setAllCourses, allStd,setAllStudents }}>
      {props.children}
    </DocContaxt.Provider>
  )
}

export const UesDocContaxt = () => useContext(DocContaxt)