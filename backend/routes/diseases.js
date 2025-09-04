const express = require('express');
const router = express.Router();

// Comprehensive disease database with symptoms and medicine suggestions
const diseaseDatabase = {
    'fever': {
        name: 'Fever',
        symptoms: ['elevated body temperature', 'chills', 'sweating', 'headache', 'muscle aches', 'fatigue', 'loss of appetite'],
        severity: 'moderate',
        commonCauses: ['Viral infections', 'Bacterial infections', 'Inflammatory conditions', 'Heat exhaustion'],
        medicines: [
            {
                name: 'Paracetamol (Acetaminophen)',
                dosage: '500-1000mg every 4-6 hours',
                type: 'Pain reliever and fever reducer',
                prescription: false
            },
            {
                name: 'Ibuprofen',
                dosage: '200-400mg every 4-6 hours',
                type: 'Anti-inflammatory and fever reducer',
                prescription: false
            },
            {
                name: 'Aspirin',
                dosage: '325-650mg every 4-6 hours',
                type: 'Pain reliever and fever reducer',
                prescription: false
            }
        ],
        homeRemedies: ['Rest', 'Stay hydrated', 'Cool compress', 'Light clothing'],
        whenToSeeDoctor: 'If fever is above 103°F (39.4°C) or lasts more than 3 days'
    },
    'headache': {
        name: 'Headache',
        symptoms: ['pain in head', 'pressure sensation', 'sensitivity to light', 'nausea', 'dizziness', 'tension in neck'],
        severity: 'mild to moderate',
        commonCauses: ['Stress', 'Dehydration', 'Eye strain', 'Sinus issues', 'Poor posture', 'Lack of sleep'],
        medicines: [
            {
                name: 'Paracetamol (Acetaminophen)',
                dosage: '500-1000mg every 4-6 hours',
                type: 'Pain reliever',
                prescription: false
            },
            {
                name: 'Ibuprofen',
                dosage: '200-400mg every 4-6 hours',
                type: 'Anti-inflammatory pain reliever',
                prescription: false
            },
            {
                name: 'Aspirin',
                dosage: '325-650mg every 4-6 hours',
                type: 'Pain reliever',
                prescription: false
            }
        ],
        homeRemedies: ['Rest in dark room', 'Cold compress', 'Massage', 'Hydration', 'Stress management'],
        whenToSeeDoctor: 'If headache is severe, sudden, or accompanied by other symptoms'
    },
    'cough': {
        name: 'Cough',
        symptoms: ['throat irritation', 'chest discomfort', 'mucus production', 'dry cough', 'wet cough', 'hoarseness'],
        severity: 'mild to moderate',
        commonCauses: ['Upper respiratory infections', 'Allergies', 'Smoking', 'Post-nasal drip', 'Acid reflux'],
        medicines: [
            {
                name: 'Dextromethorphan',
                dosage: '15-30mg every 4-6 hours',
                type: 'Cough suppressant',
                prescription: false
            },
            {
                name: 'Guaifenesin',
                dosage: '200-400mg every 4 hours',
                type: 'Expectorant (loosens mucus)',
                prescription: false
            },
            {
                name: 'Honey',
                dosage: '1-2 teaspoons as needed',
                type: 'Natural cough suppressant',
                prescription: false
            }
        ],
        homeRemedies: ['Honey tea', 'Steam inhalation', 'Saltwater gargle', 'Humidifier', 'Rest'],
        whenToSeeDoctor: 'If cough lasts more than 2 weeks or is accompanied by fever'
    },
    'diabetes': {
        name: 'Diabetes',
        symptoms: ['increased thirst', 'frequent urination', 'fatigue', 'blurred vision', 'slow healing', 'weight loss'],
        severity: 'high',
        commonCauses: ['Insulin resistance', 'Autoimmune response', 'Genetic factors', 'Lifestyle factors'],
        medicines: [
            {
                name: 'Metformin',
                dosage: '500-2000mg daily (as prescribed)',
                type: 'Oral diabetes medication',
                prescription: true
            },
            {
                name: 'Insulin',
                dosage: 'As prescribed by doctor',
                type: 'Injectable diabetes medication',
                prescription: true
            },
            {
                name: 'Glimepiride',
                dosage: '1-8mg daily (as prescribed)',
                type: 'Sulfonylurea medication',
                prescription: true
            }
        ],
        homeRemedies: ['Blood sugar monitoring', 'Balanced diet', 'Regular exercise', 'Weight management'],
        whenToSeeDoctor: 'Immediate medical attention required for diabetes diagnosis and management'
    },
    'hypertension': {
        name: 'Hypertension (High Blood Pressure)',
        symptoms: ['often asymptomatic', 'headaches', 'shortness of breath', 'nosebleeds', 'chest pain', 'dizziness'],
        severity: 'high',
        commonCauses: ['Poor diet', 'Lack of exercise', 'Stress', 'Genetics', 'Obesity', 'Excessive salt intake'],
        medicines: [
            {
                name: 'Lisinopril',
                dosage: '10-40mg daily (as prescribed)',
                type: 'ACE inhibitor',
                prescription: true
            },
            {
                name: 'Amlodipine',
                dosage: '5-10mg daily (as prescribed)',
                type: 'Calcium channel blocker',
                prescription: true
            },
            {
                name: 'Hydrochlorothiazide',
                dosage: '12.5-25mg daily (as prescribed)',
                type: 'Diuretic',
                prescription: true
            }
        ],
        homeRemedies: ['Low-sodium diet', 'Regular exercise', 'Stress management', 'Limit alcohol', 'Quit smoking'],
        whenToSeeDoctor: 'Regular monitoring required; seek immediate care for severe symptoms'
    },
    'asthma': {
        name: 'Asthma',
        symptoms: ['wheezing', 'shortness of breath', 'chest tightness', 'coughing', 'rapid breathing', 'difficulty breathing'],
        severity: 'moderate to high',
        commonCauses: ['Allergies', 'Respiratory infections', 'Exercise', 'Cold air', 'Stress', 'Air pollution'],
        medicines: [
            {
                name: 'Albuterol Inhaler',
                dosage: '2 puffs every 4-6 hours as needed',
                type: 'Short-acting bronchodilator',
                prescription: true
            },
            {
                name: 'Fluticasone Inhaler',
                dosage: '1-2 puffs twice daily (as prescribed)',
                type: 'Inhaled corticosteroid',
                prescription: true
            },
            {
                name: 'Montelukast',
                dosage: '10mg daily (as prescribed)',
                type: 'Leukotriene modifier',
                prescription: true
            }
        ],
        homeRemedies: ['Avoid triggers', 'Use air purifier', 'Stay hydrated', 'Breathing exercises'],
        whenToSeeDoctor: 'Immediate care for severe attacks; regular monitoring for chronic management'
    },
    'depression': {
        name: 'Depression',
        symptoms: ['persistent sadness', 'loss of interest', 'fatigue', 'sleep problems', 'appetite changes', 'feelings of worthlessness'],
        severity: 'moderate to high',
        commonCauses: ['Chemical imbalance', 'Life events', 'Genetics', 'Medical conditions', 'Substance abuse'],
        medicines: [
            {
                name: 'Sertraline (Zoloft)',
                dosage: '50-200mg daily (as prescribed)',
                type: 'Selective serotonin reuptake inhibitor (SSRI)',
                prescription: true
            },
            {
                name: 'Fluoxetine (Prozac)',
                dosage: '20-80mg daily (as prescribed)',
                type: 'SSRI antidepressant',
                prescription: true
            },
            {
                name: 'Bupropion (Wellbutrin)',
                dosage: '150-450mg daily (as prescribed)',
                type: 'Atypical antidepressant',
                prescription: true
            }
        ],
        homeRemedies: ['Therapy', 'Exercise', 'Social support', 'Regular sleep', 'Stress management'],
        whenToSeeDoctor: 'Professional help required for depression diagnosis and treatment'
    },
    'insomnia': {
        name: 'Insomnia',
        symptoms: ['difficulty falling asleep', 'waking up frequently', 'early morning awakening', 'daytime fatigue', 'irritability', 'poor concentration'],
        severity: 'mild to moderate',
        commonCauses: ['Stress', 'Poor sleep habits', 'Medical conditions', 'Medications', 'Caffeine', 'Screen time'],
        medicines: [
            {
                name: 'Melatonin',
                dosage: '1-5mg 30 minutes before bedtime',
                type: 'Natural sleep hormone',
                prescription: false
            },
            {
                name: 'Diphenhydramine',
                dosage: '25-50mg 30 minutes before bedtime',
                type: 'Antihistamine sleep aid',
                prescription: false
            },
            {
                name: 'Zolpidem (Ambien)',
                dosage: '5-10mg at bedtime (as prescribed)',
                type: 'Prescription sleep medication',
                prescription: true
            }
        ],
        homeRemedies: ['Sleep hygiene', 'Relaxation techniques', 'Limit caffeine', 'Regular schedule', 'Dark, quiet room'],
        whenToSeeDoctor: 'If insomnia persists for more than 2 weeks or affects daily functioning'
    }
};

