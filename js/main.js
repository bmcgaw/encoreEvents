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
    event: "Brian Regan",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 400000,
    date: "06/01/2019",
  },
  {
    event: "Jerry Seinfeld",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "10/31/2022",
  },
  {
    event: "Jim Gaffigan",
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

  // Add logic to set values of stat variables by looping over events
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
