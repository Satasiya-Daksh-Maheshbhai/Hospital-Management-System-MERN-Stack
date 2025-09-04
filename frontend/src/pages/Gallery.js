import React, { useMemo, useState } from 'react';

const photos = [
  { url: require('../assets/gallery/lobby.jpg'), title: 'Lobby' },
  { url: require('../assets/gallery/icu.jpg'), title: 'ICU' },
  { url: require('../assets/gallery/operating-room.jpg'), title: 'Operating Room' },
  { url: require('../assets/gallery/pharmacy.jpg'), title: 'Pharmacy' },
  { url: require('../assets/gallery/ward.jpg'), title: 'Ward' },
  { url: require('../assets/gallery/reception.jpg'), title: 'Reception' },
  { url: require('../assets/gallery/lab.jpg'), title: 'Lab' },
  { url: require('../assets/gallery/ambulance.jpg'), title: 'Ambulance' },
  { url: require('../assets/gallery/ct-scan.jpg'), title: 'CT Scan' },
  { url: require('../assets/gallery/nursing.jpg'), title: 'Nursing' },
  { url: require('../assets/gallery/radiology.jpg'), title: 'Radiology' },
  { url: require('../assets/gallery/pediatrics.jpg'), title: 'Pediatrics' },
  { url: require('../assets/gallery/cardiology.jpg'), title: 'Cardiology' },
  { url: require('../assets/gallery/orthopedics.jpg'), title: 'Orthopedics' },
  { url: require('../assets/gallery/cafeteria.jpg'), title: 'Cafeteria' },
  { url: require('../assets/gallery/waiting-area.jpg'), title: 'Waiting Area' },
  { url: require('../assets/gallery/mri-suite.jpg'), title: 'MRI Suite' },
  { url: require('../assets/gallery/dialysis.jpg'), title: 'Dialysis' },
  { url: require('../assets/gallery/neonatal.jpg'), title: 'Neonatal Care' },
  { url: require('../assets/gallery/pathology.jpg'), title: 'Pathology' },
  { url: require('../assets/gallery/icu-corridor.jpg'), title: 'ICU Corridor' },
  { url: require('../assets/gallery/nurses-station.jpg'), title: 'Nurses Station' },
  { url: require('../assets/gallery/physiotherapy.jpg'), title: 'Physiotherapy Room' },
  { url: require('../assets/gallery/surgical-prep.jpg'), title: 'Surgical Prep' },
  { url: require('../assets/gallery/lab-benches.jpg'), title: 'Laboratory Benches' },
  { url: require('../assets/gallery/pharmacy-shelves.jpg'), title: 'Pharmacy Shelves' },
  { url: require('../assets/gallery/ultrasound.jpg'), title: 'Ultrasound' },
  { url: require('../assets/gallery/ward-care.jpg'), title: 'Ward Care' },
  { url: require('../assets/gallery/triage.jpg'), title: 'Triage' },
  { url: require('../assets/gallery/research.jpg'), title: 'Research' },
  { url: require('../assets/gallery/canteen.jpg'), title: 'Canteen' },
];

const Gallery = () => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    return photos.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="gallery-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-heading">Gallery</h2>
        <div className="input-group" style={{maxWidth: 320}}>
          <span className="input-group-text">Search</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Type e.g. Ward, ICU" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="alert alert-warning">No photos match your search.</div>
      ) : (
        <div className="row g-3">
          {filtered.map((p, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <img src={p.url} className="card-img-top" alt={p.title} />
                <div className="card-body">
                  <h6 className="card-title mb-0">{p.title}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;


