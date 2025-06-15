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
  const postClass = button.closest("li");
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

function search() {
    var input, filter, ul, li, text, i, txtValue;
    input = document.getElementById("search_input");
    filter = input.value.toUpperCase();
    ul = document.getElementById("main_content");
    li = ul.querySelectorAll(".post_item");
    for (i = 0; i < li.length; i++) {
        text = li[i].querySelector("#text").querySelector("p");
        txtValue = text.textContent || text.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function toggleCommentInput(button) {
    const lowerPart = button.closest('#lower_part');
    const inputDiv = lowerPart.querySelector('#add_comment');

    if (inputDiv.style.display === "none" || inputDiv.style.display === "") {
        inputDiv.style.display = "grid";
    } else {
        inputDiv.style.display = "none";
    }
}

function onWriteComment(input) {
    const lowerPart = input.closest('#lower_part');
    const comment = lowerPart.querySelector('#comment');

    if (input.value !== "") {
        comment.innerHTML = '<span>User is writing comment</span>';
        comment.onclick = null; // disable onclick
    } else {
        comment.innerHTML = `
            <i style="background-image: url('https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png'); background-position: 0px -588px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
            <span>Comment</span>`;
        comment.onclick = function () {
            toggleCommentInput(this);
        };
    }
}

function sendComment(button) {
  const comment = button.closest("#add_comment").querySelector("#comment_input");
  const listOfComments = button.closest("#lower_part").querySelector("#comments");
  var newComment = document.createElement("li");
  newComment.appendChild(document.createTextNode(comment.value));
  listOfComments.appendChild(newComment);
  comment.value = "";
  onWriteComment(comment);

  //incre the number of comments by one
  const commentText = button.closest("#lower_part").querySelector('#right').querySelector('a');
  let text = commentText.textContent;
  let updatedText = text.replace(/(\d+)/, (match) => parseInt(match) + 1);

  commentText.textContent = updatedText;

}

function seeComments(element) {
  var comments = element.closest("#lower_part").querySelector("#comments");
  if(comments.style.display == 'block') {
    comments.style.display = 'none';
  } else {
    comments.style.display = 'block';
  }
}

function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

  const toggleButton = document.getElementById('mode-toggle');
  const html = document.documentElement;

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.remove('light');
    html.classList.add('dark');
  }

  toggleButton.addEventListener('click', () => {
    if (html.classList.contains('light')) {
      html.classList.replace('light', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.replace('dark', 'light');
      localStorage.setItem('theme', 'light');
    }
  });


  // Open story modal
  document.querySelectorAll('#create_story a').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('storyModal').style.display = 'flex';
    });
  });

  function closeStoryModal() {
    document.getElementById('storyModal').style.display = 'none';
  }

//create new story
document.querySelectorAll('#create_story a').forEach(el => {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('storyModal').style.display = 'flex';
  });
});

document.getElementById('storyForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const text = document.getElementById('storyText').value.trim();
  const fileInput = document.getElementById('storyImageInput');
  const file = fileInput.files[0];

  if (text.trim() == "" && file == undefined) {
    alert("Please write something or upload an image.");
    return;
  }

  const postList = document.getElementById('main_content');
  const li = document.createElement('li');
  li.className = 'post_item';

  const reader = new FileReader();
  reader.onload = function(e) {

    li.innerHTML = `
    <div class="post">
                    <div style = "width:100%">
                        <div id="upper_part">
                            <div id="details">
                                <a href="">
                                    <div id="username">You</div>
                                </a>
                        
                                <a href="">
                                    <div>
                                        <span id="time_since_post">Now</span>
                                    </div>
                                </a>
                        
                                <a href="">
                                    <img id="pfp" src="https://scontent.fsdv1-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=cp0_dst-png_s40x40&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=ofqwNqiIaM8Q7kNvwFUiZb1&_nc_oc=AdlYD1gpKxC7Gn7MF664wsQvnitVTXxOmKITd2ML92EnkaMkkWNP0BDAKwksOKmVuNM&_nc_zt=24&_nc_ht=scontent.fsdv1-2.fna&oh=00_AfM_ft5ML1s63XjxSq5VAQScaJ5ElQqY2IGjONkXZ0X2jA&oe=686A71FA">
                                </a>
                            </div>
                            <div id="options">
                            
                                <a href="">
                                    <svg id="options_icon_post" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#65686c"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
                                </a>
                                <a id="x_icon_postb"href="" onclick="deletePost(this, event)">
                                    <svg id="x_icon_post" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#65686c">
                                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                                    </svg>
                                </a>
                            </div>
                    
                        </div>
                      
                        <div id="text">
                            <p>${text}</p>
                        </div>

                        ${file ? `
                          <div id="image">
                            <img src=${e.target.result}>
                        </div>` 
                          : 
                          ``
                        }

                        <div id="lower_part">
                            <div id="top">
                                <div id="left">
                                    <img src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E">
                                    <img src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9963 8c0 4.4179-3.5811 7.9993-7.9986 7.9993-4.4176 0-7.9987-3.5814-7.9987-7.9992 0-4.4179 3.5811-7.9992 7.9987-7.9992 4.4175 0 7.9986 3.5813 7.9986 7.9992Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M7.9996 5.9081c-.3528-.8845-1.1936-1.507-2.1748-1.507-1.4323 0-2.4254 1.328-2.4254 2.6797 0 2.2718 2.3938 4.0094 4.0816 5.1589.3168.2157.7205.2157 1.0373 0 1.6878-1.1495 4.0815-2.8871 4.0815-5.159 0-1.3517-.993-2.6796-2.4254-2.6796-.9811 0-1.822.6225-2.1748 1.507Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23E11731' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23E11731' stop-opacity='.1'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3986' y1='2.4007' x2='13.5975' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF74AE'/%3E%3Cstop offset='.5001' stop-color='%23FA2E3E'/%3E%3Cstop offset='1' stop-color='%23FF5758'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.001.0009h15.9992v15.9984H-.001z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E">
                                    <a id="likes">0</a>
                                </div>

                                <div id="right">
                                    <a onclick="seeComments(this)">See 0 comments</a>
                                    <a>0 shares</a>
                                </div>
                            </div>

                            <div class="line"></div>

                            <div id="bottom">
                                <a onclick="Like(this, this.closest('#lower_part'))">
                                    <i id="like_button" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png&quot;); background-position: 0px -798px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
                                    <span>Like</span>
                                </a>
                                <a href="javascript:void(0)" onclick="toggleCommentInput(this)" id = "comment">
                                    <i style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png&quot;); background-position: 0px -588px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
                                    <span>Comment</span>
                                </a>
                                <a href="">
                                    <i style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png&quot;); background-position: 0px -924px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
                                    <span>Share</span>
                                </a>
                            </div>
                            <div id="add_comment">
                                <input id="comment_input" onkeyup="onWriteComment(this)" type="text" placeholder="Write a comment..."/>
                                <button id="send_comment" onclick="sendComment(this)">Send comment</button>
                            </div>

                            <ul id = "comments">

                            </ul>
                        </div>
                    </div>
                </div>
    `;

    postList.appendChild(li);
    closeStoryModal();
    document.getElementById('storyForm').reset();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.onload({ target: { result: "" } });
  }
});
