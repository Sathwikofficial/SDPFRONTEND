import React, { Component } from 'react';
import { getSession, callApi } from './main';
import './myprofile.css'; // Import the CSS file

class SMyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: null,
            error: null
        };
    }

    componentDidMount() {
        const sid = getSession("sid");
        if (!sid) {
            window.location.replace("/");
            return;
        }

        const url = "http://localhost:5000/myprofile/sinfo";
        const data = JSON.stringify({ regNo: sid });

        callApi("POST", url, data, this.loadInfo, this.errorResponse);
    }

    loadInfo = (res) => {
        try {
            const data = JSON.parse(res);
            this.setState({ profileData: data[0] });
        } catch (error) {
            this.setState({ error: "Error parsing response." });
        }
    };

    render() {
        const { profileData, error } = this.state;

        if (error) {
            return <div className="error">Error: {error}</div>;
        }

        if (!profileData) {
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
                            <td>{profileData.firstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{profileData.lastName}</td>
                        </tr>
                        <tr>
                            <td>Contact No.</td>
                            <td>{profileData.contactNo}</td>
                        </tr>
                        <tr>
                            <td>Email Id</td>
                            <td>{profileData.email}</td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td>{profileData.year}</td>
                        </tr>
                        <tr>
                            <td>Semester</td>
                            <td>{profileData.semester}</td>
                        </tr>
                        <tr>
                            <td>Branch</td>
                            <td>{profileData.branch}</td>
                        </tr>
                        <tr>
                            <td>CGPA</td>
                            <td>{profileData.cgpa}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SMyProfile;
