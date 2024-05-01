import React, { Component } from 'react';
import { getSession, callApi } from './main';
import './sappointment.css';

class StudentBookAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CounsellorData: null,
            error: null,
            appointmentDate: '',
            appointmentTime: '',
            appointmentDetails: '',
            bookingError: null,
            bookingStatus: 'pending', // Initial booking status set to "pending"
            regNo: null, // New state to store the student's registration number
            counsellorReply: '' // Initialize counsellorReply as an empty string
        };
    }

    componentDidMount() {
        const sid = getSession("sid");
        if (!sid) {
            window.location.replace("/");
            return;
        }

        this.setState({ regNo: sid }); // Store the student's registration number

        const url = "http://localhost:5000/student/counsellor";
        const data = JSON.stringify({ regNo: sid });

        callApi("POST", url, data, this.loadInfo, this.errorResponse);
    }

    loadInfo = (res) => {
        try {
            const data = JSON.parse(res);
            
            this.setState({ CounsellorData: data[0]  });
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    handleDateChange = (e) => {
        this.setState({ appointmentDate: e.target.value });
    };

    handleTimeChange = (e) => {
        this.setState({ appointmentTime: e.target.value });
    };

    handleDetailsChange = (e) => {
        this.setState({ appointmentDetails: e.target.value });
    };

    handleBooking = () => {
        const { appointmentDate, appointmentTime, appointmentDetails, regNo } = this.state;
        const counselorId = this.state.CounsellorData?.counselorId;

        // Check if all necessary fields are filled
        if (!appointmentDate || !appointmentTime) {
            this.setState({ bookingError: "Please select both date and time." });
            return;
        }

        if (!appointmentDetails) {
            this.setState({ bookingError: "Please provide a reason for the appointment." });
            return;
        }

        if (!counselorId) {
            this.setState({ bookingError: "Counselor information not loaded." });
            return;
        }


        
        // Prepare data for booking
        const appointmentData = {
            counselorId: counselorId,
            regNo : regNo,
            date: appointmentDate,
            time: appointmentTime,
            details: appointmentDetails,
            status: "pending",
            counsellorReply : ""
        };
        console.log("Appointment data being sent:", appointmentData); // Debug log
        // Make a call to API to book the appointment
        const url = "http://localhost:5000/student/appointment";
        const data = JSON.stringify(appointmentData);

        callApi("POST", url, data, this.handleBookingSuccess, this.handleBookingError);
    };

    handleBookingSuccess = (response) => {
        alert("Appointment booked successfully:");
    
        // Clear the booking error and reset the form fields
        this.setState({
            bookingError: null, // Clear the booking error
            appointmentDate: '', // Reset the date field
            appointmentTime: '', // Reset the time field
            appointmentDetails: '' // Reset the details field
        });
    };
    

    handleBookingError = (error) => {
        this.setState({ bookingError: "Error booking appointment. Please try again later." });
    };

    getCurrentDateTime() {
        const currentDate = new Date();
        
        // Get the date and format it as YYYY-MM-DD
        const currentDateFormatted = currentDate.toISOString().split('T')[0];

        // Get the time and format it as HH:MM
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const currentTimeFormatted = `${hours}:${minutes}`;

        return {
            currentDateFormatted,
            currentTimeFormatted
        };
    }
    

    render() {
        const {
            CounsellorData,
            error,
            appointmentDate,
            appointmentTime,
            appointmentDetails,
            bookingError
        } = this.state;

        if (error) {
            return <div className="error">Error: {error}</div>;
        }

        if (!CounsellorData) {
            return <div className="loading"><h3>Counsellor Was Not Allotted To Schedule Your Appointment.</h3></div>;
        }

        const { currentDateFormatted, currentTimeFormatted } = this.getCurrentDateTime();

        return (
            <div className="appointment-container"> {/* Apply the container class */}
                <div className="appointment-form"> {/* Wrap form in a div with the form class */}
                    <div>
                        <label>Date:</label>
                        <input
                            type="date"
                            value={appointmentDate}
                            onChange={this.handleDateChange}
                            min={currentDateFormatted}
                        />
                    </div>
                    <div>
                        <label>Time:</label>
                        <input
                            type="time"
                            value={appointmentTime}
                            onChange={this.handleTimeChange}
                            min={appointmentDate === currentDateFormatted ? currentTimeFormatted : ''}
                            
                        />
                    </div>
                    <div>
                        <label>Reason:</label>
                        <textarea
                            value={appointmentDetails}
                            onChange={this.handleDetailsChange}
                            required
                        />
                    </div>
                    {bookingError && (
                        <div className="error" >{bookingError}</div>
                    )}
                    <button onClick={this.handleBooking}>Book Appointment</button>
                </div>
            </div>
        );
    }
}

export default StudentBookAppointment;