const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();

const Exam = require('./models/Exam');

const app = express();
app.use(bodyParser.json());

const BASE_URL = 'https://exam.com/';

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

// Fonction pour générer un lien SHA256
function generateUniqueLink(titre, description, publicCible) {
  const rawData = `${titre}-${description}-${publicCible}-${Date.now()}`;
  const hash = crypto.createHash('sha256').update(rawData).digest('hex');
  return BASE_URL + hash.substring(0, 10); // On garde les 10 premiers caractères
}

// Route POST /generate-link
app.post('/generate-link', async (req, res) => {
  const { titre, description, publicCible } = req.body;

  // Validation
  if (!titre || !description || !publicCible) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Génération du lien
  const lienUnique = generateUniqueLink(titre, description, publicCible);

  // Enregistrement
  const exam = new Exam({ titre, description, publicCible, lienUnique });
  try {
    await exam.save();
    res.json({
      message: 'Lien unique généré avec succès',
      exam
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la sauvegarde dans la base de données.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours sur http://localhost:${PORT}`);
});