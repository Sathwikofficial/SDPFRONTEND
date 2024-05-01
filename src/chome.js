import React from "react";
import './chome.css';
import { callApi, errorResponse, getSession } from './main';

class CHome extends React.Component {
    constructor() {
        super();
        this.cid = getSession("cid");
        if (this.cid === "") {
            window.location.replace("/");
        }
        var url = "http://localhost:5000/counsellorhome/uname";
        var data = JSON.stringify({
            counselorId: this.cid
        });
        callApi("POST", url, data, this.loadUname, errorResponse);
    }

    loadUname(res) {
        var data = JSON.parse(res);
        var HL1 = document.getElementById("HL1");
        HL1.innerText = `${data[0].firstName} ${data[0].lastName}`
    }

    render() {
        return (
            <div>
                <div className="all">
                    <div className="left">
                        <div className="text">Journals & Conferences</div>
                    </div>
                    <div className="center">
                        <div className="explainer">
                            <span>Welcome </span>
                            {'  '} {/* Space added here */}
                            <span id="HL1"></span>
                        </div>
                        <div className="text">Awards & Recognitions</div>
                    </div>
                    <div className="right">
                        <div className="text">Research Papers</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CHome;
