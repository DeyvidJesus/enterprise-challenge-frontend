import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import EventModal from './EventModal';
import { CalendarEvent } from '../types/calendar';

const EVENTS_API_URL = 'http://localhost:3000/events';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);
  const [userRole] = useState<string>('student');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(EVENTS_API_URL);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (info: any) => {
    if (userRole === 'admin') {
      setCurrentEvent({
        id: String(new Date().getTime()),
        title: '',
        start: info.dateStr,
        end: '',
        allDay: info.allDay || false,
      });
      setModalIsOpen(true);
    }
  };

  const handleEventClick = (info: any) => {
    setCurrentEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr || '',
      allDay: info.event.allDay || false,
    });
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setCurrentEvent(null);
  };

  const handleModalSave = async (updatedEvent: CalendarEvent) => {
    try {
      if (events.some(event => event.id === updatedEvent.id)) {
        const response = await fetch(`${EVENTS_API_URL}/${updatedEvent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEvent),
        });
        if (response.ok) {
          const updatedEvents = events.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
          );
          setEvents(updatedEvents);
        }
      } else {
        const response = await fetch(EVENTS_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEvent),
        });
        if (response.ok) {
          const newEvent = await response.json();
          setEvents([...events, newEvent]);
        }
      }
      setModalIsOpen(false);
      setCurrentEvent(null);
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    }
  };

  return (
    <div className="calendar-container p-4 bg-gray-100 h-3/5">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events.map((event) => ({
          ...event,
          id: String(event.id),
        }))}
        dateClick={handleDateClick}
        locale={ptBrLocale}
        editable={userRole === "admin"}
        eventClick={handleEventClick}
      />
      {userRole === 'admin' && currentEvent && (
        <EventModal
          isOpen={modalIsOpen}
          event={currentEvent}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default Calendar;
