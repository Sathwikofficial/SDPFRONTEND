import React from "react";
import './addstudent.css';
import { callApi } from "./main";

class AddStudent extends React.Component {
    constructor() {
        super();
        this.state = {
            regNo: "",
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
            pass: this.generatePassword(),

        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
        
    }
    generatePassword() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        const length = 8;
        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }
    

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = JSON.stringify(this.state);
        const url = "http://localhost:5000/registration/signup";
        alert("Student Added Successfully");
        callApi("POST", url, data, this.handleSuccess, this.handleError);
    }

    handleError(errorMessage) {
        console.error("Error:", errorMessage);
        // Handle error, for example, show an error message to the user
    }

    handleSuccess(response) {
        alert("Student Added Successfully");
        console.log("Success:", response);
    
        // Reset state to its initial values
        this.setState({
            regNo: "",
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
            pass: this.generatePassword()
        });
    }
    

    render() {
        return (
            <div className='full-height add-student-container'>
                <div className="mpcontent">
                    <h2>Add Student</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="regNo" value={this.state.regNo} onChange={this.handleChange} placeholder="Registration Number" className="mp-height" required />
                        <br />
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name" className="mp-height" required/>
                        <br />
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" className="mp-height" required />
                        <br />
                        <select name="gender" value={this.state.gender} onChange={this.handleChange} className="mp-height" required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <br />
                        <input type="date" name="dob" value={this.state.dob} onChange={this.handleChange} placeholder="Date of Birth" className="mp-height" max={(new Date()).toISOString().split('T')[0]} required />

                        <br />
                        <select name="bloodGroup" value={this.state.bloodGroup} onChange={this.handleChange} className="mp-height" required>
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
                        <input type="text" name="contactNo" pattern="[6789][0-9]{9}" value={this.state.contactNo} onChange={this.handleChange} placeholder="Contact Number" className="mp-height" required />
                        <br />
                        <input type="tel" name="parentContactNo"  pattern="[6789][0-9]{9}" value={this.state.parentContactNo} onChange={this.handleChange} placeholder="Parent's Contact Number" className="mp-height" required />
                        <br />
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" className="mp-height" required />
                        <br />
                        <input type="number" name="year" value={this.state.year} onChange={this.handleChange} placeholder="Current Academic Year" className="mp-height" required />
                        <br />
                        <select name="semester" value={this.state.semester} onChange={this.handleChange} className="mp-height" required> 
                            <option value="">Select Semester</option>
                            <option value="even">Even</option>
                            <option value="odd">Odd</option>
                        </select>
                        <br />
                        <select name="branch" value={this.state.branch} onChange={this.handleChange} className="mp-height" required>
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
                        <input type="number" name="cgpa" value={this.state.cgpa} onChange={this.handleChange} placeholder="CGPA" className="mp-height" required />
                        <br />
                        
                        <button type="submit" className="mp-height">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddStudent;
