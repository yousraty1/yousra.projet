 // Variables globales
  let currentQuestionIndex = 0;
  let score = 0;
  let timerInterval;
  let timeLeft = 30;
  const questions = [
    {
      question: "Quelle est la capitale de la France ?",
      options: ["Berlin", "Madrid", "Paris", "Lisbonne"],
      answer: "Paris"
    },
    {
      question: "Quel langage est utilisé pour le développement web ?",
      options: ["Python", "HTML", "Java", "C++"],
      answer: "HTML"
    },
    {
      question: "Qui a écrit 'Hamlet' ?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
      answer: "William Shakespeare"
    }
  ];
  
  // Fonction pour démarrer l'examen
  function startExam() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("locationRequest").classList.remove("hidden");
  }
  
  // Fonction pour obtenir la géolocalisation
  function getLocation() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  }
  
  // Fonction pour afficher la position
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("Latitude: " + lat + ", Longitude: " + lon);
    document.getElementById("locationRequest").classList.add("hidden");
    document.getElementById("exam").classList.remove("hidden");
    loadQuestion();
    startTimer();
  }
  
  // Fonction pour afficher une erreur de géolocalisation
  function showError(error) {
    alert("Erreur de géolocalisation : " + error.message);
  }
  
  // Fonction pour charger une question
  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      endExam();
      return;
    }
    const question = questions[currentQuestionIndex];
    document.getElementById("questionText").textContent = question.question;
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";
    question.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(button);
    });
  }
   // Fonction pour vérifier la réponse
  function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
      score += 33; // Attribution de 33 points par bonne réponse
    }
    currentQuestionIndex++;
    loadQuestion();
  }
  
  // Fonction pour passer à la question suivante
  function nextQuestion() {
    loadQuestion();
  }
  
  // Fonction pour démarrer le timer
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endExam();
      }
    }, 1000);
  }
  
  // Fonction pour terminer l'examen