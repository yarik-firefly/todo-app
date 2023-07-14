import React from "react";
import List from "./components/List/List";
import ico from "../src/assets/img/list-ico.png";

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[{ img: ico, title: "Все задачи" }]} />
        <List
          items={[
            { color: "green", title: "Покупки" },
            { color: "blue", title: "Фронтенд" },
            { color: "pink", title: "Фильмы и сериалы" },
          ]}
        />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
