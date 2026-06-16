const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");
const message = document.getElementById("message");



// MESSAGE FUNCTION

function showMessage(text)
{
    message.textContent = text;

    setTimeout(() =>
    {
        message.textContent = "";
    },2000);
}



// COOKIE FUNCTIONS

function setCookie(name,value,days)
{
    const date = new Date();

    date.setTime(
        date.getTime() + days*24*60*60*1000
    );

    document.cookie =
    `${name}=${value};expires=${date.toUTCString()};path=/`;
}


function getCookie(name)
{
    const cookies =
    document.cookie.split(";");

    for(let cookie of cookies)
    {
        cookie = cookie.trim();

        if(cookie.startsWith(name + "="))
        {
            return cookie.substring(
                name.length + 1
            );
        }
    }

    return "";
}



// GREETING

const saveNameBtn =
document.getElementById("saveNameBtn");

saveNameBtn.addEventListener("click",() =>
{
    const username =
    document.getElementById("username").value;

    if(username === "")
    {
        alert("Please enter your name.");
        return;
    }

    setCookie("username",username,30);

    loadGreeting();

    showMessage("Name saved successfully!");
});


function loadGreeting()
{
    const username =
    getCookie("username");

    if(username !== "")
    {
        document.getElementById("greeting").innerHTML =
        `Welcome back, ${username} 👋`;
    }
}

loadGreeting();



// SESSION STORAGE

noteInput.value =
sessionStorage.getItem("draft") || "";

noteInput.addEventListener("input",() =>
{
    sessionStorage.setItem(
        "draft",
        noteInput.value
    );
});


document.getElementById("clearSessionBtn")
.addEventListener("click",() =>
{
    sessionStorage.removeItem("draft");

    noteInput.value = "";

    showMessage("Draft cleared.");
});



// LOCAL STORAGE NOTES

let notes =
JSON.parse(
localStorage.getItem("notes")
) || [];


function displayNotes()
{
    notesList.innerHTML = "";

    notes.forEach((note,index)=>
    {
        notesList.innerHTML +=

        `
        <li class="note">

        ${note}

        <button
        class="deleteBtn"
        onclick="deleteNote(${index})">

        Delete

        </button>

        </li>
        `;
    });
}


displayNotes();



document.getElementById("addNoteBtn")
.addEventListener("click",() =>
{
    if(noteInput.value.trim() === "")
    {
        alert("Please enter a note.");
        return;
    }

    try
    {
        notes.push(
            noteInput.value
        );

        localStorage.setItem(
            "notes",
            JSON.stringify(notes)
        );

        sessionStorage.removeItem("draft");

        noteInput.value = "";

        displayNotes();

        showMessage(
            "Note saved successfully!"
        );
    }

    catch(error)
    {
        alert(
            "Storage unavailable."
        );
    }
});



function deleteNote(index)
{
    notes.splice(index,1);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();

    showMessage("Note deleted.");
}




// THEME SELECTOR

const themeSelect =
document.getElementById("themeSelect");

const savedTheme =
localStorage.getItem("theme") || "light";

themeSelect.value = savedTheme;

if(savedTheme !== "light")
{
    document.body.classList.add(savedTheme);
}


themeSelect.addEventListener("change",() =>
{
    document.body.className = "";

    const selectedTheme =
    themeSelect.value;

    if(selectedTheme !== "light")
    {
        document.body.classList.add(
            selectedTheme
        );
    }

    localStorage.setItem(
        "theme",
        selectedTheme
    );
});