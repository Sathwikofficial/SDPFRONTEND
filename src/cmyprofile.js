import React, { Component } from 'react';
import { getSession, callApi } from './main';
import './myprofile.css'; // Import the CSS file

class CMyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cprofileData: null,
            error: null
        };
    }

    componentDidMount() {
        const cid = getSession("cid");
        if (!cid) {
            window.location.replace("/");
            return;
        }

        const url = "http://localhost:5000/myprofile/cinfo";
        const data = JSON.stringify({ counselorId : cid });

        callApi("POST", url, data, this.loadInfo, this.errorResponse);
    }

    loadInfo = (res) => {
        try {
            const data = JSON.parse(res);
            this.setState({ cprofileData: data[0] });
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    render() {
        const { cprofileData, error } = this.state;

        if (error) {
            return <div className="error">Error: {error}</div>;
        }

        if (!cprofileData) {
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
                            <td>First Name</td>
                            <td>{cprofileData.firstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{cprofileData.lastName}</td>
                        </tr>
                        <tr>
                            <td>Contact No.</td>
                            <td>{cprofileData.contactNumber}</td>
                        </tr>
                        <tr>
                            <td>Email Id</td>
                            <td>{cprofileData.cklMailId}</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>{cprofileData.department}</td>
                        </tr>
                        <tr>
                            <td>Designation</td>
                            <td>{cprofileData.designation}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{cprofileData.gender}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CMyProfile;
