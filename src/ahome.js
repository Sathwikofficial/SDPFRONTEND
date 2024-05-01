import React from "react";
import './ahome.css';


class AHome extends React.Component {
    render() {
        return (
            <div>
                <div className="all">
                    
                    <div className="aleft">
                        <div className="text">STUDENTS</div>
                    </div>
                    <div className="acenter">
                        <div className="explainer"><span>Welcome Admin</span></div>
                        <div className="text">ADMIN </div>
                    </div>
                    <div className="aright">
                        <div className="text">COUNSELLORS</div>
                    </div>
                   
                </div>
                
            </div>
        );
    }
}

export default AHome;

