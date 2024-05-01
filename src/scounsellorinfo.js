import React, { Component } from 'react';
import { getSession, callApi } from './main';
import './myprofile.css'; // Import the CSS file

class StudentBookAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

        const url = "http://localhost:5000/student/counsellor";
        const data = JSON.stringify({ regNo: sid });

        callApi("POST", url, data, this.loadInfo, this.errorResponse);
    }

    loadInfo = (res) => {
        try {
            const data = JSON.parse(res);
            this.setState({ CounsellorData: data[0] });
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    render() {
        const { CounsellorData, error } = this.state;

        if (error) {
            return <div className="error">Error: {error}</div>;
        }

        if (!CounsellorData) {
            return <div className="loading">Loading...</div>;
        }

        return (
            <div className='container fade-in'> {/* Apply container and animation classes */}
                <h3>User Profile</h3>
                <table className='profile-table'> {/* Apply professional table styles */}
                    <tbody>
                        <tr>
                            <th>Attribute</th>
                            <th>Details</th>
                        </tr>
                        <tr>
                            <td>COunsellor Name</td>
                            <td>{CounsellorData.counselorId}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentBookAppointment;
