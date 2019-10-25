class Greeter {
  element: HTMLElement;
  span: HTMLElement;
  timeToken: any;

  constructor(element: HTMLElement) {
    this.element = element;
    this.element.innerHTML += "This time is: ";
    this.span = document.createElement("span");
    this.element.appendChild(this.span);
    this.span.innerHTML = new Date().toUTCString();
  }

  start() {
    this.timeToken = setInterval(() => {
      this.span.innerHTML = new Date().toUTCString()
    }, 500);
  }

  stop() {
    clearInterval(this.timeToken);
  }
}

window.onload = () => {
  let ele = document.getElementById("content");

  if (ele) {
    const greeter = new Greeter(ele);
    greeter.start();
  }
};
