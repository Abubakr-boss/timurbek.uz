// Drag & Drop Game
let words = document.querySelectorAll(".word");
let targets = document.querySelectorAll(".target");
let matchedCount = 0;

words.forEach(word => {
    word.addEventListener("dragstart", () => {
        word.classList.add("dragging");
    });
    word.addEventListener("dragend", () => {
        word.classList.remove("dragging");
    });
});

targets.forEach(target => {
    target.addEventListener("dragover", e => {
        e.preventDefault();
    });

    target.addEventListener("drop", () => {
        let draggingWord = document.querySelector(".dragging");
        if (draggingWord.dataset.translate === target.dataset.word) {
            target.textContent = draggingWord.textContent + " (" + target.textContent + ")";
            draggingWord.remove();
            matchedCount++;

            if (matchedCount === targets.length) {
                document.getElementById("match-result").textContent = "Great! You matched all words!";
                setTimeout(startQuiz, 1500);
            }
        } else {
            alert("Wrong match! Try again.");
        }
    });
});

// Quiz Game
let quizData = [
    { question: "apple", answer: "яблоко" },
    { question: "cat", answer: "кошка" },
    { question: "dog", answer: "собака" },
    { question: "book", answer: "книга" }
];
let currentQuestionIndex = 0;

function startQuiz() {
    document.getElementById("drag-game").style.display = "none";
    document.getElementById("quiz-game").style.display = "block";
    showQuestion();
}

function showQuestion() {
    let currentQuestion = quizData[currentQuestionIndex];
    document.getElementById("quiz-question").textContent = 
        `What is "${currentQuestion.question}" in Russian?`;
    document.getElementById("quiz-answer").value = "";
}

document.getElementById("submit-answer").addEventListener("click", () => {
    let answer = document.getElementById("quiz-answer").value.trim().toLowerCase();
    let correctAnswer = quizData[currentQuestionIndex].answer.toLowerCase();

    if (answer === correctAnswer) {
        document.getElementById("quiz-result").textContent = "✅ Correct!";
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            setTimeout(showQuestion, 1000);
        } else {
            document.getElementById("quiz-result").textContent = "🎉 You finished the quiz!";
        }
    } else {
        document.getElementById("quiz-result").textContent = "❌ Wrong! Try again.";
    }
});
