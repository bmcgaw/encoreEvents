const events = [
  {
    event: "Foo Fighters",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2023",
  },
  {
    event: "Ed Sheeran",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/19/22",
  },
  {
    event: "Kansas",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "04/21/2021",
  },
  {
    event: "Foo Fighters",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "12/01/2021",
  },
  {
    event: "Imagine Dragons",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "08/17/2023",
  },
  {
    event: "A Day To Remember",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "02/14/2024",
  },
  {
    event: "Maroon 5",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 400000,
    date: "06/01/2019",
  },
  {
    event: "Taylor Swift",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "10/31/2022",
  },
  {
    event: "Rihanna",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "07/13/2023",
  },
];

function buildDropDown() {
  let eventDropDown = document.getElementById("eventDropDown");
  let template = document.getElementById("cityDropDown-template");

  // Retrieve event data and create array of distinct cities
  const eventData = JSON.parse(localStorage.getItem("eventData")) || events;
  const eventCities = [...new Set(eventData.map((item) => item.city))];

  // Create dropdown option for All
  let ddItemNode = document.importNode(template.content, true);

  ddItem = ddItemNode.querySelector("a");
  ddItem.setAttribute("data-string", "All");
  ddItem.textContent = "All";
  eventDropDown.appendChild(ddItem);

  // Create dropdown option for each city
  for (let i = 0; i < eventCities.length; i++) {
    let ddItemNode = document.importNode(template.content, true);
    ddItem = ddItemNode.querySelector("a");
    ddItem.setAttribute("data-string", eventCities[i]);
    ddItem.textContent = eventCities[i];
    eventDropDown.appendChild(ddItem);
  }

  // By default display data for all cities
  displayStats(eventData);

  // Display all data in bottom table
  displayData();
}

function getEvents(element) {
  // Retrieve event data
  const allEvents = JSON.parse(localStorage.getItem("eventData")) || events;

  let filteredEvents = "";
  let city = element.getAttribute("data-string");

  // Filter data and display table header based on selected city
  if (city != "All") {
    filteredEvents = allEvents.filter((item) => item.city == city);
  } else {
    filteredEvents = allEvents;
  }

  // Adjust stats header to match selected city
  document.getElementById("statsHeader").innerText = `Stats For ${city} Events`;

  // Call method to display the events using the filtered data
  displayStats(filteredEvents);
}

function displayStats(events) {
  // Initialize stats variables
  let totalAttendance = 0;
  let averageAttendance = 0;
  let mostAttended = events[0].attendance;
  let leastAttended = events[0].attendance;

  // Add logic to set values of stats variables by looping over events
  for (let i = 0; i < events.length; i++) {
    totalAttendance += events[i].attendance;
    mostAttended = Math.max(events[i].attendance, mostAttended);
    leastAttended = Math.min(events[i].attendance, leastAttended);
  }
  averageAttendance = Math.floor(totalAttendance / events.length);

  // Add values to the table
  document.getElementById("total").innerHTML = totalAttendance.toLocaleString();
  document.getElementById("most").innerHTML = mostAttended.toLocaleString();
  document.getElementById("least").innerHTML = leastAttended.toLocaleString();
  document.getElementById("average").innerHTML =
    averageAttendance.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
}

function displayData() {
  let eventBody = document.getElementById("eventBody");
  let template = document.getElementById("eventData-template");

  eventBody.innerHTML = "";

  // Retrieve event data
  let curEvents = JSON.parse(localStorage.getItem("eventData")) || [];

  if (curEvents.length == 0) {
    curEvents = events;
    localStorage.setItem("eventData", JSON.stringify(curEvents));
  }

  // Populate a row of data for each event
  for (let i = 0; i < curEvents.length; i++) {
    let eventItemsNode = document.importNode(template.content, true);
    let eventCols = eventItemsNode.querySelectorAll("td");

    eventCols[0].textContent = curEvents[i].event;
    eventCols[1].textContent = curEvents[i].city;
    eventCols[2].textContent = curEvents[i].state;
    eventCols[3].textContent = curEvents[i].attendance;
    eventCols[4].textContent = new Date(curEvents[i].date).toLocaleDateString();

    // Add that data to the event table
    eventBody.appendChild(eventItemsNode);
  }
}

function saveEventData() {
  // Retrieve event data
  let curEvents = JSON.parse(localStorage.getItem("eventData")) || [];

  // Create a new event and add values based on user's form input
  let newEvent = {};

  newEvent["event"] = document.getElementById("newEventName").value;
  newEvent["city"] = document.getElementById("newEventCity").value;
  let state = document.getElementById("newEventState");
  newEvent["state"] = state.options[state.selectedIndex].text;
  newEvent["attendance"] = parseInt(
    document.getElementById("newEventAttendance").value,
    10
  );
  let eventDate = document.getElementById("newEventDate").value;
  let eventDate2 = `${eventDate} 00:00`;
  newEvent["date"] = new Date(eventDate2).toLocaleDateString();

  // Add new event to current event data
  curEvents.push(newEvent);

  // Save data to local storage
  localStorage.setItem("eventData", JSON.stringify(curEvents));

  // Build the drop down and display the data again with the new data included
  buildDropDown();
  displayData();
}
