import React from "react";
import { Input } from "reactstrap";
import "./RadioList.css";

export const RadioList = ({ data, selected, onSelect }) => {
  return (
    <ul className="radio-list">
      {data.map((item, index) => (
        <li key={index} className="radio-list__item">
          <Input
            type="radio"
            id={item.id}
            name="category" // Ensure all radios share the same name
            value={item.id}
            checked={selected === item.id}
            onChange={(e) => {
              onSelect(parseInt(e.target.value));
            }}
            className="me-3"
          />
          <label htmlFor={item.id}>
            {item.name}
            <span> ({item.count})</span>
          </label>
        </li>
      ))}
    </ul>
  );
};
