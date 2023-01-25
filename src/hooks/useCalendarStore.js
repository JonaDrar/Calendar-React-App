import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onsetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onsetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO: llegar al backend

    //Todo bien
    if (calendarEvent._id) {
      //Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //Creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = () => {
    // Todo: Llegar al backend

    dispatch( onDeleteEvent() );
  }

  return {
    //Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
