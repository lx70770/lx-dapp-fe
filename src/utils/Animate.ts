

export default function animate(callback: any) {
    function loop() {
      callback();
      requestAnimationFrame(loop);
    }
    loop();
  }