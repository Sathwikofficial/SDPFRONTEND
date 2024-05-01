import React, { useState, useEffect } from "react";
import { callApi } from "./main";
import { useParams } from "react-router-dom";
import "./addstudent.css";
import axios from 'axios';

function SUpdateForm() {
    const { regNo } = useParams(); // Extracting regNo using useParams hook
    const [student, setStudent] = useState({
        regNo: regNo,
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        bloodGroup: "",
        contactNo: "",
        parentContactNo: "",
        email: "",
        year: "",
        semester: "",
        branch: "",
        cgpa: "",
    });

    
    
    useEffect(() => {
        axios.get(`http://localhost:5000/studentdetails/${regNo}`)
            .then(res => {
                setStudent(s => ({
                    ...s,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    gender: res.data.gender,
                    dob: res.data.dob,
                    bloodGroup: res.data.bloodGroup,
                    contactNo: res.data.contactNo,
                    parentContactNo: res.data.parentContactNo,
                    email: res.data.email,
                    year: res.data.year,
                    semester: res.data.semester,
                    branch: res.data.branch,
                    cgpa: res.data.cgpa,
                }));
            })
            .catch(err => console.log(err));
    }, [regNo]);
    
    
    const handleInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setStudent({ ...student, [fieldName]: fieldValue });
    };
    
    
    

    const handleError = (errorMessage) => {
        console.error("Error:", errorMessage);
        // Handle error, for example, show an error message to the user
    };

    
    const handleSuccess = (responseData) => {
        console.log("Student details updated successfully:", responseData);
        // You can add any further handling logic here, such as showing a success message to the user
    };

    const updateDetails = (event) => {
        event.preventDefault();
        const data = JSON.stringify(student);
        const url = `http://localhost:5000/updatestudent/${regNo}`;
        alert("Student Details Updated Successfully");
        callApi("PUT", url, data, handleSuccess, handleError);
    };
    const handleBackButtonClick = () => {
        window.location.href='/updatestudent';
    };
    return (
        <div>
            <button onClick={handleBackButtonClick} className="back-button">Back</button>
        <div className='full-height add-student-container'>
            <div className="mpcontent">
                <h2>Update Student</h2>
                <form onSubmit={updateDetails}>
                    <input type="text" name="regNo" value={student.regNo}  placeholder="Registration Number" className="mp-height" readOnly />
                    {/* Rest of your form fields */}
                    <br />
                        <input type="text" name="firstName" value={student.firstName} onChange={handleInputChange}  placeholder="First Name" className="mp-height" required/>
                        <br />
                        <input type="text" name="lastName" value={student.lastName} onChange={handleInputChange} placeholder="Last Name" className="mp-height" required />
                        <br />
                        <select name="gender" value={student.gender}  onChange={handleInputChange} className="mp-height" required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <br />
                        <input type="date" name="dob" value={student.dob} onChange={handleInputChange} placeholder="Date of Birth" className="mp-height" max={(new Date()).toISOString().split('T')[0]} required />

                        <br />
                        <select name="bloodGroup" value={student.bloodGroup} onChange={handleInputChange} className="mp-height" required>
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>

                        <br />
                        <input type="text" name="contactNo" pattern="[6789][0-9]{9}"  onChange={handleInputChange} value={student.contactNo} placeholder="Contact Number" className="mp-height" required />
                        <br />
                        <input type="tel" name="parentContactNo"  pattern="[6789][0-9]{9}" onChange={handleInputChange} value={student.parentContactNo}placeholder="Parent's Contact Number" className="mp-height" required />
                        <br />
                        <input type="email" name="email" value={student.email} placeholder="Email"  onChange={handleInputChange} className="mp-height" required />
                        <br />
                        <input type="number" name="year" value={student.year}  placeholder="Current Academic Year" onChange={handleInputChange}  className="mp-height" required />
                        <br />
                        <select name="semester" value={student.semester}  className="mp-height" onChange={handleInputChange} required> 
                            <option value="">Select Semester</option>
                            <option value="even">Even</option>
                            <option value="odd">Odd</option>
                        </select>
                        <br />
                        <select name="branch" value={student.branch}  className="mp-height" onChange={handleInputChange} required>
                            <option value="">Select Branch</option>
                            <option value="CSE(H)">CSE(H)</option>
                            <option value="CSE(R)">CSE(R)</option>
                            <option value="CS&IT">CS&IT</option>
                            <option value="EEE">EEE</option>
                            <option value="ECE">ECE</option>
                            <option value="CE">CE</option>
                            <option value="ME">ME</option>
                        </select>
                        <br />
                        <input type="number" name="cgpa" value={student.cgpa} placeholder="CGPA"  onChange={handleInputChange} className="mp-height" required />
                        <br />
                    <button type="submit" className="mp-height">Update Details</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default SUpdateForm;
