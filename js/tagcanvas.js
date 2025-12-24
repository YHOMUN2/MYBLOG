/*
 * tagcanvas.js - simple 3D rotating tag sphere
 * dependencies: none
 */

(function () {
  function TagCanvas(canvasId, opts = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return console.error("TagCanvas: Canvas not found");

    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // Config
    this.radius = opts.radius || 120;
    this.speed = opts.speed || 0.002;
    this.font = opts.font || "16px Arial";
    this.color = opts.color || "#333";
    this.tags = [];

    this.angleX = this.speed;
    this.angleY = this.speed;

    this.init();
  }

  TagCanvas.prototype.init = function () {
    let tagElements = document.querySelectorAll(".tag-item");
    this.tags = [];

    let len = tagElements.length;
    tagElements.forEach((el, i) => {
      let angleA = Math.acos((2 * (i + 1) - 1) / len - 1);
      let angleB = angleA * Math.sqrt(len * Math.PI);

      let tag = {
        text: el.innerText,
        x: this.radius * Math.sin(angleA) * Math.cos(angleB),
        y: this.radius * Math.sin(angleA) * Math.sin(angleB),
        z: this.radius * Math.cos(angleA)
      };

      this.tags.push(tag);
    });

    requestAnimationFrame(() => this.draw());
  };

  TagCanvas.prototype.rotate = function () {
    let cosX = Math.cos(this.angleX);
    let sinX = Math.sin(this.angleX);
    let cosY = Math.cos(this.angleY);
    let sinY = Math.sin(this.angleY);

    this.tags.forEach(t => {
      // around X
      let y1 = t.y * cosX - t.z * sinX;
      let z1 = t.y * sinX + t.z * cosX;

      t.y = y1;
      t.z = z1;

      // around Y
      let x1 = t.x * cosY - t.z * sinY;
      let z2 = t.x * sinY + t.z * cosY;

      t.x = x1;
      t.z = z2;
    });
  };

  TagCanvas.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.rotate();

    this.tags.forEach(t => {
      let scale = 300 / (300 + t.z);  
      let x = t.x * scale + this.width / 2;
      let y = t.y * scale + this.height / 2;

      this.ctx.font = this.font;
      this.ctx.fillStyle = this.color;
      this.ctx.fillText(t.text, x, y);
    });

    requestAnimationFrame(() => this.draw());
  };

  window.TagCanvas = TagCanvas;
})();
