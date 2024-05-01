import React from 'react'
import './home.css'
import logouticon from './images/logout.png'
import klulogoicon from './images/klulogo3.png'
import {callApi, errorResponse,getSession,setSession } from './main';

export function loadMenu(res)
{
    var data = JSON.parse(res);
    var menuitems = "";
    menuitems += `<li>
                    <label id='homeL'>Home <i class="menuhome-icon"></i> </label>
                  </li>`;
    for(var x in data)
    {
        menuitems += `<li >
                        <label id='${data[x].mid}L' style='padding-left: 10px;' >${data[x].mtitle} <i class="dropdown-icon"></i>  </label>
                        <div id='${data[x].mid}' class='smenu'></div>
                      </li>`;
    }
    var mlist = document.getElementById('mlist');
    mlist.innerHTML = menuitems;
    document.getElementById('homeL').addEventListener("click", loadHomeModule);
    for(x in data)
    {
        document.getElementById(`${data[x].mid}L`).addEventListener("click", showSMenu.bind(null, data[x].mid));
    }
}

export function loadHomeModule() {
    var titlebar = document.getElementById('titlebar');
    var module = document.getElementById('module');
 
    // Set the content for the "Home" module
    module.src = "/shome";
    titlebar.innerText = "Home"; // Change the title to indicate the home page
    module.className = 'module-home'; // Apply a specific class for styling if needed
 }

 export function showSMenu(mid) {
    var surl = "http://localhost:5000/studenthome/studentmenus";
    var ipdata = JSON.stringify({
        mid: mid
    });

    // Close any open submenus with animation
    var openSubmenus = document.querySelectorAll('.smenu');
    openSubmenus.forEach(smenu => {
        if (smenu.id !== mid && smenu.classList.contains('active')) {
            smenu.style.maxHeight = '0'; // Ensure the menu is closed
            setTimeout(() => {
                smenu.classList.remove('active'); // Remove active class after closing
            }, 900); // Adjust the timeout to match transition duration
        }
    });

    // Check if the clicked menu is already active
    var clickedMenu = document.getElementById(mid);
    if (clickedMenu.classList.contains('active')) {
        clickedMenu.style.maxHeight = '0'; // Close the submenu
        setTimeout(() => {
            clickedMenu.classList.remove('active'); // Remove active class after closing
        }, 900); // Adjust the timeout to match transition duration
    } else {
        // Show loading indicator while fetching submenu data
        var smenu = document.getElementById(mid);

        callApi("POST", surl, ipdata, function(res) {
            loadSMenu(res);
            // After loading submenu data, open the submenu with animation
            setTimeout(() => {
                smenu.style.maxHeight = smenu.scrollHeight + 'px'; // Set max-height to show the menu
                smenu.classList.add('active'); // Add active class after opening
            }, 100); // Add a small delay before adjusting max-height
        }, errorResponse);
    }
}




export function loadSMenu(res) {
    var data = JSON.parse(res);
    var smenuitems = "";
    for (var x in data) {
        smenuitems += `<label id='${data[x].smid}' class='submenu-item' data-description='${data[x].description}'>${data[x].smtitle} <i class="smenudropdown-icon"></i></label>`;
    }
    var smenu = document.getElementById(`${data[x].mid}`);
    smenu.innerHTML = smenuitems;

    for (x in data) {
        var submenuItem = document.getElementById(`${data[x].smid}`);
        submenuItem.addEventListener("click", loadModule.bind(null, data[x].smid)); // Add click event listener
        submenuItem.addEventListener("mouseover", showDescription.bind(null, submenuItem)); // Add mouseover event listener
        submenuItem.addEventListener("mouseout", hideDescription); // Add mouseout event listener
    }
}

// Function to show the description tooltip
function showDescription(element) {
    var description = element.getAttribute('data-description');
    var tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = description;
    element.appendChild(tooltip);
}

// Function to hide the description tooltip
function hideDescription(event) {
    var tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}


export function loadModule(smid)
{
   var titlebar = document.getElementById('titlebar');
   var module = document.getElementById('module');

   switch(smid)
   {
        case "10302":
            
             module.src = "/schangepassword";
             titlebar.innerText = "Change Password";
              break;

        case "10301":
            
              module.src = "/smyprofile";
              titlebar.innerText = "My Profile";
               break;
        case "10201":
            
               module.src = "/smycounsellor";
               titlebar.innerText = "My Counsellor Details";
               break;

        case "10202":
            
               module.src = "/studentbookappointment";
               titlebar.innerText = "Schedule Appointment";
               break;

        case "10203":
            
               module.src = "/smyappointments";
               titlebar.innerText = "My Appointment History";
               break;
        
        default:
            module.src = "";
            titlebar.innerText = "";
   }
   module.className = 'module-' + smid;
}

class StudentHome extends React.Component
{

    constructor()
    {
        super()
        this.sid =getSession("sid");
        //alert(this.sid);
        if(this.sid ==="")
            window.location.replace("/");

        var url = "http://localhost:5000/studenthome/uname";
        var data = JSON.stringify({

            regNo : this.sid 
        });
        callApi("POST",url,data,this.loadUname,errorResponse);


         url = "http://localhost:5000/studenthome/studentmenu";
        callApi("POST", url, "", loadMenu, loadMenuError);

        
    }

    componentDidMount() {
        
        loadHomeModule();
    }


    loadUname(res)  
    {
    var data =JSON.parse(res);
    var HL1 = document.getElementById("HL1");
    HL1.innerText = `${data[0].regNo}`
    } 
    
    logout()
    {   setSession("sid","",-1);
        window.location.replace("/");
    }
            

    render()
    {
        return(
            <div className='full-height'>
              
                <div className='firstheader'>
                <a href='https://www.kluniversity.in/' target="_blank" rel="noreferrer" ><img src={klulogoicon} alt='' className='HS6' /></a>

                    <label className='HS5'>Student Portal </label>
                    <label className='HS7'>- SMS</label>
                    <label id='HL1'  className='HS4'></label>
                </div>
                <div className='secondheader'>
                    
                <label className='HS2' onClick={this.logout}>Logout</label>
                    <img src={logouticon} alt='' className='HS3' onClick={this.logout} />
                </div>
            
                <div className='content'>
                    <div className='menubar'>
                    <div className='menu'>
                            <nav><ul id='mlist' className='mlist'></ul></nav>
                        </div>
                        </div>
                    <div className='outlet'>
                    <div id='titlebar'></div>
                        <iframe id='module' src="" title="Module iframe"></iframe> 
                    </div>
                    </div>
                
                
                <div className='footer'>
                © Copyright 2024 by K L Deemed to be University. All Rights Reserved
                </div>
            </div>
        );
    }
}

export default StudentHome;
export function loadMenuError(res) {
    
    console.error("Error occurred while loading menu:", res);
}