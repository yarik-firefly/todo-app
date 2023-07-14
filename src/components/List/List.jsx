import React from "react";
import list from "../../assets/img/list-ico.png";
import "./List.scss";

const List = ({ items }) => {
  return (
    <ul className="ul">
      {items.map((item) => (
        <li>
          {item.img ? (
            <img src={item.img} />
          ) : (
            <i className={`badge badge--${item.color}`}></i>
          )}
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default List;
