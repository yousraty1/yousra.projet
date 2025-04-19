// Logic to add an exam
document.getElementById('form-examen').addEventListener('submit', function(e) {
    e.preventDefault();

    const examen = {
        nom: document.getElementById('nom').value,
        duree: parseInt(document.getElementById('duree').value),
        description: document.getElementById('description').value,
        proprietaire: document.getElementById('email').value, // email = identifiant unique
        questions: []
    };

    const examsKey = 'examens_' + examen.proprietaire;
    const exams = JSON.parse(localStorage.getItem(examsKey)) || [];
    exams.push(examen);
    localStorage.setItem(examsKey, JSON.stringify(exams));

    alert('Examen ajouté avec succès !');
    this.reset();
});

// Logic to display exams for a given owner (propriétaire)
document.getElementById('afficher').addEventListener('click', () => {
    const prop = document.getElementById('proprietaire').value.trim();

    if (!prop) {
        alert("Veuillez entrer un nom de propriétaire.");
        return;
    }

    const examsKey = 'examens_' + prop;
    const exams = JSON.parse(localStorage.getItem(examsKey)) || [];
    const container = document.getElementById('resultat');
    container.innerHTML = ''; // Clear previous results

    if (exams.length === 0) {
        // Show message when no exams are found for the owner
        container.innerHTML = '<p>Aucun examen trouvé pour ce propriétaire.</p>';
        return;
    }

    // Display exams and their questions
    exams.forEach((exam) => {
        const div = document.createElement('div');
        div.classList.add('exam-container');
        div.innerHTML = `
            <h2>${exam.nom} (${exam.duree} min)</h2>
            <p><strong>Description:</strong> ${exam.description}</p>
            <h3>Questions :</h3>
            <ul>
                ${exam.questions.map(q => `
                    <li><strong>${q.enonce}</strong><ul>
                        ${q.propositions.map(p => 
                            `<li>${p.texte} ${p.correcte ? '(Correcte)' : ''}</li>`).join('')}
                    </ul></li>`
                ).join('')}
            </ul>
        `;
        container.appendChild(div);
    });
});
