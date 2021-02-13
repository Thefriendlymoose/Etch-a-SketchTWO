const slider = document.getElementById("slider");
const sizeOutput = document.getElementById("current-size");

const bgColorInput = document.getElementById("bg-color"); 
const ptColorInput = document.getElementById("pt-color");
const brColorInput = document.getElementById("br-color");

const resetButton = document.getElementById("reset");
const rainbow = document.getElementById("rainbow");

const canvas = document.getElementById("main-canvas-container");

const root = document.documentElement;

let bgColor = bgColorInput.value;
let ptColor = ptColorInput.value;
let brColor = brColorInput.value;

let gridSize = 25;

let listOfCells;

let rbOnOff = false;

/* INITILIZER */
updateGridSize();

/* EVENT LISTENERS */
bgColorInput.addEventListener("change", (e)=>{
    bgColor = e.target.value;
    root.style.setProperty("--cell-bgcolor", bgColor);
});

ptColorInput.addEventListener("change", (e)=>{
    rbOnOff = false;
    ptColor = e.target.value;
});

brColorInput.addEventListener("change", (e)=>{
    brColor = e.target.value;
    root.style.setProperty("--cell-brcolor", brColor);
});

slider.addEventListener("mouseup", (e) => {
    gridSize = e.target.value
    sizeOutput.textContent = `Current size: ${gridSize} x ${gridSize}`;
    updateGridSize();
});

resetButton.addEventListener("click", () => {
    resetAll();
});

rainbow.addEventListener("click", () => {
    if(rbOnOff){
        rbOnOff = false;
    } else{
        rbOnOff = true;
    }
});

canvas.addEventListener("mousedown", cellListener);

/* FUNCTIONS */
function updateGridSize(){

    while(canvas.firstChild){
        canvas.removeChild(canvas.lastChild);
    }

    root.style.setProperty("--grid-size", gridSize);
    for(let i = 0; i<gridSize*gridSize; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        root.style.setProperty("--cell-bgcolor", bgColor);
        canvas.appendChild(cell);
    }

    listOfCells = document.querySelectorAll(".cell");
}

function cellListener(){
    listOfCells.forEach(cell => {
        cell.addEventListener("mouseover", e => {
            if(rbOnOff){
                ptColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            } 
            console.log(e.target.style.cssText);


            if(!(e.target.style.cssText === "")){
                
                if(e.target.style.cssText.slice(-8,-7) == "#"){
                    
                    let temp = e.target.style.cssText.slice(-8,-1);
                    ptColor = adjust(temp, -28);
                }
            }
            
            e.target.style.setProperty("--cell-nbg", ptColor);
            e.target.classList.add("cell-fill"); 
            ptColor = ptColorInput.value;
        });
    });
}

function resetAll(){
    bgColor = "#ffffff";
    ptColor = "#000000";
    brColor = "#808080";
    gridSize = 25;

    document.getElementById("bg-color").value = bgColor;
    root.style.setProperty("--cell-brcolor", brColor);
    brColorInput.value = brColor;
    ptColorInput.value = ptColor;

    slider.value = 25
    sizeOutput.textContent = `Current size: ${gridSize} x ${gridSize}`;

    updateGridSize();
}

function adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

