let simContainer = document.getElementById("simulator-container");
let image = null;
let x = 0;
let y = 0;
let dx = 0;
let dy = 0;
let speed = 10;
let maxDimensions = 100;

function loadImage(event) {
    if (image == null) {
        createImage();
        createPosition();
        createTrajectory();
        animate();
    } else {
        createImage()
    }
    image.src = URL.createObjectURL(event.target.files[0]);
    changeSize();
}

function createImage() {
    if (image != null) {
        simContainer.removeChild(image);
    }
    image = document.createElement("img");
    image.setAttribute("id", "image");
    simContainer.appendChild(image);
}

function createPosition() {
    x = Math.floor(Math.random() * (simContainer.offsetWidth - image.width));
    y = Math.floor(Math.random() * (simContainer.offsetHeight - image.height));
}

function createTrajectory() {
    let a = Math.random() * (Math.round(Math.random()) ? 1 : -1);
    let b = Math.random() * (Math.round(Math.random()) ? 1 : -1);
    let magnitude = Math.sqrt(a ** 2 + b ** 2);

    dx = a / magnitude;
    dy = b / magnitude;
}

function changeSize() {
    if (image.width > image.height) {
        image.style.width = maxDimensions.toString() + "px";
        image.style.height = "auto";
    } else {
        image.style.height = maxDimensions.toString() + "px";
        image.style.width = "auto";
    }
}

function checkBounds() {
    if (x >= simContainer.offsetWidth - image.width) {
        dx = -Math.abs(dx);
        x = simContainer.offsetWidth - image.width;
    } else if (x < 0) {
        dx = Math.abs(dx);
        x = 0;
    }
    if (y >= simContainer.offsetHeight - image.height) {
        dy = -Math.abs(dy);
        y = simContainer.offsetHeight - image.height
    } else if (y < 0) {
        dy = Math.abs(dy);
        y = 0;
    }
}

function update() {
    x += speed * dx;
    y += speed * dy;
    image.style.left = Math.floor(x).toString() + "px";
    image.style.top = Math.floor(y).toString() + "px";
    checkBounds();
}

function animate() {
    setInterval(update, 10);
}

function loadBackground(event) {
    simContainer.style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]) + ")";
}

function setSize(event) {
    maxDimensions = event.target.value;
    changeSize();
}

function setSpeed(event) {
    speed = event.target.value;
}

function initialize() {
    let imageInput = document.getElementById("image-input");
    imageInput.addEventListener("change", (event) => {
        loadImage(event)
    });

    let backgroundInput = document.getElementById("background-input");
    backgroundInput.addEventListener("change", (event) => {
        loadBackground(event)
    });

    let sizeSlider = document.getElementById("size-slider");
    sizeSlider.addEventListener("input", (event) => {
        setSize(event);
    });

    let speedSlider = document.getElementById("speed-slider");
    speedSlider.addEventListener("input", (event) => {
        setSpeed(event);
    });

    let trajectoryButton = document.getElementById("trajectory-button");
    trajectoryButton.addEventListener("click", createTrajectory);
}

initialize();
