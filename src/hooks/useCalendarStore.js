import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onsetActiveEvent,
  onUpdateEvent,
} from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onsetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //Creando
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      console.error(error);
      Swal.fire("Error al guardar", error.response.data?.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    // Todo: Llegar al backend
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
    dispatch(onDeleteEvent());
    } catch (error) {
      console.error(error);
      Swal.fire("Error al borrar", error.response.data?.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    const { data } = await calendarApi.get("/events");
    const events = convertEventsToDateEvents(data.events);
    dispatch(onLoadEvents(events));
  };

  return {
    //Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
