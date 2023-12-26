class JSCrop {
  constructor() {}

  create(options) {
    this.image = new Image();
    this.filename = filename;

    this.image.src = options.image;

    this.options.filename = options.filename ? options.filename : "file";

    this.createElements();
    this.addEvents();

    this.targetEl = el;
  }

  destroy() {
    this.container.remove();
  }

  cropImage() {
    const naturalHeight = this.image.naturalHeight;
    const naturalWidth = this.image.naturalWidth;

    const info = getImgSizeInfo(this.image);

    const ratio = naturalWidth / info.width;

    const croppedDimensions = [
      this.cropArea.clientWidth,
      this.cropArea.clientHeight,
    ];
    this.canvas.style.display = "none";
    this.canvas.width = croppedDimensions[0] * ratio;
    this.canvas.height = croppedDimensions[1] * ratio;

    var cropx = this.cropArea.offsetLeft - info.left;

    var cropX = cropx * ratio;

    var cropY = this.cropArea.offsetTop * ratio;

    this.ctx = this.canvas.getContext("2d");

    this.ctx.drawImage(
      this.image,
      cropX,
      cropY,
      this.canvas.width,
      this.canvas.height,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.upload();
  }

  upload() {
    this.container.style.display = "none";

    const filename = this.filename;
    const el = this.targetEl;

    this.canvas.toBlob((blob) => {
      var formData = new FormData();

      formData.append("file", blob, filename);

      options.fields.forEach((field) => {
        formData.append(field[0], field[1]);
      });

      fetch(this.options.url, {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (settings.json) {
            response.json();
          } else {
            if (settings.callback) {
              settings.callback(response);
            }
          }
        })
        .then((data) => {
          if (settings.callback) {
            settings.callback(data);
          }
        })
        .catch(
          (error) => console.log(error) // Handle the error response object
        );
    });
  }

  resizeELements() {
    setTimeout(() => {
      const info = getImgSizeInfo(this.image);
      this.cropArea.style.width = info.width + "px";
      this.cropArea.style.left = info.left + "px";
      this.greyDivLeft.style.width = this.left + "px";
      this.greyDivRight.style.width = this.left + "px";
    }, 1000);
  }

  createElements() {
    var styles = document.createElement("style");
    styles.innerHTML = this.styles();
    document.body.appendChild(styles);

    this.container = document.createElement("div");
    this.container.classList.add("image-cropper");
    this.canvas = document.createElement("canvas");
    this.container.appendChild(this.canvas);
    this.imageContainer = document.createElement("div");
    this.title = document.createElement("h1");
    this.title.innerHTML = "Crop Image";

    this.container.appendChild(this.title);

    this.cancelButton = document.createElement("button");

    this.cancelButton.innerHTML = "Cancel";

    this.completeButton = document.createElement("button");

    this.imageContainer.classList.add("image-container");

    this.container.appendChild(this.imageContainer);

    this.greyDiv = document.createElement("div");
    this.greyDiv.classList.add("grey");
    this.greyDivTop = document.createElement("div");

    this.greyDivTop.classList.add("grey");
    this.greyDivRight = document.createElement("div");

    this.greyDivRight.classList.add("grey");
    this.greyDivBottom = document.createElement("div");

    this.greyDivBottom.classList.add("grey");
    this.greyDivLeft = document.createElement("div");

    this.greyDivLeft.classList.add("grey");

    this.imageContainer.appendChild(this.greyDivTop);
    this.imageContainer.appendChild(this.greyDivRight);
    this.imageContainer.appendChild(this.greyDivBottom);
    this.imageContainer.appendChild(this.greyDivLeft);
    this.imageContainer.appendChild(this.image);

    this.cropArea = document.createElement("div");

    this.cropArea.classList.add("crop-area");

    this.imageContainer.appendChild(this.cropArea);

    this.cropHandles = document.createElement("div");

    this.cropHandles.classList.add("crop-handles");

    this.cropArea.appendChild(this.cropHandles);

    this.cropHandleTop = document.createElement("div");

    this.cropHandleTop.classList.add("handle-top");

    this.cropHandleRight = document.createElement("div");

    this.cropHandleRight.classList.add("handle-right");

    this.cropHandleBottom = document.createElement("div");

    this.cropHandleBottom.classList.add("handle-bottom");

    this.cropHandleLeft = document.createElement("div");

    this.cropHandleLeft.classList.add("handle-left");

    this.cropHandles.appendChild(this.cropHandleTop);
    this.cropHandles.appendChild(this.cropHandleRight);
    this.cropHandles.appendChild(this.cropHandleBottom);
    this.cropHandles.appendChild(this.cropHandleLeft);

    this.completeButton.innerHTML = "Done";
    this.container.appendChild(this.completeButton);

    document.body.appendChild(this.container);
    this.resizeELements();
  }

  addEvents() {
    this.cropHandleTop.addEventListener("mousedown", (event) => {
      this.isDragging = true;
      this.prevY = event.clientY;
      this.handle = 0;
      console.log("drag start");
    });
    this.completeButton.addEventListener("click", (event) => {
      this.cropImage();
    });

    this.cropHandleBottom.addEventListener("mousedown", (event) => {
      this.isDragging = true;
      this.prevY = event.clientY;
      this.handle = 2;
      console.log("drag start");
    });

    this.cropHandleRight.addEventListener("mousedown", (event) => {
      this.isDragging = true;
      this.prevX = event.clientX;
      this.handle = 1;
      console.log("drag start");
    });

    this.cropHandleLeft.addEventListener("mousedown", (event) => {
      this.isDragging = true;
      this.prevX = event.clientX;
      this.handle = 3;
      console.log("drag start");
    });

    document.addEventListener("mousemove", (event) => {
      if (this.isDragging) {
        this.width = parseInt(
          document.defaultView.getComputedStyle(this.cropArea).width
        );
        this.left = parseInt(
          document.defaultView.getComputedStyle(this.cropArea).left
        );
        this.height = parseInt(
          document.defaultView.getComputedStyle(this.cropArea).height
        );
        this.top = parseInt(
          document.defaultView.getComputedStyle(this.cropArea).top
        );

        this.newX = event.clientX;
        this.newY = event.clientY;

        let direction = this.newX > this.prevX ? 0 : 1;

        this.imageInfo = getImgSizeInfo(this.image);

        if (this.handle === 0) {
          direction = this.newY > this.prevY ? 0 : 1;

          const moveAmount = this.newY - this.prevY;

          const heightAdd = this.height + -moveAmount;

          const heightMinus = this.height - moveAmount;

          this.height = direction == 1 ? heightMinus : heightAdd;

          if (
            this.top + moveAmount > 0 &&
            this.top + moveAmount < this.top + this.height
          ) {
            this.top = this.top + moveAmount;

            this.cropArea.style.top = this.top + "px";

            this.cropArea.style.height = this.height + "px";
          }
        }

        if (this.handle === 1) {
          const test = this.left + this.width + this.newX - this.prevX;

          if (
            test < this.imageInfo.left + this.imageInfo.width &&
            test > this.left
          ) {
            this.width = this.width + this.newX - this.prevX;

            this.cropArea.style.width = this.width + "px";
          }
        }

        if (this.handle === 2) {
          var test = this.height + this.newY - this.prevY;

          if (
            test + this.top < this.imageContainer.clientHeight &&
            test + this.top > 0
          ) {
            this.height = this.height + this.newY - this.prevY;

            this.cropArea.style.height = this.height + "px";
          }
        }

        if (this.handle === 3) {
          const moveAmount = this.newX - this.prevX;

          const widthAdd = this.width + -moveAmount;

          const widthMinus = this.width - moveAmount;

          if (
            this.left + moveAmount > this.imageInfo.left &&
            this.left + moveAmount < this.left + this.width
          ) {
            this.left = this.left + moveAmount;

            this.width = direction == 0 ? widthMinus : widthAdd;

            this.cropArea.style.width = this.width + "px";
            this.cropArea.style.left = this.left + "px";
          }
        }

        this.prevX = this.newX;
        this.prevY = this.newY;

        this.setGreyDivs();
      }
    });

    document.addEventListener("mouseup", (event) => {
      this.isDragging = false;
    });
  }

  setGreyDivs() {
    this.greyDivTop.style.top = this.image.offsetTop + "px";
    this.greyDivTop.style.height = this.top - this.image.offsetTop + "px";

    const right = this.left + this.width;

    const width = this.image.clientWidth - right;

    this.greyDivRight.style.height = this.height + "px";

    this.greyDivRight.style.top = this.top + "px";

    this.greyDivRight.style.width = width + "px";
    this.greyDivTop.style.right = this.image.offsetLeft + "px";

    const height = this.top + this.height;

    this.greyDivBottom.style.height =
      this.imageContainer.clientHeight - height + "px";

    console.log(this.imageContainer.clientHeight, height);

    this.greyDivLeft.style.height = this.height + "px";
    this.greyDivLeft.style.top = this.top + "px";
    this.greyDivLeft.style.width = this.left + "px";
  }

  styles() {
    return `.image-cropper {
      width: 70%;
      height: 80vh;
      position: fixed;
      top: -100px;
      left: 12.5%;
      user-select: none;
  }
  
  .image-cropper img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      user-select: none;
  }
  
  .image-container {
      height: 75%;
      user-select: none;
      position: relative;
  
  }
  
  .grey {
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      user-select: none;
  }
  
  .grey:nth-child(1) {
      top: 0;
      width: 100%;
      left: 0;
      height:0px;
      user-select: none;
  }
  
  .grey:nth-child(2) {
      top: 0;
      height: 100%;
      right: 0;
  
  }
  
  .grey:nth-child(3) {
      bottom: 0;
      width: 100%;
      right: 0;
      height:0;
  }
  
  .grey:nth-child(4) {
      left: 0;
      height: 0;
      right: 0;
   
  }
  
  
  .crop-area {
      width: 60%;
      height: 100%;
      border: 1px solid #000;
      position: absolute;
      left: 20%;
      top: 0;
      user-select: none;
      resize: both;
  }
  
  
  
  .handle-right {
      width: 10px;
      height: 10px;
      top: 50%;
      right: -5px;
      background: #000;
      position: absolute;
  }
  
  .handle-left {
      width: 10px;
      height: 10px;
      top: 50%;
      left: -5px;
      background: #000;
      position: absolute;
  }
  
  .handle-top {
      width: 10px;
      height: 10px;
      top: -5px;
      left: 50%;
      background: #000;
      position: absolute;
  }
  
  .handle-bottom {
      width: 10px;
      height: 10px;
      bottom: -5px;
      left: 50%;
      background: #000;
      position: absolute;
  }`;
  }
}

// var cropper = new JSCrop('/img/goflexi.png');

function getRenderedSize(contains, cWidth, cHeight, width, height, pos, img) {
  var oRatio = width / height,
    cRatio = cWidth / cHeight;

  return function () {
    if (contains ? oRatio > cRatio : oRatio < cRatio) {
      this.width = cWidth;
      this.height = cWidth / oRatio;
    } else {
      this.width = cHeight * oRatio;
      this.height = cHeight;
    }
    this.left = (cWidth - this.width) * (pos / 100);
    this.right = this.width + this.left;

    return this;
  }.call({});
}

function getImgSizeInfo(img) {
  var pos = window
    .getComputedStyle(img)
    .getPropertyValue("object-position")
    .split(" ");
  return getRenderedSize(
    true,
    img.width,
    img.height,
    img.naturalWidth,
    img.naturalHeight,
    parseInt(pos[0]),
    img
  );
}

const JSCropper = new JSCrop();

const options = {
  image: "image_url",
  add_styles: true,
  upload: true,
  upload_url: "upload_url",
  upload_fields,
};
