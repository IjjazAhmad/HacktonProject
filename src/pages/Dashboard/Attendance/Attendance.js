import React, { useState } from 'react'
import { UesDocContaxt } from '../../Contaxt/DocContaxt'
import { Link } from 'react-router-dom'
import { fireStore } from '../../../config/firebase'
const initialState = []
export default function Attendance() {
  const { allStd } = UesDocContaxt()
  const [attendanceData, setAttendanceData] = useState([]);
  console.log("🚀 ~ file: Attendance.js:8 ~ Attendance ~ attendanceData:", attendanceData)

  const handleChange = (studentId, value, stdName) => {
    const existingRecordIndex = attendanceData.findIndex(record => record.studentId === studentId);

    if (existingRecordIndex !== -1) {
      const updatedData = [...attendanceData];
      updatedData[existingRecordIndex] = { studentId, stdName, attendance: value };
      setAttendanceData(updatedData);
    } else {
      const updatedData = [...attendanceData, { studentId, stdName, attendance: value }];
      setAttendanceData(updatedData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (attendanceData.length > 0) {
      attendanceData.forEach(async (record) => {
        await fireStore.collection('attendance').add(record);
      });
  
      setAttendanceData([]);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <span className='fs-2 fw-medium'> Attendence </span>
            <Link to={"/AddStd"} className="btn btn-primery float-end btn btn-warning text-white">Add Student</Link>
          </div>
        </div>


        <div className="row my-3 cart">
          <div className="col">
            <div className="table-responsive border">
              <table className="table table-hover align-middle align-middle">
                <thead className='table-light'>
                  <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course ID</th>
                    <th >
                      <tr >
                        <th style={{ padding: "0px 10px" }}>Present</th>
                        <th style={{ padding: "0px 10px" }}>Absent</th>
                        <th style={{ padding: "0px 10px" }}>Leave</th>
                      </tr>
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {
                    allStd.map((student, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{student.id}</td>
                        <td>{student.stdName}</td>
                        <td>{student.courseName}</td>
                        <td>
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            id={`attendance-${student.id}`}
                            value="present"
                            onChange={() => handleChange(student.id, "present", student.stdName)}
                          />
                          <label htmlFor={`attendance-${student.id}`}>Present</label>

                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            value="absent"
                            onChange={() => handleChange(student.id, "absent", student.stdName)}
                          />
                          <label htmlFor={`attendance-${student.id}`}>Absent</label>

                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            value="leave"
                            onChange={() => handleChange(student.id, "leave", student.stdName)}
                          />
                          <label htmlFor={`attendance-${student.id}`}>Leave</label>
                        </td>
                      </tr>
                    ))
                  }

                  <div div className="row">
                    <div className="col-12">
                      <button className="btn btn-primery float-end btn btn-warning text-white" onClick={handleSubmit}>Submit</button>
                    </div>
                  </div>



                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >

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
