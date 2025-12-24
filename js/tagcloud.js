/*
 * tagcloud.js - simple tag cloud generator
 * dependencies: none
 */

(function () {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function TagCloud(containerId, opts = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return console.error("TagCloud: container not found");

    this.minSize = opts.minSize || 14;
    this.maxSize = opts.maxSize || 36;
    this.colors = opts.colors || ["#ff5277", "#3498db", "#2ecc71", "#9b59b6"];

    this.init();
  }

  TagCloud.prototype.init = function () {
    let tags = this.container.querySelectorAll(".tag");

    tags.forEach(tag => {
      let size = random(this.minSize, this.maxSize);
      let color = this.colors[random(0, this.colors.length - 1)];

      tag.style.fontSize = size + "px";
      tag.style.color = color;
      tag.style.margin = random(5, 20) + "px";
      tag.style.display = "inline-block";

      // optional: floating animation
      tag.style.transition = "transform 0.3s";
      tag.addEventListener("mouseover", () => {
        tag.style.transform = "scale(1.2)";
      });
      tag.addEventListener("mouseout", () => {
        tag.style.transform = "scale(1)";
      });
    });
  };

  window.TagCloud = TagCloud;
})();
