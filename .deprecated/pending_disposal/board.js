document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector("#board");
    const context = board.getContext("2d");

    board.height = 600;
    board.width = 900;

    let cor = document.querySelector("input[type=color]");
        cor.addEventListener("change", ()=>{context.strokeStyle = cor.value})

    let cerda = document.querySelector("input[type=range]");
        cerda.addEventListener("change", ()=>{context.lineWidth = cerda.value;
        context.lineHeight = cerda.value})

    const brush = {
        active: false,
        isMoving: false,
        pos: { x: 0, y: 0 },
        posAnterior: null
    }

    const toPaint = (line) => {
        context.beginPath();
        context.moveTo(line.posAnterior.x, line.posAnterior.y);
        context.lineTo(line.pos.x, line.pos.y);
        context.stroke();

    }

    board.onmousedown = (evt) => { brush.active = true};
    board.onmouseup = (evt) => { brush.active = false};

    board.onmousemove = (evt) => {
        brush.pos.x = evt.clientX - 200
        brush.pos.y = evt.clientY
        brush.isMoving = true;
    }

    const stage = () => {
        if(brush.active && brush.isMoving && brush.posAnterior)
        {
            toPaint({ pos: brush.pos, posAnterior: brush.posAnterior})
            brush.isMoving = false;
        }
        brush.posAnterior = { x: brush.pos.x, y: brush.pos.y }
        setTimeout(stage, 0.2);
    }
    stage();
})