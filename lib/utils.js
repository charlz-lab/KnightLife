import supabase from "../lib/supabase"

// fetch events from database
const fetchEvents = async (isCreator, id) => {
  let eventsListQuery = supabase.from("events").select("*")
  if (isCreator) {
    eventsListQuery = eventsListQuery.eq("creator_id", id)
  }
  eventsListQuery = eventsListQuery.order("date", { ascending: true })
  const { data, error, status } = await eventsListQuery
  if (error && status !== 406) {
    throw error
  } else {
    return data
  }
}

// subscribe to events for real-time updates from the database
const subscribeToEvents = (setEvents) => {
  const subscription = supabase
    .channel("event_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "events" },
      (payload) => {
        if (payload.eventType === "INSERT") {
          // Handle new event insertion
          const newEvent = payload.new
          // Update events list
          setEvents((prevEvents) => [...prevEvents, newEvent])
        } else if (payload.eventType === "UPDATE") {
          // Handle event update
          const updatedEvent = payload.new
          // Update events list
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event
            )
          )
        } else if (payload.eventType === "DELETE") {
          // Handle event deletion
          const deletedEventId = payload.old.id
          // Update events list
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== deletedEventId)
          )
        }
      }
    )
    .subscribe()

  return subscription
}

// use this function within a useEffect function to fetch events and subscribe to real-time updates in a component
const handleEventList = async (setEvents, isCreator, id) => {
  // fetch events created by the user
  const eventsData = await fetchEvents(isCreator, id)
  setEvents(eventsData)

  // subscribe to events for real-time updates
  const subscription = subscribeToEvents(setEvents)

  // unsubscribe from the event subscription when the component is unmounted
  return () => {
    subscription.unsubscribe()
  }
}

// export all utility functions
export { fetchEvents, subscribeToEvents, handleEventList }
