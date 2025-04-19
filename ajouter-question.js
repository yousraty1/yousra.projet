// TODO : Ajouter un écouteur d'événement pour ajouter des propositions dynamiquement
document.getElementById('add-proposition').addEventListener('click', () => {
    const container = document.createElement('div');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Proposition';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    container.appendChild(checkbox);
    container.appendChild(input);

    document.getElementById('propositions').appendChild(container);
});

// TODO : Ajouter un écouteur d'événement pour enregistrer la question
document.getElementById('form-question').addEventListener('submit', function(e) {
    e.preventDefault();

    const enonce = document.getElementById('enonce').value.trim();
    const duree = parseInt(document.getElementById('duree').value);
    const points = parseInt(document.getElementById('points').value);
    const proprietaire = document.getElementById('proprietaire').value.trim();
    const nomExamen = document.getElementById('nom-examen').value.trim();

    if (!enonce || isNaN(duree) || isNaN(points) || !proprietaire || !nomExamen) {
        alert('Veuillez remplir tous les champs requis.');
        return;
    }

    const propositions = [];
    let hasCorrect = false;

    document.querySelectorAll('#propositions div').forEach(div => {
        const texte = div.querySelector('input[type="text"]').value.trim();
        const correcte = div.querySelector('input[type="checkbox"]').checked;
        if (texte) {
            propositions.push({ texte, correcte });
            if (correcte) {
                hasCorrect = true;
            }
        }
    });

    if (propositions.length < 2) {
        alert('Veuillez ajouter au moins deux propositions.');
        return;
    }

    if (!hasCorrect) {
        alert('Veuillez cocher au moins une proposition correcte.');
        return;
    }

    // TODO : Trouver l'examen existant à partir du localStorage
    const examsKey = 'examens_' + proprietaire;
    const exams = JSON.parse(localStorage.getItem(examsKey)) || [];
    const exam = exams.find(e => e.nom === nomExamen);

    if (!exam) {
        alert('Examen non trouvé !');
        return;
    }

    // TODO : Ajouter la question à l'examen et mettre à jour le localStorage
    const question = { enonce, duree, points, propositions };
    exam.questions = exam.questions || [];
    exam.questions.push(question);
    localStorage.setItem(examsKey, JSON.stringify(exams));

    alert('Question ajoutée avec succès !');

    // Réinitialiser le formulaire et les propositions
    this.reset();
    document.getElementById('propositions').innerHTML = '';
});
