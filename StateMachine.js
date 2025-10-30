class StateMachine {
  constructor(containerDiv, leftBtn, rightBtn, descriptionBox) {
    this.images = Array.from(containerDiv.querySelectorAll("img"));
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.descriptionBox = descriptionBox;
    this.currentIndex = 0;

    this.updateStateDisplay();

    this.leftBtn.addEventListener("click", () => this.prevState());
    this.rightBtn.addEventListener("click", () => this.nextState());
  }

  updateStateDisplay() {
    this.images.forEach((img, i) => {
      img.style.display = i === this.currentIndex ? "block" : "none";
    });

    const currentImg = this.images[this.currentIndex];
    const title = currentImg.dataset.title || "";
    const text = currentImg.dataset.text || "";

    const h4 = this.descriptionBox.querySelector("h4");
    const p = this.descriptionBox.querySelector("p");
    if (h4) h4.textContent = title;
    if (p) p.textContent = text;
  }

  prevState() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateStateDisplay();
  }

  nextState() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateStateDisplay();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".StateMachineWapper");

  wrappers.forEach(wrapper => {
    const machine = wrapper.querySelector(".StateMachine");
    const birdDiv = machine.querySelector(".Bird");
    const leftBtn = document.getElementById(machine.dataset.left);
    const rightBtn = document.getElementById(machine.dataset.right);
    const descriptionBox = wrapper.querySelector(".BirdDescription");

    new StateMachine(birdDiv, leftBtn, rightBtn, descriptionBox);
  });
});


