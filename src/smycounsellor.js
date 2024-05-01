import React, { Component } from 'react';
import { getSession, callApi } from './main';
import './smycounsellor.css'; // Import the CSS file

class SMyCounsellor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyCounsellorData: null,
            CounsellorData: null,
            error: null
        };
    }

    componentDidMount() {
        const sid = getSession("sid");
        if (!sid) {
            window.location.replace("/");
            return;
        }

        // Fetching student's counselor data
        let url = "http://localhost:5000/student/counsellor";
        let data = JSON.stringify({ regNo: sid });

        callApi("POST", url, data, this.loadInfo, this.errorResponse);

        // Ensure `MyCounsellorData` is loaded before making the next API call
        if (this.state.MyCounsellorData) {
            url = "http://localhost:5000/student/counsellorinfo";
            data = JSON.stringify({ counselorId: this.state.MyCounsellorData.counselorId });

            callApi("POST", url, data, this.loadCounsellorInfo, this.errorResponse);
        }
    }

    loadInfo = (res) => {
        try {
            const data = JSON.parse(res);
            this.setState({ MyCounsellorData: data[0] }, () => {
                // Now that `MyCounsellorData` is set, make the next API call
                this.fetchCounsellorInfo();
            });
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    fetchCounsellorInfo() {
        const { MyCounsellorData } = this.state;

        if (MyCounsellorData) {
            const url = "http://localhost:5000/student/counsellorinfo";
            const data = JSON.stringify({ counselorId: MyCounsellorData.counselorId });

            callApi("POST", url, data, this.loadCounsellorInfo, this.errorResponse);
        }
    }

    loadCounsellorInfo = (res) => {
        try {
            const data = JSON.parse(res);
            this.setState({ CounsellorData: data[0] });
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    errorResponse = (error) => {
        this.setState({ error: "An error occurred while fetching data." });
    };

    render() {
        const { CounsellorData, error } = this.state;
    
        if (error) {
            return (
                <div className="mycounsellor-error">
                    <h3>Error: {error}</h3>
                </div>
            );
        }
    
        if (!CounsellorData) {
            return <div className="mycounsellor-loading-message">
                <h3>No Counsellor Allotted</h3> </div>;
        }
    
        return (
            <div className='mycounsellor-container fade-in'> {/* Apply container and animation classes */}
                <h3>My Counsellor Information</h3>
                <table className='mycounsellor-table'> {/* Apply professional table styles */}
                    <tbody>
                        <tr>
                            <th>Attribute</th>
                            <th>Details</th>
                        </tr>
                        <tr>
                            <td>Full Name</td>
                            <td>{CounsellorData.firstName} {CounsellorData.lastName}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{CounsellorData.cklMailId}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{CounsellorData.contactNumber}</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>{CounsellorData.department}</td>
                        </tr>
                        <tr>
                            <td>Designation</td>
                            <td>{CounsellorData.designation}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
    
}

export default SMyCounsellor;
