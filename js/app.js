// to hide preloader when page is loaded
// all the images scripts links have finished loading 

class UI {
  //simple class instance methods
  hidepreloader() {
    document.querySelector('.preloader').style.display = "none";
  }
  showNav() {
    document.querySelector('.nav').classList.toggle('nav_show');
  } 
  videoControl() {
    let btn = document.querySelector('.video_switch-button');
    if(!btn.classList.contains('btnSlide')) {
       btn.classList.add('btnSlide');
       document.querySelector('.video_item').pause(); // push off button and video is off
    }
    else {
       btn.classList.remove('btnSlide'); 
       document.querySelector('.video_item').play(); // push on button and video is off
    }  
  }

  checkEmpty(name, lastname, email) {
    let result;
    if(name === '' || lastname === '' || email === '') {
      result = false;
    }
    else {
      result = true;
    }
    return result;
  }

  showFeedback(text, type) {
    const feedback = document.querySelector('.drink-form_feedback');

    if(type === 'success') {
      feedback.classList.add('success');
      feedback.innerText = text;
      this.removeAlert('success');
    }
    else if(type === 'error') {
      feedback.classList.add('error');
      feedback.innerText = text;
      this.removeAlert('error');
    }
  }

  removeAlert(type) {
    // this is a function which is using a timeout timer whih is provided in javascript which will remove function after specified time in milisecond because we don't want msg to be appeared everytime
    setTimeout(() => {
      document.querySelector('.drink-form_feedback').classList.remove(type)
    }, 3000); // 3 ms function removed
  }

  // this function collects info and takes object as a parameter
  addCustomer(customer) {
    const images = [1,2,3,4,5]; // we have 5 images so we will pick randomly any image among them
    let random = Math.floor(Math.random()*images.length);
    // now we want that when customer fill the form than it is regitsered and show in lucky people list
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<img src="img/person-${random}.jpeg" alt="person" class="person_thumbnail">
    <h4 class="person_name">${customer.name}</h4>
    <h4 class="person_lastname">${customer.lastname}</h4>`;
    // now this customer into drink-card List
    document.querySelector('.drink-card_list').appendChild(div);
  }

  // clear fields of form after submission
  clearFields() {
     document.querySelector('.input-name').value = '';
     document.querySelector('.input-lastname').value = '';
     document.querySelector('.input-email').value = '';
  }

}

  // new constructor for function
  function Customer(name, lastname, email) {
    this.name = name,
    this.lastname = lastname,
    this.email = email;
  }


// window event listner

// refractering the code (put all even listner into 1 function)
eventListner();
function eventListner() {
  const ui = new UI();

  /*
  window.addEventListener('load', function(){
    ui.hidepreloader();
  }) */
  
  // same thing as using anmoyusus function
  window.addEventListener('load', () => ui.hidepreloader())

  // nav bar
  //The classList property returns the CSS classnames of an element.
  document.querySelector('.navBtn').addEventListener('click', function() {
    ui.showNav();
  })

  // ON and OFF video control Button
  document.querySelector('.video_switch').addEventListener('click', () => ui.videoControl())

  //submit the form
  document.querySelector('.drink-form').addEventListener('submit', function(event){
    event.preventDefault(); // default action is that when we submit the form we willl go to header every time but we don't want that so we will prevent it
    const name = document.querySelector('.input-name').value;
    const lastname = document.querySelector('.input-lastname').value;
    const email = document.querySelector('.input-email').value;

    let value = ui.checkEmpty(name, lastname, email);
    
    if(value) {
       let customer = new Customer(name,lastname,email);
       ui.showFeedback('customer added to the list', 'success');
       ui.addCustomer(customer);
       ui.clearFields();
    }
    else {
      ui.showFeedback('some form values empty', 'error');
    }
  })
}


