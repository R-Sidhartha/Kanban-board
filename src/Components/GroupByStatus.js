import React, { useContext } from "react";
import AssetContext from "../Context/AssetContext";

const GroupByStatus = ({ ticketsByStatus }) => {
  const { statusIcons, priorityicons } = useContext(AssetContext);

  console.log(ticketsByStatus);
  return (
    <div>
      <div className="grid">
        {Object.entries(ticketsByStatus).map(([status, tickets]) => (
          <div key={status} className="kanban-column">
            <div className="bet-flex">
              {" "}
              <div className="alignedflex">
                <span>{statusIcons[status]}</span>
                <h3 className="midspace">{status}</h3>
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
                    {priorityicons[ticket.priority]}
                  </span>
                  <p className="text-bold space text-small">{ticket.title}</p>
                </div>
                <p className="text-smaller opacity-60">
                  &#x2022; {ticket.tag[0]}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupByStatus;
