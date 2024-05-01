import React, { Component } from "react";
import { callApi } from "./main";
import "./assigncounsellor.css";

class AssignCounsellor extends Component {
    constructor() {
        super();
        this.state = {
            counselorIds: [],
            counselorId: "",
            studentRegNos: [],
            regNo: "",
        };

        // Bind methods
        this.handleCounselorSelectChange = this.handleCounselorSelectChange.bind(this);
        this.handleStudentSelectChange = this.handleStudentSelectChange.bind(this);
        this.handleAssignCounselor = this.handleAssignCounselor.bind(this);
        this.handleCounselorsSuccess = this.handleCounselorsSuccess.bind(this);
        this.handleStudentsSuccess = this.handleStudentsSuccess.bind(this);
        this.handleAssignSuccess = this.handleAssignSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.fetchCounselorIds();
        this.fetchStudentRegNos();
    }

    fetchCounselorIds() {
        const url = "http://localhost:5000/counselorIds";
        callApi("GET", url, null, this.handleCounselorsSuccess, this.handleError);
    }

    fetchStudentRegNos() {
        const url = "http://localhost:5000/studentregNos";
        callApi("GET", url, null, this.handleStudentsSuccess, this.handleError);
    }

    handleCounselorsSuccess(response) {
        const data = JSON.parse(response);
        this.setState({ counselorIds: data });
    }

    handleStudentsSuccess(response) {
        const data = JSON.parse(response);
        this.setState({ studentRegNos: data });
    }

    handleCounselorSelectChange(event) {
        this.setState({ counselorId: event.target.value });
    }

    handleStudentSelectChange(event) {
        this.setState({ regNo: event.target.value });
    }

    handleAssignCounselor(event) {
       
        const url = "http://localhost:5000/assigncounselor";
        const { counselorId, regNo } = this.state;
        const data = JSON.stringify({ counselorId, regNo });
       
        callApi("POST", url, data, this.handleAssignSuccess, this.handleError);
    }

    handleAssignSuccess(response) {
        console.log("API Response:", response); // Log the response for debugging
        alert("Counselor assigned successfully.");
    }
    

    handleError(errorMessage) {
        console.error("Error:", errorMessage);
        alert("An error occurred while assigning the counselor. Please try again.");
    }

    render() {
        const { counselorIds, studentRegNos, counselorId, regNo } = this.state;

        return (
            <div className="assign-counsellor-container">
                <h2>Assign Counselor</h2>
                <form onSubmit={this.handleAssignCounselor}>
                    <select value={counselorId} onChange={this.handleCounselorSelectChange} required>
                        <option value="">Select Counselor</option>
                        {counselorIds.map((counselor, index) => (
                            <option key={index} value={counselor.counselorId}>
                                {counselor.counselorId} - {counselor.firstName} {counselor.lastName}
                            </option>
                        ))}
                    </select>
                    <br />
                    <select value={regNo} onChange={this.handleStudentSelectChange} required>
                        <option value="">Select Student</option>
                        {studentRegNos.map((student, index) => (
                            <option key={index} value={student.regNo}>
                                {student.regNo} - {student.firstName} {student.lastName}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button type="submit">Assign Counselor</button>
                </form>
            </div>
        );
    }

}

export default AssignCounsellor;
