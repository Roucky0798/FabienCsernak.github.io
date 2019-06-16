console.clear();

class Particle {
  constructor(w, h) {
    this.size = 10;
    this.length = 12;
    this.position = {
      x: ~~(~~(Math.random() * w) / this.length) * this.length,
      y: ~~(~~(Math.random() * h) / this.length) * this.length };

    this.color = Math.random() < 0.5 ? blue : red;
  }}


const c = document.createElement('canvas'),
$ = c.getContext('2d');

let w = c.width = innerWidth,
h = c.height = innerHeight,
particles = [],
particle_count = 50,
blue = 'rgba(9, 132, 227, 0.5)',
red = 'rgba(214, 48, 49, 0.5)';

document.body.appendChild(c);

const init = () => {
  resize();
  stage('rgba(230, 230, 230, 1)', w, h);
  for (let i = 0; i < particle_count; i++) {
    particles.push(new Particle(w, h));
  }
  loop();
};

const resize = () => {
  w = c.width = innerWidth;
  h = c.height = innerHeight;
};

const stage = (background, width, height) => {
  $.fillStyle = background;
  $.fillRect(0, 0, width, height);
};

const draw = () => {
  stage('rgba(230, 230, 230, 0.025)', w, h);

  particles.forEach(function (p, i) {
    let directions = ['u', 'r', 'd', 'l'],
    direction = directions[~~(Math.random() * directions.length)];
    $.fillStyle = p.color;
    $.beginPath();
    $.fillRect(p.position.x, p.position.y, p.size, p.size);
    switch (direction) {
      case 'u':
        p.position.y -= p.length;
        break;
      case 'r':
        p.position.x += p.length;
        break;
      case 'd':
        p.position.y += p.length;
        break;
      case 'l':
        p.position.x -= p.length;
        break;
      default:
        break;}


    $.fillRect(p.position.x, p.position.y, p.size, p.size);

    if (p.position.x < 0 || p.position.x > w) {
      if (p.position.x < 0) p.color = blue;
      if (p.position.x > w) p.color = red;
      p.position.x = ~~(~~(Math.random() * w) / p.length) * p.length;
    }

    if (p.position.y < 0 || p.position.y > h) {
      p.position.y = ~~(~~(Math.random() * h) / p.length) * p.length;
    }
  });
};

const loop = () => {
  requestAnimationFrame(loop);
  draw();
};

window.onresize = resize;

init();