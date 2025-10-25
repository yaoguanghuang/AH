class StateMachine {
  constructor(containerDiv, leftBtn, rightBtn) {
    this.images = Array.from(containerDiv.querySelectorAll("img"));
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.currentIndex = 0;
    this.images.forEach((img, i) => {
      img.style.display = i === 0 ? "block" : "none";
    });
    this.leftBtn.addEventListener("click", () => this.prevState());
    this.rightBtn.addEventListener("click", () => this.nextState());
  }

  prevState() {
    this.images[this.currentIndex].style.display = "none";
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.images[this.currentIndex].style.display = "block";
  }

  nextState() {
    this.images[this.currentIndex].style.display = "none";
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.images[this.currentIndex].style.display = "block";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".StateMachine");

  containers.forEach(container => {
    const leftBtnId = container.dataset.left;
    const rightBtnId = container.dataset.right;

    const leftBtn = document.getElementById(leftBtnId);
    const rightBtn = document.getElementById(rightBtnId);

    const stateContainer = container.querySelector("div");

    new StateMachine(stateContainer, leftBtn, rightBtn);
  });
});

