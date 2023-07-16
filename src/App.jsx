import React from "react";
import List from "./components/List/List";
import ico from "../src/assets/img/list-ico.png";
import AddBtnList from "./components/AddBtnList/AddBtnList";
import Task from "./components/Task/Task";
import axios from "axios";
import AppContext from "./context/AppContext";

function App() {
  const [colors, setColors] = React.useState(null);
  const [lists, setLists] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);
  // const [deleteItem, setDeleteItem] = React.useState();
  // const [showDeletePopup, setShowDeletePopup] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
        .then(({ data }) => setLists(data));

      await axios
        .get("http://localhost:3001/colors")
        .then(({ data }) => setColors(data));
    };

    fetchData();
  }, []);

  const onAddItem = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  // const choiceYesOrNo = (boolean) => {
  //   setDeleteItem(boolean);
  //   setShowDeletePopup(false);
  // };
  return (
    <AppContext.Provider value={{ lists, activeItem }}>
      <div className="todo">
        <div className="todo__sidebar">
          <List items={[{ img: ico, name: "Все задачи" }]} />
          {lists ? (
            <List
              activeItem={activeItem}
              items={lists}
              onClickItem={(item) => setActiveItem(item)}
              isRemoveble
              onRemove={(id) => {
                const newList = lists.filter((item) => item.id !== id);
                setLists(newList);
              }}
            />
          ) : (
            "Loading..."
          )}

          <AddBtnList onAdd={onAddItem} colors={colors} />
        </div>
        <div className="todo__tasks">
          <Task />
        </div>

        {/* <div
          className={`todo__delete-window-popup ${showDeletePopup && "active"}`}
        >
          <p>Вы уверены?</p>
          <button
            onClick={() => choiceYesOrNo(true)}
            className="todo__delete-window-popup__first"
          >
            Удалить
          </button>
          <button
            onClick={() => choiceYesOrNo(false)}
            className="todo__delete-window-popup__second"
          >
            Отмена
          </button>
        </div> */}
      </div>
    </AppContext.Provider>
  );
}
export default App;
