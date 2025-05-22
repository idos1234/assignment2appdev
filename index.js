function validateEmail(email){
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function validatePhoneNumber(phoneNumber) {
  return String(phoneNumber).match(
    /^(\+?[1-9]{1}[0-9]{1,14})$/
  );
}

function Submit() {
    var email_phone = document.getElementById("email_phonenumber").value;
    var password = document.getElementById("password").value

    if(validateEmail(email_phone) || validatePhoneNumber(email_phone)) {
        document.getElementById("emailError").innerHTML = ""
        document.getElementById("email_phonenumber").style.backgroundImage = ""
        if(password != "") {
            document.getElementById("passwordError").innerHTML = ""
            window.location.href = "./homePage.html"
        } else {
            document.getElementById("passwordError").innerHTML = "Password is required."
        }
    } else {
        document.getElementById("emailError").innerHTML = "Please enter a valid email address or phone number."
        document.getElementById("email_phonenumber").style.backgroundImage = "url(https://static.xx.fbcdn.net/rsrc.php/v4/y2/r/O287_AcFyg4.png)"
    }
}

function onChangePassword(){
    if(document.getElementById("password").value == "") {
        document.getElementById("visibility").style.visibility = "hidden";
    } else {
        document.getElementById("visibility").style.visibility = "visible"
    }
}

function changeVisibility() {   
    if(document.getElementById("password").getAttribute("type") == "password") {
        document.getElementById("password").setAttribute("type", "text")
        document.getElementById("visibility").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/></svg>'
    } else {
        document.getElementById("password").setAttribute("type", "password")
        document.getElementById("visibility").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z"/></svg>'
    }
}
function deletePost(button, event) {
  event.preventDefault();
  const postClass = button.closest("#post2");
  if (postClass) {
    postClass.remove();
  }
}

function Like(element, outerDiv) {
    var like_button = element.querySelector("#like_button");
    var likes = outerDiv.querySelector("#likes");
    var text = element.querySelector("span")
    if (like_button.style.backgroundPosition === "0px -798px") {
        //liked
        like_button.style.backgroundPosition = "0px -735px";
        text.style.color = "#0064d1"
        likes.innerHTML = (parseInt(likes.textContent) + 1).toString();
    } else {
        //unliked
        like_button.style.backgroundPosition = "0px -798px";
        text.style.color = "black"
        likes.innerHTML = (parseInt(likes.textContent) - 1).toString();
    }

    like_button.classList.add("pop");
    setTimeout(() => {
        like_button.classList.remove("pop");
    }, 300);
}

function onScroll() {
    var mybutton = document.getElementById("back_to_top_button");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.classList.add("show");
        mybutton.classList.remove("hide");
    } else {
        mybutton.classList.add("hide");
        mybutton.classList.remove("show");
    }
}

function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}