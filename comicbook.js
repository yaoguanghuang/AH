const book = document.querySelector('#book');
const papers = [];
for (let i = 1; i <= 15; i++) {
    papers.push(document.querySelector(`#p${i}`));
}

let currentState = 1;
const numOfPapers = papers.length;
const maxState = numOfPapers + 1;

document.addEventListener("DOMContentLoaded", () => {
    openBook();
    papers[0].classList.add("flipped");
    papers[0].style.zIndex = 1;
    currentState = 2;
});

book.addEventListener("click", (e) => {
    const rect = book.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
        goPrevious();
    } else {
        goNext()
    }
});

function openBook() {
    book.style.transform = "translateX(50%)";
}

function closeBook(isFirstPage) {
    if (isFirstPage) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
}

function goNext() {
    if (currentState < maxState) {
        const index = currentState - 1;
        if (index < papers.length) {
            papers[index].classList.add("flipped");
            papers[index].style.zIndex = currentState;
        }
        currentState++;
    }
}

function goPrevious() {
    if (currentState > 1) {
        currentState--;
        const index = currentState - 1;
        if (index >= 0 && index < papers.length) {
            papers[index].classList.remove("flipped");
            papers[index].style.zIndex = numOfPapers - index;
        }
    }
}




