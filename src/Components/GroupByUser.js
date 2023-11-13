import React, { useContext } from "react";
import AssetContext from "../Context/AssetContext";

const GroupByUser = ({ ticketsByUser }) => {
  const { statusIcons } = useContext(AssetContext);
  return (
    <div>
      <div className="grid">
        {ticketsByUser.map(({ user, tickets }) => (
          <div key={user.id} className="kanban-column">
            <div className="bet-flex">
              <div className="alignedflex">
                <span>
                  <i
                    className="fa-solid fa-user fa-sm"
                    style={{ color: "#5e0eaf" }}
                  ></i>
                </span>
                <h3 className="midspace"> {user.name}</h3>
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
                <p className="opacity-60 text-small">{ticket.id}</p>
                <div className="flex">
                  <span className="text-smaller">
                    {statusIcons[ticket.status]}
                  </span>
                  <p className="text-bold text-small space">{ticket.title}</p>
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

export default GroupByUser;