// Disease prediction based on symptoms
router.post('/predict', async (req, res) => {
    try {
        const { symptoms } = req.body;
        
        if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
            return res.status(400).json({
                message: 'Please provide an array of symptoms',
                example: ['fever', 'headache', 'cough']
            });
        }

        // Convert symptoms to lowercase for matching
        const inputSymptoms = symptoms.map(s => s.toLowerCase());
        
        // Calculate match scores for each disease
        const predictions = [];
        
        for (const [diseaseKey, disease] of Object.entries(diseaseDatabase)) {
            let matchScore = 0;
            let matchedSymptoms = [];
            
            // Check each input symptom against disease symptoms
            for (const symptom of inputSymptoms) {
                for (const diseaseSymptom of disease.symptoms) {
                    if (diseaseSymptom.includes(symptom) || symptom.includes(diseaseSymptom)) {
                        matchScore += 1;
                        matchedSymptoms.push(symptom);
                        break;
                    }
                }
            }
            
            // Calculate percentage match
            const matchPercentage = (matchScore / inputSymptoms.length) * 100;
            
            if (matchPercentage > 0) {
                predictions.push({
                    disease: disease.name,
                    matchPercentage: Math.round(matchPercentage),
                    matchedSymptoms,
                    severity: disease.severity,
                    commonCauses: disease.commonCauses,
                    medicines: disease.medicines,
                    homeRemedies: disease.homeRemedies,
                    whenToSeeDoctor: disease.whenToSeeDoctor
                });
            }
        }
        
        // Sort by match percentage (highest first)
        predictions.sort((a, b) => b.matchPercentage - a.matchPercentage);
        
        // Get top 3 predictions
        const topPredictions = predictions.slice(0, 3);
        
        res.json({
            success: true,
            inputSymptoms,
            predictions: topPredictions,
            totalDiseasesChecked: Object.keys(diseaseDatabase).length,
            message: topPredictions.length > 0 
                ? 'Disease predictions found based on your symptoms'
                : 'No specific disease matches found for the given symptoms'
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing disease prediction',
            error: error.message
        });
    }
});

