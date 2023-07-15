import React from "react";
import List from "./components/List/List";
import ico from "../src/assets/img/list-ico.png";
import AddBtnList from "./components/AddBtnList/AddBtnList";
import data from "./assets/db.json";
import Task from "./components/Task/Task";

function App() {
  const [lists, setLists] = React.useState(
    data.lists.map((item) => {
      item.color = data.colors.filter(
        (color) => color.id === item.colorId
      )[0].name;
      return item;
    })
  );

  const onAddItem = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[{ img: ico, name: "Все задачи" }]} />
        <List
          items={lists}
          isRemoveble
          onRemove={(list) => console.log(list)}
        />
        <AddBtnList onAdd={onAddItem} colors={data.colors} />
      </div>
      <div className="todo__tasks">
        <Task />
      </div>
    </div>
  );
}

export default App;
