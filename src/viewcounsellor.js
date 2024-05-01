import React from "react";
import { callApi } from "./main";
import "./viewcounsellor.css"; // Import CSS file for styling

class ViewCounsellor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counsellors: [],
            searchQuery: "",
            sortBy: null,
            sortAsc: true
        };
    }

    componentDidMount() {
        this.fetchCounsellors();
    }

    fetchCounsellors() {
        const url = "http://localhost:5000/viewcounsellor/details";
        callApi("GET", url, null, this.handleSuccess, this.handleError);
    }

    handleSuccess = (response) => {
        const data = JSON.parse(response);
        this.setState({ counsellors: data });
    };

    handleError = (error) => {
        console.error("Error fetching counsellor details:", error);
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSort = (column) => {
        const { sortBy, sortAsc } = this.state;
        if (sortBy === column) {
            this.setState({ sortAsc: !sortAsc });
        } else {
            this.setState({ sortBy: column, sortAsc: true });
        }
    };

    render() {
        const { counsellors, searchQuery, sortBy, sortAsc } = this.state;
        let sortedCounsellors = [...counsellors];
        
        if (sortBy) {
            sortedCounsellors.sort((a, b) => {
                const comparison = a[sortBy].localeCompare(b[sortBy]);
                return sortAsc ? comparison : -comparison;
            });
        }

        const filteredCounsellors = sortedCounsellors.filter(counsellor =>
            counsellor.counselorId.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className='full-height'>
                <div className="vccontent">
                    <h2>View Counsellors</h2>
                    <input
                        type="text"
                        placeholder="Search by Faculty ID"
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        className="search-input"
                    />
                    <table className="counsellor-table">
                        <thead>
                            <tr>
                                <th onClick={() => this.handleSort("counselorId")} style={{ cursor: 'pointer' }}>Faculty ID</th>
                                <th onClick={() => this.handleSort("firstName")} style={{ cursor: 'pointer' }}>Full Name</th>
                                <th onClick={() => this.handleSort("gender")} style={{ cursor: 'pointer' }}>Gender</th>
                                <th onClick={() => this.handleSort("contactNumber")} style={{ cursor: 'pointer' }}>Contact No.</th>
                                <th onClick={() => this.handleSort("cklMailId")} style={{ cursor: 'pointer' }}>KL Email</th>
                                <th onClick={() => this.handleSort("department")} style={{ cursor: 'pointer' }}>Department</th>
                                <th onClick={() => this.handleSort("designation")} style={{ cursor: 'pointer' }}>Designation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCounsellors.map((counsellor, index) => (
                                <tr key={index}>
                                    <td>{counsellor.counselorId}</td>
                                    <td>{counsellor.firstName} {counsellor.lastName}</td>
                                    <td>{counsellor.gender}</td>
                                    <td>{counsellor.contactNumber}</td>
                                    <td>{counsellor.cklMailId}</td>
                                    <td>{counsellor.department}</td>
                                    <td>{counsellor.designation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ViewCounsellor;
