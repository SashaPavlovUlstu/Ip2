var pics = document.querySelectorAll("img");
function classAdd(obj) {
  for (let el of obj) {
    el.classList.add("pics");
  }
}
function random(min, max) {
  return Math.random() * (max - min) + min;
}
classAdd(pics);
let canvas = {
  c: null,
  width: 800,
  height: 800,
  rectangles: [],
  init() {
    this.c = document.querySelector("#canvas").getContext("2d");
  },
  initPics(obj) {
    for (let i = 0; i < obj.length; i++) {
      let pic = obj[i];
      this.rectangles.push({
        x: random(0, 651),
        y: random(0, 651),
        content: pic,
        sx: 1,
        sy: 1,
      });
    }
  },
  anim() {
    for (let elem of this.rectangles) {
      elem.x += elem.sx;
      elem.y += elem.sy;
      if (elem.x > this.width - 150 || elem.x < 0) {
        elem.sx *= -1;
      }
      if (elem.y > this.height - 150 || elem.y < 0) {
        elem.sy *= -1;
      }
    }
  },
  render() {
    this.c.clearRect(0, 0, this.width, this.height);
    for (let rect of this.rectangles) {
      this.c.drawImage(rect.content, rect.x, rect.y, 150, 150);
    }
  },
  run() {
    window.requestAnimationFrame(() => {
      this.anim();
      this.render();
      this.run();
    });
  },
  start(objects) {
    this.init();
    this.initPics(objects);
    this.run();
  },
};
window.addEventListener("load", () => canvas.start(pics));
