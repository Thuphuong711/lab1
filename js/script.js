let notes = [];

let notesContainer;
const currentPage = document.body.getAttribute("data-page");



//chatGpt
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


// Function to save notes to localStorage
function saveNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
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
        noteDiv.style.backgroundColor = "#FFFF8D";
        noteDiv.style.width = "300px";
        noteDiv.style.height = "100px";
        noteDiv.style.marginBottom = "20px";
        notesContainer.appendChild(noteDiv);
    });

    updateLastUpdatedTime()
   

}

if(currentPage == "writer"){
    console.log("writer");
    document.addEventListener("DOMContentLoaded", ()=> {
        const addBtn = document.getElementById("addBtn");
        
        addBtn.addEventListener("click", ()=>{
            let newNote = new note("",notes.length);
            notes.push(newNote);
            newNote.add();
            console.log("note contents" +newNote.content);
            saveNotesToLocalStorage();
        });           
     
    });
} else if(currentPage == "reader"){
    document.addEventListener("DOMContentLoaded", ()=> {
        console.log("reader1");
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
    constructor(content,id){
        this.content = content;
        this.id = id;

        this.textArea = document.createElement("textarea");
        this.textArea.value = this.content;
        this.textArea.id = this.id;
        this.textArea.style.backgroundColor = "#FFFF8D";
        this.textArea.style.width = "300px";
        this.textArea.style.height = "100px";
        this.textArea.addEventListener("input",()=>{
            this.content = this.textArea.value;
            this.saveNotes();
            // renderNotes();
        });


        this.button = document.createElement("button");
        this.button.id = "removeBtn";
        
        this.button.innerHTML = "Remove";
        this.button.style.backgroundColor = "orange";
        this.button.style.marginLeft = "50px";

        this.div = document.createElement("div");
        this.div.id = this.id;
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
        console.log("id" + this.id);
        console.log("content"+ this.content);
    }

    store(){
        this.content = this.textArea.value;
    }
    
    saveNotes(){
        let encryptNotes = JSON.stringify(notes);
        localStorage.setItem("notes", encryptNotes);
        console.log("encryptNotes: " + encryptNotes);
        updateLastSavedTime();
    }




}




// if(typeof(Storage) == "undefined"){
//     document.write(msg_notSupported);
//     console.log(msg_notSupported);
//     window.stop();
// } 
// localStorage.setItem(id, content);

// if (typeof (Storage) == "undefined") {
//     document.write(msg_notSupported);
//     window.stop();
//     }
//     document.write(msg_read+msg_key+":"+localStorage.getItem(msg_key));
