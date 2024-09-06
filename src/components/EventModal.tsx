import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { CalendarEvent } from '../types/calendar';

interface EventModalProps {
  isOpen: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
  onSave: (updatedEvent: CalendarEvent) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, event, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [allDay, setAllDay] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(event.start);
      setEnd(event.end || '');
      setAllDay(event.allDay ?? false);
    } else {
      setTitle('');
      setStart('');
      setEnd('');
      setAllDay(false);
    }
  }, [event]);

  const handleSave = () => {
    if (title && start) {
      const updatedEvent: CalendarEvent = {
        id: event ? event.id : String(new Date().getTime()),
        title,
        start,
        end: end || undefined,
        allDay,
      };
      onSave(updatedEvent);
      onClose();
    }
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit Event" className="fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10">
        <h2 className="text-xl font-bold mb-4">{event ? 'Editar Evento' : 'Criar Evento'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Início:</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {!allDay && (
          <div className="mb-4">
            <label className="block text-gray-700">Fim:</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              className="mr-2"
            />
            Evento o dia inteiro
          </label>
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Salvar</button>
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancelar</button>
        </div>
      </div>
    </ReactModal>
  );
};

export default EventModal;
