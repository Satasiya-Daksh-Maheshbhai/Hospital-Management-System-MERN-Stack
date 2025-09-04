import { useEffect, useState } from 'react';

const DiseaseInfo = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSymptomsList, setShowSymptomsList] = useState(false);

  // Fetch available symptoms on component mount
  useEffect(() => {
    fetchAvailableSymptoms();
  }, []);

  const fetchAvailableSymptoms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/diseases/symptoms');
      const data = await response.json();
      if (data.success) {
        setAvailableSymptoms(data.symptoms);
      }
    } catch (err) {
      console.error('Error fetching symptoms:', err);
    }
  };

  const addSymptom = (symptom) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setSymptomInput('');
      setShowSymptomsList(false);
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const handleSymptomInputChange = (e) => {
    setSymptomInput(e.target.value);
    setShowSymptomsList(e.target.value.length > 0);
  };

  const handleSymptomSelect = (symptom) => {
    addSymptom(symptom);
  };

  const handlePrediction = async (e) => {
    e.preventDefault();
    if (symptoms.length === 0) {
      setError('Please add at least one symptom');
      return;
    }

    setLoading(true);
    setError('');
    setPredictions(null);

    try {
      const response = await fetch('http://localhost:5000/api/diseases/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPredictions(data);
      } else {
        setError(data.message || 'Failed to get disease predictions');
      }
    } catch (err) {
      setError('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPrediction = (prediction, index) => {
    return (
      <div key={index} className="card mb-4 border-0 shadow-sm">
        <div className={`card-header ${
          prediction.severity === 'high' ? 'bg-danger text-white' :
          prediction.severity === 'moderate' ? 'bg-warning text-dark' :
          'bg-success text-white'
        }`}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{prediction.disease}</h5>
            <span className="badge bg-light text-dark">
              {prediction.matchPercentage}% Match
            </span>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-primary">
                <i className="fas fa-check-circle me-2"></i>
                Matched Symptoms
              </h6>
              <ul className="list-unstyled">
                {prediction.matchedSymptoms.map((symptom, idx) => (
                  <li key={idx} className="mb-1">
                    <i className="fas fa-arrow-right text-success me-2"></i>
                    {symptom}
                  </li>
                ))}
              </ul>

              <h6 className="text-primary mt-3">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Severity
              </h6>
              <span className={`badge ${
                prediction.severity === 'high' ? 'bg-danger' :
                prediction.severity === 'moderate' ? 'bg-warning' :
                'bg-success'
              }`}>
                {prediction.severity.charAt(0).toUpperCase() + prediction.severity.slice(1)}
              </span>

              <h6 className="text-primary mt-3">
                <i className="fas fa-info-circle me-2"></i>
                Common Causes
              </h6>
              <ul className="list-unstyled">
                {prediction.commonCauses.map((cause, idx) => (
                  <li key={idx} className="mb-1">
                    <i className="fas fa-arrow-right text-muted me-2"></i>
                    {cause}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-6">
              <h6 className="text-primary">
                <i className="fas fa-pills me-2"></i>
                Recommended Medicines
              </h6>
              {prediction.medicines.map((medicine, idx) => (
                <div key={idx} className="card mb-2 border-start border-primary border-4">
                  <div className="card-body py-2">
                    <h6 className="mb-1">{medicine.name}</h6>
                    <p className="mb-1 small text-muted">{medicine.type}</p>
                    <p className="mb-1 small"><strong>Dosage:</strong> {medicine.dosage}</p>
                    <span className={`badge ${
                      medicine.prescription ? 'bg-warning' : 'bg-success'
                    }`}>
                      {medicine.prescription ? 'Prescription Required' : 'Over-the-Counter'}
                    </span>
                  </div>
                </div>
              ))}

              <h6 className="text-primary mt-3">
                <i className="fas fa-home me-2"></i>
                Home Remedies
              </h6>
              <ul className="list-unstyled">
                {prediction.homeRemedies.map((remedy, idx) => (
                  <li key={idx} className="mb-1">
                    <i className="fas fa-arrow-right text-info me-2"></i>
                    {remedy}
                  </li>
                ))}
              </ul>

              <h6 className="text-primary mt-3">
                <i className="fas fa-user-md me-2"></i>
                When to See a Doctor
              </h6>
              <p className="small text-muted">{prediction.whenToSeeDoctor}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredSymptoms = availableSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(symptomInput.toLowerCase())
  );

  return (
    <div className="disease-info-page">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 text-primary mb-3">🔍 Disease Prediction & Medicine Guide</h1>
            <p className="lead">
              Enter your symptoms to get disease predictions and medicine recommendations
            </p>
          </div>

          {/* Symptoms Input Form */}
          <div className="card mb-4 border-0 shadow-sm">
            <div className="card-body">
              <form onSubmit={handlePrediction}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Add Your Symptoms:</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type a symptom (e.g. headache, cough)..."
                      value={symptomInput}
                      onChange={handleSymptomInputChange}
                      onFocus={() => setShowSymptomsList(true)}
                    />
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={() => addSymptom(symptomInput)}
                    >
                      Add
                    </button>
                  </div>
                  
                  {/* Symptoms Autocomplete Dropdown */}
                  {showSymptomsList && symptomInput && (
                    <div className="position-relative">
                      <div className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
                        {filteredSymptoms.slice(0, 8).map((symptom, index) => (
                          <button
                            key={index}
                            type="button"
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSymptomSelect(symptom)}
                          >
                            {symptom}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected Symptoms */}
                {symptoms.length > 0 && (
                  <div className="mb-3">
                    <label className="form-label fw-bold">Selected Symptoms:</label>
                    <div className="d-flex flex-wrap gap-2">
                      {symptoms.map((symptom, index) => (
                        <span key={index} className="badge bg-primary d-flex align-items-center">
                          {symptom}
                          <button
                            type="button"
                            className="btn-close btn-close-white ms-2"
                            onClick={() => removeSymptom(symptom)}
                            style={{ fontSize: '0.5rem' }}
                          ></button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <button
                    className="btn btn-primary btn-lg px-5"
                    type="submit"
                    disabled={loading || symptoms.length === 0}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Analyzing Symptoms...
                      </>
                    ) : (
                      'Get Disease Predictions'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          {/* Predictions Results */}
          {predictions && (
            <div className="predictions-results">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>
                  <i className="fas fa-stethoscope me-2"></i>
                  Disease Predictions
                </h4>
                <small className="text-muted">
                  Based on {predictions.inputSymptoms.length} symptom(s)
                </small>
              </div>

              {/* Standard Predictions */}
              {predictions.predictions && predictions.predictions.length > 0 && (
                <div>
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Note:</strong> These predictions are based on symptom matching and should not replace professional medical advice. 
                    Always consult with a healthcare provider for proper diagnosis and treatment.
                  </div>
                  
                  {predictions.predictions.map((prediction, index) => 
                    renderPrediction(prediction, index)
                  )}
                </div>
              )}

              {/* No Predictions Found */}
              {predictions.predictions && predictions.predictions.length === 0 && (
                <div className="text-center py-5">
                  <div className="display-4 text-muted mb-3">❌</div>
                  <h5>No Predictions Found</h5>
                  <p className="text-muted">
                    We couldn't find specific disease matches for the symptoms: {predictions.inputSymptoms.join(', ')}
                  </p>
                  <p className="text-muted">
                    Try adding more specific symptoms or consult with a healthcare professional.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Information Section */}
          <div className="info-section mt-5">
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="display-4 text-primary mb-3">🔍</div>
                    <h5>Symptom Analysis</h5>
                    <p className="card-text">
                      Enter your symptoms to get disease predictions and treatment recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="display-4 text-primary mb-3">💊</div>
                    <h5>Medicine Guide</h5>
                    <p className="card-text">
                      Get detailed information about recommended medicines, dosages, and whether prescriptions are required.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="display-4 text-primary mb-3">📋</div>
                    <h5>Comprehensive Database</h5>
                    <p className="card-text">
                      Access our extensive database of diseases, symptoms, and treatment options for better health insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="display-4 text-warning mb-3">⚠️</div>
                    <h5>Important Notice</h5>
                    <p className="card-text">
                      This tool is for educational purposes only. Always consult healthcare professionals for proper diagnosis and treatment.
                      These predictions are not a substitute for professional medical advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseInfo;
