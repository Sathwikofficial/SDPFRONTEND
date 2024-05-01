import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import StudentHome from './studenthome';
import CounsellorHome from './counsellorhome';
import AdminHome from './adminhome';
import AddStudent from './addstudent';
import ViewStudent from './viewstudent'
import ViewCounsellor from './viewcounsellor'
import DeleteCounsellor from './deletecounsellor'
import AddCounsellor from './addcounsellor';
import DeleteStudent from './deletestudent';
import AHome from './ahome';
import SHome from './shome';
import SChangePassword from './schangepassword';
import CChangePassword from './cchangepassword';
import SMyProfile from './smyprofile';
import CMyProfile from './cmyprofile';
import CHome from './chome';
import AssignCounsellor from './assigncounsellor';
import UpdateStudent from './updatestudent';
import SUpdateForm from './supdateform';
import CUpdateForm from './cupdateform';
import UpdateCounsellor from './updatecounsellor';
import StudentBookAppointment from './studentbookappointments';
import SMyCounsellor from './smycounsellor';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SMyAppointments from './smyappointments';
import CMyStudents from './cmystudents';
import CounsellorAppointments from './counsellorappointment';
import CounsellorViewAppointments from './cviewappointments';



function Website(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
          <Route path="/studenthome" element={<StudentHome/>} />
          <Route path="/counsellorhome" element={<CounsellorHome/>} />
          <Route path="/adminhome" element={<AdminHome/>} />
          <Route path="/ahome" element={<AHome/>}/>
          <Route path="/shome" element={<SHome/>}/>
          <Route path="/chome" element={<CHome/>}/>
          <Route path="/addstudent" element={<AddStudent/>}/>
          <Route path="/viewstudent" element={<ViewStudent/>}/>
          <Route path="/deletecounsellor" element={<DeleteCounsellor/>}/>
          <Route path="/deletestudent" element={<DeleteStudent/>}/>
          <Route path="/updatestudent" element={<UpdateStudent/>}/>
          <Route path="/viewcounsellor" element={<ViewCounsellor/>}/>
          <Route path="/addcounsellor" element={<AddCounsellor/>}/>
          <Route path="/schangepassword" element={<SChangePassword/>}/>
          <Route path="/cchangepassword" element={<CChangePassword/>}/>
          <Route path="/smyprofile" element={<SMyProfile/>}/>
          <Route path="/cmyprofile" element={<CMyProfile/>}/>
          <Route path="/assigncounsellor" element ={<AssignCounsellor/>}/>
          <Route path="/supdateform/:regNo" element={<SUpdateForm />}/> 
          <Route path="/cupdateform/:counselorId" element={<CUpdateForm />}/> 
          <Route path="/updatecounsellor" element={<UpdateCounsellor/>}/>
          <Route path="/studentbookappointment" element={<StudentBookAppointment/>}/>
          <Route path="/smyappointments" element={<SMyAppointments/>}/>
          <Route path='/smycounsellor' element={<SMyCounsellor/>}/>
          <Route path='/cmystudents' element={<CMyStudents/>}/>
          <Route path='/counsellorappointment' element={<CounsellorAppointments/>}/>
          <Route path='/cviewappointments' element={<CounsellorViewAppointments/>}/>
          
          
          
          
      </Routes>
    </BrowserRouter>

    
  );
}

ReactDOM.render(<Website/>, document.getElementById('root'));