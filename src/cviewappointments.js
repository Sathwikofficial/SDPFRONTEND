import React, { Component } from 'react';
import { getSession, callApi } from './main';
import './myappointment.css';

class CounsellorViewAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [], // State to store appointments data
            error: null,
        };
    }

    componentDidMount() {
        const cid = getSession("cid");
        if (!cid) {
            window.location.replace("/");
            return;
        }

        const url = "http://localhost:5000/student/myappointments";
        const data = JSON.stringify({ counselorId: cid });

        callApi("POST", url, data, this.loadInfo, this.errorResponse);
    }

    loadInfo = (res) => {
        try {
            const data = JSON.parse(res);
            this.setState({ appointments: data });
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    errorResponse(error) {
        console.error("API error:", error);
        this.setState({ error: `Error fetching appointments: ${error.message}` });
    }

    render() {
        const { appointments, error } = this.state;

        if (error) {
            return <div className="error-message">Error: {error}</div>;
        }

        if (appointments.length === 0) {
            return <div className="loading-message">No Appointments Exist!</div>;
        }

        return (
            <div className="main-container fade-in-animation">
                <h3 className="appointment-header">My Appointments</h3>
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th>Counsellor Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.regNo}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.details}</td>
                                <td>{appointment.status}</td>
                                <td>{appointment.counsellorReply}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CounsellorViewAppointments;
