import React, { Component } from 'react';
import { getSession, callApi } from './main';
import './viewstudent.css'; // Import the CSS file

class CMyStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyStudentData: [],
            StudentData: [],
            error: null
        };
    }

    componentDidMount() {
        const cid = getSession("cid");
        if (!cid) {
            window.location.replace("/");
            return;
        }

        // Fetching student's counselor data
        const url = "http://localhost:5000/counsellor/students";
        const data = JSON.stringify({ counselorId: cid });
        console.log("Calling callApi with loadInfo function: ", this.loadInfo);
        callApi("POST", url, data, this.loadInfo, this.errorResponse);
    }

    loadInfo = (res) => {
        try {
            const data = JSON.parse(res);
            this.setState({ MyStudentData: data }, () => {
                // Fetch student information based on the counselor's students
                this.state.MyStudentData.forEach((student) => {
                    const url = "http://localhost:5000/counsellor/studentinfo";
                    const requestData = JSON.stringify({ regNo: student.regNo });
                    callApi("POST", url, requestData, this.loadStudentInfo, this.errorResponse);
                });
            });
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    loadStudentInfo = (res) => {
        try {
            const data = JSON.parse(res);
            this.setState((prevState) => ({
                StudentData: [...prevState.StudentData, data[0]]
            }));
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    errorResponse = (error) => {
        this.setState({ error: "An error occurred while fetching data." });
    };

    render() {
        const { StudentData, error } = this.state;
    
        if (error) {
            return (
                <div className="mycounsellor-error">
                    <h3>Error: {error}</h3>
                </div>
            );
        }
    
        if (StudentData.length === 0) {
            return <div className="mycounsellor-loading-message">
                <h3>No Students Allotted</h3></div>;
        }
    
        return (
            <div className='vscontent'> {/* Apply vscontent class for container */}
                <h3>My Student Information</h3>
                <table className='student-table'> {/* Apply student-table class */}
                    <thead>
                        <tr>
                            <th>Registration Number</th>
                            <th>Full Name</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>Blood Group</th>
                            <th>Contact No.</th>
                            <th>Parent Contact No.</th>
                            <th>Email</th>
                            <th>Current Academic Year</th>
                            <th>Semester</th>
                            <th>Branch</th>
                            <th>CGPA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {StudentData.map((student, index) => (
                            <tr key={index}>
                                <td>{student.regNo}</td>
                                <td>{student.firstName} {student.lastName}</td>
                                <td>{student.gender}</td>
                                <td>{student.dob}</td>
                                <td>{student.bloodGroup}</td>
                                <td>{student.contactNo}</td>
                                <td>{student.parentContactNo}</td>
                                <td>{student.email}</td>
                                <td>{student.year}</td>
                                <td>{student.semester}</td>
                                <td>{student.branch}</td>
                                <td>{student.cgpa}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    
}

export default CMyStudents;
