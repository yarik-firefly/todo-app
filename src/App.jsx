import React from "react";
import List from "./components/List/List";
import ico from "../src/assets/img/list-ico.png";
import AddBtnList from "./components/AddBtnList/AddBtnList";
import Task from "./components/Task/Task";
import axios from "axios";
import AppContext from "./context/AppContext";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const [colors, setColors] = React.useState(null);
  const [lists, setLists] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);
  const navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    const pathnameId = location.pathname.split("lists/")[1];
    if (lists) {
      const list = lists.find((list) => list.id === +pathnameId);
      setActiveItem(list);
    }
  }, [lists, location.pathname]);

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

  const onAddNewTask = (id, obj) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.tasks = [...item.tasks, obj];
      }
      return item;
    });
    setLists(newList);
  };

  const onChangeChecked = (listId, taskId, completed) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskId, {
        completed,
      })
      .catch((e) => {
        alert("Не удалось обновить задачу. Повторите попытку позже :(");
        console.error(e);
      });
  };

  const onEditTask = (listId, taskObj) => {
    const editTaskText = window.prompt("Введите задачу", taskObj.text);
    if (!editTaskText) {
      return;
    }
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = editTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskObj.id, {
        text: editTaskText,
      })
      .catch((e) => {
        alert("Не удалось обновить задачу. Повторите попытку позже :(");
        console.error(e);
      });
  };

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      const newList = lists.map((list) => {
        if (list.id === listId) {
          list.tasks = list.tasks.filter((task) => task.id !== taskId);
        }
        return list;
      });
      setLists(newList);
      axios
        .delete(`http://localhost:3001/tasks/${taskId}`)
        .catch((err) =>
          alert(
            "При удалении задачи произошла ошибка. Повторите попытку позже :(",
            console.error(err)
          )
        );
    }
  };

  const onEditTitleName = (id, title) => {
    console.log(id, title);
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  return (
    <AppContext.Provider
      value={{
        lists,
        onAddNewTask,
        activeItem,
        onRemoveTask,
        onEditTask,
        onChangeChecked,
      }}
    >
      <div className="todo">
        <div className="todo__sidebar">
          <List
            items={[
              {
                img: ico,
                name: "Все задачи",
                active: location.pathname === "/",
              },
            ]}
            onClickItem={(item) => {
              // setActiveItem(item);
              navigate("/");
            }}
          />
          {lists ? (
            <List
              activeItem={activeItem}
              items={lists}
              onClickItem={(item) => {
                setActiveItem(item);
                navigate("lists/" + item.id);
              }}
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
          <Routes>
            <Route
              path="/"
              element={
                lists &&
                lists.map((list) => (
                  <Task
                    activeItem={list}
                    onEditTitle={onEditTitleName}
                    withoutEmpty
                    disable
                  />
                ))
              }
            />
          </Routes>

          <Routes>
            <Route
              path="lists/:id"
              element={
                <Task disable={false} activeItem={activeItem} onEditTitle={onEditTitleName} />
              }
            />
          </Routes>
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
