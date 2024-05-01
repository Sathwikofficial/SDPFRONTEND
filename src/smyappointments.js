import React, { Component } from 'react';
import { getSession, callApi } from './main';
import './myappointment.css';

class SMyAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sAppointmentData: [],
            error: null
        };
    }

    componentDidMount() {
        const sid = getSession("sid");
        if (!sid) {
            window.location.replace("/");
            return;
        }

        const url = "http://localhost:5000/student/myappointments";
        const data = JSON.stringify({ regNo: sid });

        callApi("POST", url, data, this.loadInfo, this.errorResponse);
    }

    loadInfo = (res) => {
        try {
            const data = JSON.parse(res);
            this.setState({ sAppointmentData: data });
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    render() {
        const { sAppointmentData, error } = this.state;

        if (error) {
            return <div className="error-message">Error: {error}</div>;
        }

        if (sAppointmentData.length === 0) {
            return <div className="loading-message">No Appointments Exist....!</div>;
        }

        return (
            <div className="main-container fade-in-animation">
                <h3 className="appointment-header">My Appointments</h3>
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th>Counsellor Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sAppointmentData.map((appointment, index) => (
                            <tr key={index}>
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

export default SMyAppointments;
