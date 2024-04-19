const quizData = [
    {
      question: "How much marks i will get in this project out of 20?",
      options: ["20", "21", "69", "88"],
      answer: "21"
    },
    {
      question: "Who penned the book 'Wing of Fire'?",
      options: ["APJ Abdul Kalam", "Narpender", "RaviKant", "Anchita Ma'am"],
      answer: "APJ Abdul Kalam"
    },
    {
      question: "Which is the largest planet in our solar system?",
      options: ["Jupiter", "Saturn", "Mars", "Earth"],
      answer: "Jupiter"
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"],
      answer: "Mitochondria"
    },
    {
      question: "What is the capital of Japan?",
      options: ["Tokyo", "Beijing", "Seoul", "Osaka"],
      answer: "Tokyo"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 300; // 5 minutes in seconds
  
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const resultText = document.getElementById('result');
  const scoreValue = document.getElementById('score-value');
  const timerValue = document.getElementById('timer-value');
  
  // Update the timer every second
  const timerInterval = setInterval(updateTimer, 1000);
  
  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    timerValue.textContent = `${minutes}:${seconds}`;
    if (timeLeft === 0) {
      endQuiz();
      clearInterval(timerInterval);
    } else {
      timeLeft--;
    }
  }
  
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionText.innerText = currentQuizData.question;
    optionsContainer.innerHTML = "";
    currentQuizData.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('option-btn');
      button.addEventListener('click', () => selectAnswer(option));
      optionsContainer.appendChild(button);
    });
  }
  
  function selectAnswer(selectedOption) {
    const currentQuizData = quizData[currentQuestion];
    if (selectedOption === currentQuizData.answer) {
      score++;
      optionsContainer.childNodes.forEach(button => {
        if (button.innerText === currentQuizData.answer) {
          button.classList.add('correct');
        }
      });
    } else {
      optionsContainer.childNodes.forEach(button => {
        if (button.innerText === selectedOption) {
          button.classList.add('incorrect');
        }
        if (button.innerText === currentQuizData.answer) {
          button.classList.add('correct');
        }
      });
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    questionText.innerText = "Quiz completed!";
    optionsContainer.innerHTML = "";
    resultText.innerText = "Your final score is " + score + " out of " + quizData.length;
    scoreValue.innerText = score;
    clearInterval(timerInterval);
  }
  
  loadQuestion();
