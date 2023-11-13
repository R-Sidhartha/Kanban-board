import React, { useState, useEffect } from "react";
import "./Home.css";
import GroupByPriority from "./GroupByPriority";
import GroupByUser from "./GroupByUser";
import GroupByStatus from "./GroupByStatus";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setusers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(() => {
    // Retrieve grouping option from localStorage, default to "status"
    return localStorage.getItem("groupingOption") || "status";
  });
  const [sortOption, setSortOption] = useState(() => {
    // Retrieve sort option from localStorage, default to "priority"
    return localStorage.getItem("sortOption") || "priority";
  });
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Handle sorting when tickets or sortOption change
    if (tickets.length > 0) {
      handleSortOptionChange(sortOption);
    } 
    // eslint-disable-next-line
   }, [tickets]);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTickets(data.tickets);
      setusers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const groupTickets = () => {
    switch (groupingOption) {
      case "status":
        return groupByStatus();
      case "user":
        return groupByUser();
      case "priority":
        return groupByPriority();
      default:
        return tickets;
    }
  };

  const groupByStatus = () => {
    // Create an object to store tickets grouped by status
    const groupedByStatus = {
      "Backlog": [],
      "Todo": [],
      "In progress": [],
      "Done": [],
      "Canceled": [],
    };
    // Create a map to store user details by user ID
    const userMap = new Map(users.map((user) => [user.id, user]));

    tickets.forEach((ticket) => {
      const status = ticket.status || "Todo";
      // Get user details using the user ID from the ticket
      const user = userMap.get(ticket.userId) || {};

      // Include user details along with the ticket
      const ticketWithUser = { ...ticket, user };

      // Check if the status is a valid key in the groupedByStatus object
      if (groupedByStatus.hasOwnProperty(status)) {
        groupedByStatus[status].push(ticketWithUser);
      } else {
        groupedByStatus["Canceled"].push(ticketWithUser); // If status is not recognized, add it to 'Canceled'
      }
    });

    return groupedByStatus;
  };

  const groupByUser = () => {
    const groupedByUser = {};

    tickets.forEach((ticket) => {
      const userId = ticket.userId;
      const user = users.find((user) => user.id === userId);

      if (user) {
        if (!groupedByUser[user.id]) {
          groupedByUser[user.id] = { user, tickets: [] };
        }
        groupedByUser[user.id].tickets.push(ticket);
      }
    });

    // Convert the object to an array of objects
    const groupedArray = Object.values(groupedByUser);

    return groupedArray;
  };

  const groupByPriority = () => {
    const groupedByPriority = {
      4: [],
      3: [],
      2: [],
      1: [],
      0: [],
    };

    const userMap = new Map(users.map((user) => [user.id, user]));

    tickets.forEach((ticket) => {
      const priority = ticket.priority;
      const user = userMap.get(ticket.userId) || {};
      const ticketWithUser = { ...ticket, user };
      groupedByPriority[priority].push(ticketWithUser);
    });

    return groupedByPriority;
  };
  const sortByPriority = (ticketsToSort) => {
    let sortedTickets = Array.isArray(ticketsToSort)
      ? [...ticketsToSort]
      : Object.values(ticketsToSort).flat();
    // Check if each object has a 'tickets' property
    if (sortedTickets.every((item) => item.hasOwnProperty("tickets"))) {
      // Extract tickets from each object in the array and flatten them
      sortedTickets = sortedTickets.flatMap((item) => item.tickets || []);
    }

    return sortedTickets.sort((a, b) => b.priority - a.priority);
  };

  const sortByTitle = (ticketsToSort) => {
    let sortedTickets = Array.isArray(ticketsToSort)
      ? [...ticketsToSort]
      : Object.values(ticketsToSort).flat();
    if (sortedTickets.every((item) => item.hasOwnProperty("tickets"))) {
      sortedTickets = sortedTickets.flatMap((item) => item.tickets || []);
    }
    // Use localeCompare for alphabetical sorting
    const orderFactor = 1;
    return sortedTickets.sort(
      (a, b) => orderFactor * a.title.localeCompare(b.title)
    );
  };

  const handleSortOptionChange = (value) => {
    setSortOption(value);
      // Save sort option to localStorage
      localStorage.setItem("sortOption", value);

    if (value === "priority" || value === "title") {
      const groupedTickets = groupTickets();
      const ticketsToSort = Array.isArray(groupedTickets)
        ? [...groupedTickets]
        : groupedTickets;

      let sortedTickets;
      if (value === "priority") {
        sortedTickets = sortByPriority(ticketsToSort);
      } else {
        sortedTickets = sortByTitle(ticketsToSort);
      }

      setTickets(sortedTickets);
    }
  };
  const handleGroupingOptionChange = (value) => {
    setGroupingOption(value);

    // Save grouping option to localStorage
    localStorage.setItem("groupingOption", value);
  };

  const handleDisplayClick = () => {
    setShowFilterOptions((prevShowFilterOptions) => !prevShowFilterOptions);
  };

  return (
    <div className="kanban-board flex-column">
      <div className="flex-column">
        <span>
          <button onClick={handleDisplayClick} className="flex-center text-large btn-none">
            <span className="icon opacity-60">
              <i className="fa-solid fa-sliders fa-xs"></i>
            </span>
            Display
          </button>
        </span>
        {showFilterOptions && (
          <div className="filteroptions">
            <div className="flex-center">
              <span className="text-smaller">Grouping</span>
              <select
                onChange={(e) => handleGroupingOptionChange(e.target.value)}
                className="filter btn"
                value={groupingOption}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="flex-center">
              <span className="text-smaller">Ordering</span>
              <select
                onChange={(e) => handleSortOptionChange(e.target.value)}
                className="filter btn space"
                value={sortOption}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="components">
        {groupingOption === "status" && (
          <GroupByStatus ticketsByStatus={groupByStatus()} />
        )}
        {groupingOption === "user" && (
          <GroupByUser ticketsByUser={groupTickets()} sortOption={sortOption} />
        )}
        {groupingOption === "priority" && (
          <GroupByPriority ticketsByPriority={groupTickets()} />
        )}
      </div>
    </div>
  );
};

export default Home;
