import React, { useContext } from "react";
import AssetContext from "../Context/AssetContext";
const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
  // Add more as needed
};
const GroupByPriority = ({ ticketsByPriority }) => {
  const { priorityicons, statusIcons } = useContext(AssetContext);

  return (
    <div>
      <div className="grid">
        {Object.entries(ticketsByPriority).map(([priority, tickets]) => (
          <div key={priority} className="kanban-column">
            <div className="bet-flex">
              <div className="alignedflex">
                <span>{priorityicons[priority]}</span>
                <h3 className="midspace">{priorityLabels[priority]}</h3>
                <span className="largespace opacity-60">{tickets.length}</span>
                </div>
                <span className="btn-none">
                  <i
                    class="fa-solid fa-plus opacity-60 fa-sm"
                    style={{ color: "#000000" }}
                  ></i>{" "}
                  &#8943;
                </span>
              
            </div>
            {tickets.map((ticket) => (
              <div key={ticket.id} className="ticket">
                <div className="bet-flex">
                  <p className="opacity-60 text-small">{ticket.id}</p>
                  <p className="purple text-smaller">{ticket.user.name}</p>
                </div>
                <div className="flex">
                  <span className="text-smaller">
                    {statusIcons[ticket.status]}
                  </span>
                  <p className="text-bold space text-small">{ticket.title}</p>
                </div>
                <p className="text-smaller opacity-60">&#x2022; {ticket.tag[0]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupByPriority;
