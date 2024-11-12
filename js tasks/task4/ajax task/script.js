// a. Retrieve user data and display
document.getElementById('dispaly-btn').addEventListener('click', ()=>{
let userId = document.getElementById('userId').value;

  //Create an object of AJAX
  let xhr = new XMLHttpRequest();
  xhr.onload = function() { // execute the request
    if (this.status >= 200 && this.status <300) { // success response
      // get user data from the api 
      let userData = JSON.parse(this.responseText); 
      document.getElementById('userData').classList.add('data');
      //set the user data to userData div
      document.getElementById('userData').innerHTML = `
        <h2>${userData.data.first_name} ${userData.data.last_name}</h2>
        <img src="${userData.data.avatar}" alt="User Image">
      `;
    }
    else { // error response
      document.body.innerHTML = (`Error: ${this.status}`);
    }
  };
  // open and send the response to the server
  xhr.open('GET', 'https://reqres.in/api/users/' + userId);
  xhr.send();
});




//----------------------------------------------------------------
//  b. Use this web API: https://reqres.in/api/users to return all users data, and make a dropdown list and fill it with students name returning form the API. (Loop on them and display all users).
// c. When user selects specific user (onchange event), display his data and image below the dropdown list.

let dropdown = document.getElementById('user-dropdown');
// Create an object of AJAX
let xhr = new XMLHttpRequest();
xhr.onload = function() { // execute the request
  if (this.status >= 200 && this.status <300) { // success response
    // get user data from the api
    let userData = JSON.parse(this.responseText); //return array of object
    
    // loop on the users data
    userData.data.forEach(user => {
      // create an option for each user
      let option = document.createElement('option');
      option.value = user.id;
      option.innerHTML = user.first_name +' '+ user.last_name;
      dropdown.appendChild(option);
    });

    // add an event listener to the dropdown to display the selected user data
    dropdown.onchange = function(){
      let id = this.value; //set the user id (after chang the option) in id variable
      document.getElementById('userData2').classList.add('data');
      //set the user data to userData div

      //data[id -1] select the user index in the array of object (first way to solution)
      // document.getElementById('userData2').innerHTML = `
      //   <h2>${userData.data[id -1].first_name}  ${userData.data[id -1].last_name}</h2>
      //   <img src="${userData.data[id -1].avatar}" alt="User Image">
      // `;
  
      for(let i = 0; i < userData.data.length; i++) { //second way to solution
        if(userData.data[i].id == id){
          document.getElementById('userData2').innerHTML = `
          <h2>${userData.data[i].first_name}  ${userData.data[id -1].last_name}</h2>
          <img src="${userData.data[i].avatar}" alt="User Image">
        `;
        }
      }
    }

    
  }
  else { // error response
    document.body.innerHTML = (`Error: ${this.status}`);
  }
  // display the dropdown list
  dropdown.style.display = 'block';
};
// open and send the response to the server
xhr.open('GET', 'https://reqres.in/api/users');
xhr.send();
