import supabase from "../lib/supabase"

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
    eventsListQuery = eventsListQuery.gt("date", new Date())
  }

  eventsListQuery = eventsListQuery.order("date", { ascending: true })

  // execute the query
  const { data, error, status } = await eventsListQuery
  if (error && status !== 406) {
    throw error
  } else {
    // console.log(data)
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
export { fetchEvents, subscribeToEvents, handleEventList }
