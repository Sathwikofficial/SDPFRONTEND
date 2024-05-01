import React from "react";
import './shome.css';
import { callApi, errorResponse, getSession } from './main';

class SHome extends React.Component {
    constructor() {
        super();
        this.sid = getSession("sid");
        if (this.sid === "") {
            window.location.replace("/");
        }
        var url = "http://localhost:5000/studenthome/uname";
        var data = JSON.stringify({
            regNo: this.sid
        });
        callApi("POST", url, data, this.loadUname, errorResponse);
    }

    loadUname(res) {
        var data = JSON.parse(res);
        var HL1 = document.getElementById("HL1");
        HL1.innerText = `${data[0].regNo}`;
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
                        <div className="text">Projects & Consultancy</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SHome;
