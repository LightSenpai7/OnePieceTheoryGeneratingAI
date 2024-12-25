import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Modal from './components/Modal'; 
import routes from './routes/routes';
import './App.css';

function App() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false); 
  const element = useRoutes(routes);

  useEffect(() => {
    const consent = localStorage.getItem('storageConsent');
    if (consent === 'true') {
      setIsConsentGiven(true); 
    } else {
      setIsModalVisible(true); 
    }
  }, []);

  const handleConsent = (isAccepted: boolean) => {
    if (isAccepted) {
      localStorage.setItem('storageConsent', 'true'); 
      setIsConsentGiven(true); 
    } else {
      localStorage.setItem('storageConsent', 'false'); 
    }
    setIsModalVisible(isAccepted ? false : true);
  };

  return (
    <>
      {element}

      {isModalVisible && <Modal onAccept={() => handleConsent(true)} onReject={() => handleConsent(false)} />}

      {!isConsentGiven && (
        <div
          className="overlay"
          style={{ background: 'rgba(0, 0, 0, 0.7)', zIndex: 999 }}
        >
          <div className="overlay-content">
            <h3>Application functionality is limited until consent is given.</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
