const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2a2a2a";
const CANVAS_SIZE = 700;

// canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
// canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false;
let filling = false;
let x = 0;
let y = 0;

    // context: canvas 안에서 픽셀을 다루는 것 
    // strokeStyle 도형 윤곽선 default 
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// 배경색 설정안했을 때 투명색으로 되는것을 막기위해서     
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.lineCap = 'round';

function stopPainting() {
    painting: false;
}
function startPainting() {
    painting: true;
}
function onMouseUp(event) {
    stopPainting();
}

// MouseEvent 
// clientX, Y : 윈도우 전체의 범위내에서 마우스 위치값을 나타내는 것
// offsetX, Y : canvas 위의 값
// 마우스를 캔버스안에서 움직일 때 마다 
function onMouseMove(event) {
    x = event.offsetX;
    y = event.offsetY;
    
    if (painting === true) {
        console.log("creating line in", x, y);

        ctx.lineTo(x, y); // 선 끝
        ctx.stroke(); // 선 그리기

    } else {
        // console.log("creating path in", x, y);
        ctx.beginPath(); // 경로 생성
        ctx.moveTo(x, y); // 선 시작
    }
}

function handleColorClick(event) {
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
   
    }
}

function draw(ctx, x1, y1, x2, y2) {
    ctx.beginPath();



    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}
// 우클릭 막기
function handleCM(event) {
    // console.log(event);
    event.preventDefault();
}
function handleSaveClick() {
    const image = canvas.toDataURL();
    // console.log(image); 
    // 존재하지 않는 링크 
    const link = document.createElement("a");
    link.href = image; // <a href | download
    link.download = "PaintJS[🎨]";  // 이름
    link.click();
}

// canvas 있는지 확인
// if (canvas) {
//     // 클릭 x 마우스 move
//     canvas.addEventListener("mousemove", onMouseMove);  

//     // click
//     canvas.addEventListener("mousedown", startPainting);
//     canvas.addEventListener("mouseup", onMouseUp);
//     // 캔버스 벗어날 때
//     canvas.addEventListener("mouseleave", stopPainting);
// } 
if (canvas) {
    // 클릭 x 마우스 move
    canvas.addEventListener("mousemove", e => {
        if (painting === true) {
            draw(ctx, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        } 
          
    });  

    // click
    canvas.addEventListener("mousedown", e => {
        x = e.offsetX;
        y = e.offsetY;
        painting = true;
    });
    canvas.addEventListener("mouseup", e => {
        if (painting === true) {
            draw(ctx, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            painting = false;
        }
       
        
    });
    // 캔버스 벗어날 때
    canvas.addEventListener("mouseleave", stopPainting);

    canvas.addEventListener("click", handleCanvasClick);

    // menu가 실행될 때 발생
    canvas.addEventListener("contextmenu", handleCM);
}


// 캔버스 클릭 시 painting 시작하게

// array from : object로 부터 array 생성
console.log(Array.from(colors));
Array.from(colors).forEach(
    color => color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}