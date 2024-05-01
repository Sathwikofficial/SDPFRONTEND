import React, { useState, useEffect } from "react";
import { callApi } from "./main";
import { useParams } from "react-router-dom";
import "./addcounsellor.css";
import axios from 'axios';

function CUpdateForm() {
    const { counselorId } = useParams(); // Extracting counselorId using useParams hook
    const [counsellor, setCounsellor] = useState({
        counselorId: counselorId,
        firstName: "",
        lastName: "",
        gender: "",
        cklMailId: "",
        contactNumber: "",
        department: "",
        designation: "",
    });

    // Include both counselorId and counsellor in the dependency array
    useEffect(() => {
        axios.get(`http://localhost:5000/counsellordetails/${counselorId}`)
            .then(res => {
                // Use a functional update in setCounsellor
                setCounsellor(prevCounsellor => ({
                    ...prevCounsellor,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    gender: res.data.gender,
                    contactNumber: res.data.contactNumber,
                    cklMailId: res.data.cklMailId,
                    department: res.data.department,
                    designation: res.data.designation
                }));
            })
            .catch(err => console.error(err));
    }, [counselorId]); // Include counselorId as dependency

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCounsellor(prevCounsellor => ({
            ...prevCounsellor,
            [name]: value
        }));
    };

    const handleError = (errorMessage) => {
        console.error("Error:", errorMessage);
        // Handle error, for example, show an error message to the user
    };

    const handleSuccess = (responseData) => {
        alert("Counselor details updated successfully");
        // You can add any further handling logic here, such as showing a success message to the user
    };

    const updateDetails = (event) => {
        event.preventDefault();
        const data = JSON.stringify(counsellor);
        const url = `http://localhost:5000/updatecounsellor/${counselorId}`;
        callApi("PUT", url, data, handleSuccess, handleError);
    };

    const handleBackButtonClick = () => {
        window.location.href = '/updatecounsellor';
    };

    return (
        <div>
            <button onClick={handleBackButtonClick} className="back-button">Back</button>
            <div className='full-height add-counsellor-container'>
                <div className="mpcontent">
                    <h2>Update Counselor</h2>
                    <form onSubmit={updateDetails}>
                        <input type="text" name="counselorId" value={counsellor.counselorId} onChange={handleInputChange} placeholder="Existing Faculty ID" className="ac-height" readOnly />
                        <br />
                        <input type="text" name="firstName" value={counsellor.firstName} onChange={handleInputChange} placeholder="First Name" className="ac-height" required />
                        <br />
                        <input type="text" name="lastName" value={counsellor.lastName} onChange={handleInputChange} placeholder="Last Name" className="ac-height" required />
                        <br />
                        <select name="gender" value={counsellor.gender} onChange={handleInputChange} className="ac-height" required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <br />
                        <input type="email" name="cklMailId" value={counsellor.cklMailId} onChange={handleInputChange} placeholder="KLU Email" className="ac-height" required />
                        <br />
                        <input type="tel" name="contactNumber" value={counsellor.contactNumber} onChange={handleInputChange} placeholder="Contact Number" className="ac-height" required />
                        <br />
                        <select name="department" value={counsellor.department} onChange={handleInputChange} className="ac-height" required>
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
                        <select name="designation" value={counsellor.designation} onChange={handleInputChange} className="ac-height" required>
                            <option value="">Select Designation</option>
                            <option value="Assistant Professor">Assistant Professor</option>
                            <option value="Associate Professor">Associate Professor</option>
                            <option value="Professor">Professor</option>
                        </select>
                        <br />
                        <button type="submit" className="ac-height">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CUpdateForm;
