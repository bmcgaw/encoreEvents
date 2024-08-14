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

// buildDropDown
// Creates the dropdown of cities to select from
// Take in either the events data or the data from local storage if there is any
// Parse through it and create an array of cities
// Loop through the cities and for each city create a dropdown item with the city name only use each city once
function buildDropDown() {
  let eventDropDown = document.getElementById("eventDropDown");
  let template = document.getElementById("cityDropDown-template");

  const eventData = JSON.parse(localStorage.getItem("eventData")) || events;
  const eventCities = [...new Set(eventData.map((item) => item.city))];

  let ddItemNode = document.importNode(template.content, true);

  ddItem = ddItemNode.querySelector("a");
  ddItem.setAttribute("data-string", "All");
  ddItem.textContent = "All";
  eventDropDown.appendChild(ddItem);

  for (let i = 0; i < eventCities.length; i++) {
    let ddItemNode = document.importNode(template.content, true);
    ddItem = ddItemNode.querySelector("a");
    ddItem.setAttribute("data-string", eventCities[i]);
    ddItem.textContent = eventCities[i];
    eventDropDown.appendChild(ddItem);
  }
}

function getEvents(element) {
  // If element.textContent = All then go through the entire array of objects
  // Otherwise only the ones that have the specific city
  // Track the total attendance
  // Average attendance
  // Most attended
  // Least attended
  const eventData = JSON.parse(localStorage.getItem("eventData")) || events;
  let displayData = "";

  if (element.textContent != "All") {
    displayData = eventData.filter((item) => item.city == element.textContent);
  } else {
    displayData = eventData;
  }

  let totalAttendance = 0;
  let averageAttendance = 0;
  let mostAttended = displayData[0].attendance;
  let leastAttended = displayData[0].attendance;

  for (let i = 0; i < displayData.length; i++) {
    totalAttendance += displayData[i].attendance;
    mostAttended = Math.max(displayData[i].attendance, mostAttended);
    leastAttended = Math.min(displayData[i].attendance, leastAttended);
  }
  averageAttendance = Math.floor(totalAttendance / displayData.length);
}
