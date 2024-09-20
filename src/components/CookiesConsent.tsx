import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';

const CookieConsent: React.FC = () => {
  const [cookies, setCookie] = useCookies(['cookieConsent']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (cookies.cookieConsent) return

    if (!cookies.cookieConsent) {
      setIsModalOpen(true);
    }
  }, [cookies]);

  const handleAcceptCookies = () => {
    setCookie('cookieConsent', 'true', { path: '/' });
    setIsModalOpen(false);
  };

  const handleDeclineCookies = () => {
    setIsModalOpen(false);
  };

  const closeModal = () => {};

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="bg-white rounded shadow-lg p-4 flex flex-col w-1/2 h-32 mx-auto mt-auto mb-8"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
      >
        <h2 className="font-semibold mb-1">Uso de Cookies</h2>
        <p className='text-sm'>
          Utilizamos cookies para melhorar sua experiência. Você concorda em permitir o uso de cookies?
        </p>
        <div className="mt-2">
          <button 
            className="px-4 mr-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-500" 
            onClick={handleAcceptCookies}
          >
            Aceitar
          </button>
          <button 
            className="px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-500" 
            onClick={handleDeclineCookies}
          >
            Recusar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CookieConsent;
