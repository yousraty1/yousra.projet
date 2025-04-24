// Récupérer l'examen existant dans le localStorage
let examData = JSON.parse(localStorage.getItem('currentExam')) || {
    title: '',
    description: '',
    audience: '',
    link: '',
    questions: []
  };
  
  // Gestion du formulaire d'ajout de question
  const questionForm = document.getElementById('form-question');
  const questionList = document.getElementById('questionList');
  
  questionForm.addEventListener('submit', function (e) {
    e.preventDefault();
  
    // ✅ Vérification que l'examen est bien initialisé
    if (!examData.title || !examData.description || !examData.audience) {
      alert('Veuillez d’abord créer un examen avant d’ajouter des questions.');
      return;
    }
  
    const type = document.getElementById('questionType').value;
    const enonce = document.getElementById('enonce').value;
    const duration = parseInt(document.getElementById('duration').value);
    const score = parseInt(document.getElementById('score').value);
  
    const question = {
      type,
      enonce,
      duration,
      score
    };
  
    if (type === 'direct') {
      question.answer = document.getElementById('answer').value;
      question.tolerance = parseFloat(document.getElementById('tolerance').value);
    } else if (type === 'qcm') {
      question.options = document.getElementById('options').value.split(',').map(opt => opt.trim());
      question.correctAnswers = document.getElementById('correctAnswers').value.split(',').map(opt => opt.trim());
    }
  
    // Ajouter la question à l'examen
    examData.questions.push(question);
  
    // Sauvegarder dans le localStorage
    localStorage.setItem('currentExam', JSON.stringify(examData));
  
    // Afficher dans la liste
    const li = document.createElement('li');
    li.textContent = `${question.enonce} (${type.toUpperCase()})`;
    questionList.appendChild(li);
  
    // Réinitialiser le formulaire
    questionForm.reset();
  
    // Réactiver/Désactiver les champs selon le type
    document.getElementById('options').disabled = true;
    document.getElementById('correctAnswers').disabled = true;
    document.getElementById('answer').disabled = false;
    document.getElementById('tolerance').disabled = false;
  
    alert('Question ajoutée avec succès !');
  });
  
  // Activation des champs QCM ou direct
  document.getElementById('questionType').addEventListener('change', function () {
    const isQCM = this.value === 'qcm';
    document.getElementById('options').disabled = !isQCM;
    document.getElementById('correctAnswers').disabled = !isQCM;
    document.getElementById('answer').disabled = isQCM;
    document.getElementById('tolerance').disabled = isQCM;
  });
  