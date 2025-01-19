let notes = [];
const currentPage = document.body.getAttribute("data-page");


//chatGpt for updating time 
function updateTime(currentPage){
    let content;
    let now = new Date();

    if(currentPage === "writer"){
        content = document.getElementById("lastSaved");
        content.textContent = `stored at: ${now.toLocaleTimeString()}`;
    } else if(currentPage === "reader"){
        content = document.getElementById("lastUpdated");
        content.textContent = `updated at: ${now.toLocaleTimeString()}`;
    }
    
}

class Note{
    constructor(){
        this.content = "";
        this.id = Date.now(); // chatGPT to generate unique id for each note for later use in removing notes
        //create the textarea
        this.textArea = document.createElement("textarea");
        this.textArea.value = this.content;
        this.textArea.style.backgroundColor = "#FFFF8D";
        this.textArea.style.width = "300px";
        this.textArea.style.height = "100px";

        //when the content of the textarea changes, update the content of the note
        this.textArea.addEventListener("input",()=>{
            this.content = this.textArea.value;
            updateTime("writer")
            saveNotesToLocalStorage();
        });

        //create the remove button
        this.button = document.createElement("button");
        this.button.innerHTML = "Remove";
        this.button.style.backgroundColor = "orange";
        this.button.style.marginLeft = "50px";

        //create the div that contains the textarea and the button
        this.div = document.createElement("div");
        this.div.style.display = "flex";
        this.div.style.alignItems = "center";
        this.div.style.marginBottom = "20px";
        this.div.style.width = "100%";
        this.div.appendChild(this.textArea);
        this.div.appendChild(this.button);
        this.div.style.borderSpacing = "20px";
        
        this.button.addEventListener("click", () => {
            const index = notes.findIndex(note => note.id === this.id);
            if(index != -1){
                notes.splice(index,1);
                this.div.remove();
            }
            console.log("before ", notes)
            saveNotesToLocalStorage();
            console.log("after ", notes)
        })
        
    }

    addDiv(writerContainer){
        writerContainer.appendChild(this.div);
        this.textArea.value = this.content;
        saveNotesToLocalStorage();
    }

    //chatGPT to add div content for reader page
    addDivContent(readerContainer){
        this.div = document.createElement("div");
        this.div.style.backgroundColor = "#FFFF8D";
        this.div.style.height = "100px";
        this.div.style.width = "300px";
        this.div.textContent = this.content;
        this.div.style.alignItems = "start";
        this.div.style.padding = "5px";
        this.div.style.marginBottom = "20px";
        readerContainer.appendChild(this.div);
    }

    
}


function saveNotesToLocalStorage(){
    localStorage.setItem("notes", JSON.stringify(notes))
}


//chatGPT to recreate Note instance after parsing the JSON notes from local storage
function loadLocalStorage(){

    console.log("loading notes from local storage", notes)
    const loadedNotes = localStorage.getItem("notes");
    if(loadedNotes){
        parsedNotes = JSON.parse(loadedNotes);
        return parsedNotes.map((noteData) => {
            const note = new Note();
            note.content = noteData.content;
            return note;
        })
    }
    return [];
}


function renderNotes(container){
    
    if(notes){
        const notesContainer = document.getElementById(container);
        notes.forEach((noteObj) =>{
            if(container === "writerContainer"){
                noteObj.addDiv(notesContainer);
            } else if(container === "readerContainer"){
                noteObj.addDivContent(notesContainer);
            }
        })
    }
}


//chatGPT idea for checking the currentPage as I only use 1 js file for both writer and reader
if(currentPage === "writer"){
    //addBtn event listener
    const addBtn = document.getElementById("addBtn")

    addBtn.addEventListener("click",  () => {
        const newNote = new Note();
        notes.push(newNote);
        newNote.addDiv(writerContainer);
        updateTime(currentPage);        
    })

    notes = loadLocalStorage();
    renderNotes("writerContainer");
} else if(currentPage === "reader"){
    updateTime(currentPage);
    const readerContainer = document.getElementById("readerContainer");
    // readerContainer.innerHTML = ""
    notes = loadLocalStorage();
    renderNotes("readerContainer");
    console.log("note now", notes)
    window.addEventListener("storage", (event) => {
        readerContainer.innerHTML = ""
        if(event.key === "notes"){
            notes = loadLocalStorage();
            renderNotes("readerContainer");
        }
        updateTime(currentPage);
    })
    
}
