import React, { Component } from 'react';
import { getSession, callApi } from './main';
import './myappointment.css';

class CounsellorAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cAppointmentData: [],
            pendingAppointments: [], // State for filtered appointments
            error: null,
            formErrors: {}, // Store form errors for each appointment
        };

        // Bind methods to the component instance
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleReplyChange = this.handleReplyChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveSuccess = this.handleSaveSuccess.bind(this);
        this.errorResponse = this.errorResponse.bind(this);
        this.refreshAppointmentsList = this.refreshAppointmentsList.bind(this);
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
            this.setState({
                cAppointmentData: data,
                pendingAppointments: data.filter(appointment => appointment.status === "pending"),
            });
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    handleStatusChange(index, event) {
        const updatedAppointments = [...this.state.cAppointmentData];
        updatedAppointments[index].status = event.target.value;
        this.setState({ cAppointmentData: updatedAppointments });
    }

    handleReplyChange(index, event) {
        const updatedAppointments = [...this.state.cAppointmentData];
        updatedAppointments[index].counsellorReply = event.target.value;
        this.setState({ cAppointmentData: updatedAppointments });
    }

    validateForm = (appointment) => {
        let formErrors = {};
        if (!appointment.status) {
            formErrors.status = "Status is required.";
        }
        if (!appointment.counsellorReply) {
            formErrors.counsellorReply = "Counsellor reply is required.";
        }
        return formErrors;
    };

    handleSave(index) {
        const appointment = this.state.cAppointmentData[index];

        // Validate the form data
        const formErrors = this.validateForm(appointment);
        if (Object.keys(formErrors).length > 0) {
            this.setState((prevState) => {
                const updatedFormErrors = { ...prevState.formErrors };
                updatedFormErrors[index] = formErrors;
                return { formErrors: updatedFormErrors };
            });
            return;
        }

        const url = `http://localhost:5000/student/updateappointment/${appointment.regNo}`;
        const data = JSON.stringify({
            status: appointment.status,
            counsellorReply: appointment.counsellorReply,
        });

        callApi("PUT", url, data, () => this.handleSaveSuccess(index), this.errorResponse);
    }

    handleSaveSuccess(index) {
        if (index < 0 || index >= this.state.cAppointmentData.length) {
            console.error("Invalid index provided for updating appointments.");
            return;
        }

        // Update the cAppointmentData state
        this.setState((prevState) => {
            const updatedCAppointmentData = [...prevState.cAppointmentData];
            updatedCAppointmentData[index].status = this.state.cAppointmentData[index].status;
            updatedCAppointmentData[index].counsellorReply = this.state.cAppointmentData[index].counsellorReply;

            // Update the pendingAppointments state
            const updatedPendingAppointments = prevState.pendingAppointments.filter(
                (appointment, i) => appointment._id !== this.state.cAppointmentData[index]._id
            );

            return {
                cAppointmentData: updatedCAppointmentData,
                pendingAppointments: updatedPendingAppointments,
            };
        });

        console.log("Appointment updated successfully");

        // Refresh the appointments list
        this.refreshAppointmentsList();
    }

    refreshAppointmentsList() {
        const cid = getSession("cid");
        if (!cid) {
            window.location.replace("/");
            return;
        }

        const url = "http://localhost:5000/student/myappointments";
        const data = JSON.stringify({ counselorId: cid });

        callApi("POST", url, data, this.loadInfo, this.errorResponse);
    }

    errorResponse(error) {
        console.error("API error:", error);
        this.setState({ error: `Error updating appointment: ${error.message}` });
    }

    render() {
        const { pendingAppointments, error, formErrors } = this.state;

        if (error) {
            return <div className="error-message">Error: {error}</div>;
        }

        if (pendingAppointments.length === 0) {
            return <div className="loading-message">No Pending Appointments Exist!</div>;
        }

        return (
            <div className="main-container fade-in-animation">
                <h3 className="appointment-header">My Appointments (Pending)</h3>
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th>Counsellor Feedback</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingAppointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.regNo}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.details}</td>
                                <td>
                                    <select
                                        value={appointment.status}
                                        onChange={(e) => this.handleStatusChange(index, e)}
                                    >
                                        <option value="">Select status</option>
                                        <option value="Accept">Accept</option>
                                        <option value="Reject">Reject</option>
                                    </select>
                                    {formErrors[index] && formErrors[index].status && (
                                        <div className="error-message">{formErrors[index].status}</div>
                                    )}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={appointment.counsellorReply}
                                        onChange={(e) => this.handleReplyChange(index, e)}
                                    />
                                    {formErrors[index] && formErrors[index].counsellorReply && (
                                        <div className="error-message">{formErrors[index].counsellorReply}</div>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => this.handleSave(index)}>Save</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CounsellorAppointments;
