let notes = [];

let notesContainer;
const currentPage = document.body.getAttribute("data-page");



//chatGpt for updating time 
function updateLastSavedTime(){
    let lastSaved = document.getElementById("lastSaved"); // added
    let now = new Date();
    lastSaved.textContent = `stored at: ${now.toLocaleTimeString()}`;
}

function updateLastUpdatedTime(){
    let lastUpdated = document.getElementById("lastUpdated"); // added
    let now = new Date();
    lastUpdated.textContent = `updated at: ${now.toLocaleTimeString()}`;
}


// Function to save notes array to localStorage
function saveNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
    //after saving notes to local storage, update the last saved time
    updateLastSavedTime();
}

function loadNotesFromLocalStorage(){
    const storedNotes = localStorage.getItem("notes");
    notes = JSON.parse(storedNotes);
}

function renderNotes(){
    console.log("note array length" + notes.length);
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";
    notes.forEach((noteObj) => {
        const noteDiv = document.createElement("div");
        
        noteDiv.textContent = noteObj.content;
        noteDiv.style.paddingLeft = "5px";
        noteDiv.style.backgroundColor = "#FFFF8D";
        noteDiv.style.width = "300px";
        noteDiv.style.height = "100px";
        noteDiv.style.marginBottom = "20px";
        notesContainer.appendChild(noteDiv);
    });
    updateLastUpdatedTime()
}

// check the current data-page to perform the correct functions
//chatGPT idea for current page checking. Because I write all js code in one file
// I need to check the current page to perform the correct functions.
if(currentPage == "writer"){
    console.log("writer");
    document.addEventListener("DOMContentLoaded", ()=> {
        loadNotesFromLocalStorage();
        renderNotes();
        const addBtn = document.getElementById("addBtn");
        
        addBtn.addEventListener("click", ()=>{
            let newNote = new note("");
            notes.push(newNote);
            newNote.add();
            console.log("note contents" +newNote.content);
            saveNotesToLocalStorage();
        });           
     
    });
} else if(currentPage == "reader"){
    document.addEventListener("DOMContentLoaded", ()=> {
        loadNotesFromLocalStorage();
        renderNotes();
        window.addEventListener("storage", () => {
            if(event.key === "notes"){
                loadNotesFromLocalStorage();
                renderNotes();
            }
        });
    });
}

class note{
    constructor(content){
        this.content = content;
        this.textArea = document.createElement("textarea");
        this.textArea.value = this.content;
        this.textArea.style.backgroundColor = "#FFFF8D";
        this.textArea.style.width = "300px";
        this.textArea.style.height = "100px";
        this.textArea.addEventListener("input",()=>{
            this.content = this.textArea.value;
            saveNotesToLocalStorage();
        });


        this.button = document.createElement("button");
        this.button.innerHTML = "Remove";
        this.button.style.backgroundColor = "orange";
        this.button.style.marginLeft = "50px";

        this.div = document.createElement("div");
        this.div.style.display = "flex";
        this.div.style.alignItems = "center";
        this.div.style.marginBottom = "20px";
        this.div.style.width = "100%";
        this.div.appendChild(this.textArea);
        this.div.appendChild(this.button);
        this.div.style.borderSpacing = "20px"; 

        this.button.addEventListener("click",()=>{
            this.div.remove();
        });
    }

    add(){
        writerContainer.appendChild(this.div);
        console.log("content"+ this.content);
    }
}