// Get all available symptoms for autocomplete
router.get('/symptoms', async (req, res) => {
    try {
        const allSymptoms = new Set();
        
        // Collect all unique symptoms from the database
        for (const disease of Object.values(diseaseDatabase)) {
            disease.symptoms.forEach(symptom => allSymptoms.add(symptom));
        }
        
        const symptomsList = Array.from(allSymptoms).sort();
        
        res.json({
            success: true,
            symptoms: symptomsList,
            count: symptomsList.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching symptoms list',
            error: error.message
        });
    }
});

// Get all available diseases
router.get('/list', async (req, res) => {
    try {
        const diseaseList = Object.values(diseaseDatabase).map(disease => ({
            name: disease.name,
            symptoms: disease.symptoms,
            severity: disease.severity
        }));
        
        res.json({
            success: true,
            diseases: diseaseList,
            count: diseaseList.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching disease list',
            error: error.message
        });
    }
});

// Get specific disease information
router.get('/:diseaseName', async (req, res) => {
    try {
        const { diseaseName } = req.params;
        const searchTerm = diseaseName.toLowerCase();
        
        // Find disease by name (exact or partial match)
        const disease = Object.values(diseaseDatabase).find(d => 
            d.name.toLowerCase().includes(searchTerm) || 
            d.name.toLowerCase() === searchTerm
        );
        
        if (!disease) {
            return res.status(404).json({
                success: false,
                message: 'Disease not found',
                suggestion: 'Try searching with different keywords or check the symptoms list'
            });
        }
        
        res.json({
            success: true,
            disease
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching disease information',
            error: error.message
        });
    }
});

module.exports = router;
