import supabase from "../lib/supabase"

// get an event's status based on the logged in user's id and the event id
const getEventStatus = async (setEventStatus, eventId) => {
  // get user ID from the logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  // fetch the event status from the event_status table
  const {
    data: { status },
    error,
  } = await supabase
    .from("event_status")
    .select("status")
    .eq("event_id", eventId)
    .eq("user_id", user.id)
    .single()
  if (error) {
    console.error("Error fetching event status:", error.message)
    return null
  }
  console.log("Event status:", status)
  setEventStatus(status)
}

// delete event status entry from the event_status table
const deleteEventStatus = async (eventId) => {
  // get user ID from the logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  // delete the event status entry
  const { error } = await supabase
    .from("event_status")
    .delete()
    .eq("event_id", eventId)
    .eq("user_id", user.id)
  if (error) {
    console.error("Error deleting event status:", error.message)
  }
}

// add event status entry to the event_status table
const addEventStatus = async (eventId, status) => {
  // get user ID from the logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  // insert the event status entry
  const { error } = await supabase
    .from("event_status")
    .insert({ event_id: eventId, user_id: user.id, status: status })
  if (error) {
    console.error("Error adding event status:", error.message)
  }
}

// update event status entry in the event_status table
const updateEventStatus = async (eventId, status) => {
  // get user ID from the logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  // update the event status entry
  const { error } = await supabase
    .from("event_status")
    .update({ status: status })
    .eq("event_id", eventId)
    .eq("user_id", user.id)
  if (error) {
    console.error("Error updating event status:", error.message)
  }
}

// fetch events from database
const fetchEvents = async (loc, id) => {
  // build the query to fetch events
  let eventsListQuery = supabase.from("events").select("*")

  // break down the query based on the location
  // fetch only the events created by the user
  if (loc == "creator") {
    eventsListQuery = eventsListQuery.eq("creator_id", id)

    // fetch only the events user has marked as saved or attending
  } else if (loc == "saved" || loc == "attending") {
    // build the query to fetch event ids from the event_status table
    let eventStatusQuery = supabase
      .from("event_status")
      .select("event_id")
      .eq("user_id", id)

    if (loc == "saved") {
      // fetch only events user has marked as saved
      eventStatusQuery = eventStatusQuery.eq("status", "saved")
    } else if (loc == "attending") {
      // fetch only events user has marked as attending
      eventStatusQuery = eventStatusQuery.eq("status", "attending")
    }

    // execute the query
    const { data, error, status } = await eventStatusQuery
    // build an array of event ids
    const eventIds = data.map((event) => event.event_id)
    // modify the query to fetch only the events with the eventIds in the array
    eventsListQuery = eventsListQuery.in("id", eventIds)

    // fetch all upcoming events
  } else if (loc == "home") {
    const currentDate = new Date().toISOString()
    eventsListQuery = eventsListQuery.gt("date", currentDate)
  }

  eventsListQuery = eventsListQuery.order("date", { ascending: true })

  // execute the query
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
    // listen for changes in the events table
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
const handleEventList = async (setEvents, loc) => {
  // get user ID from the logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // fetch events created by the user
  const eventsData = await fetchEvents(loc, user.id)
  setEvents(eventsData)

  // subscribe to events for real-time updates
  const subscription = subscribeToEvents(setEvents)

  // unsubscribe from the event subscription when the component is unmounted
  return () => {
    subscription.unsubscribe()
  }
}

// export all utility functions
export {
  // status functions
  getEventStatus,
  deleteEventStatus,
  addEventStatus,
  updateEventStatus,
  // event list functions
  fetchEvents,
  subscribeToEvents,
  handleEventList,
}
