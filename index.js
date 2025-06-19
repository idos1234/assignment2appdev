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
  const postClass = button.closest("#post_item");
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
  const comment = button.closest("#add_comment").querySelector("#comment_input").value;
  const listOfComments = button.closest("#lower_part").querySelector("#comments");
  var newComment = document.createElement("li");
  newComment.appendChild(document.createTextNode(comment));
  listOfComments.appendChild(newComment);

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

  // Handle story submission
  document.getElementById('storyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const text = document.getElementById('storyText').value;
    if (text.trim()) {
      alert('Story posted: ' + text);
      document.getElementById('storyText').value = '';
      closeStoryModal();
    } else {
      alert('Please write something!');
    }
  });
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

  function closeStoryModal() {
  document.getElementById('storyModal').style.display = 'none';
}

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

  if (!text && !file) {
    alert("Please write something or upload an image.");
    return;
  }

  const postList = document.getElementById('main_content');
  const li = document.createElement('li');
  li.className = 'post_item';

  const reader = new FileReader();
  reader.onload = function(e) {
    li.innerHTML = `
      <div class="post" style="width: 100%; max-width: 680px; margin: auto; display: flex; flex-direction: column; overflow: hidden;">
        <div id="upper_part">
          <div id="details">
            <a href=""><div id="username">You</div></a>
            <a href=""><div><span id="time_since_post">Just now</span></div></a>
            <a href=""><img id="pfp" src="https://cdn-icons-png.flaticon.com/512/149/149071.png"></a>
          </div>
          <div id="options">
            <a href=""><svg id="x_icon_post" onclick="deletePost(this, event)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#65686c"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a>
          </div>
        </div>
        <div id="text" style="padding: 10px; font-size: 16px;"><p>${text}</p></div>
        ${file ? `<div id="image" style="width: 100%; max-height: 510px; overflow: hidden;"><img src="${e.target.result}" style="width: 100%; height: auto; display: block; object-fit: cover; border-radius: 8px;"></div>` : ''}
        <div id="lower_part">
          <div id="top">
            <div id="left">
              <a id="likes">0</a>
            </div>
            <div id="right">
              <a>0 comments</a>
              <a>0 shares</a>
            </div>
          </div>
          <div class="line"></div>
          <div id="bottom">
            <a onclick="Like(this, this.closest('#lower_part'))">
              <i id="like_button" style="background-image: url('https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png'); background-position: 0px -798px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
              <span>Like</span>
            </a>
            <a href="javascript:void(0)" onclick="toggleCommentInput(this)" id="comment">
              <i style="background-image: url('https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png'); background-position: 0px -588px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
              <span>Comment</span>
            </a>
            <a href="" onclick="openShareModal(event)">
              <i style="background-image: url('https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png'); background-position: 0px -924px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
              <span>Share</span>
            </a> 

          </div>
          <div id="comment_input" style="display: none; padding: 10px;">
            <input onkeyup="onWriteComment(this)" type="text" placeholder="Write a comment..." style="width: 95%; padding: 8px; border-radius: 8px; border: 1px solid #ccc;" />
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

function openShareModal(event) {
  event.preventDefault();
  document.getElementById('shareModal').style.display = 'flex';
}

function closeShareModal() {
  document.getElementById('shareModal').style.display = 'none';
}

function sharePost() {
  const shareText = document.getElementById('shareText').value;
  if (!shareText.trim()) {
    alert("You didn't write anything to share!");
    return;
  }

  // Just simulate share feedback
  alert("Post shared: " + shareText);
  document.getElementById('shareText').value = '';
  closeShareModal();
}

