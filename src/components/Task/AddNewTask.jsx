import React from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";

const AddNewTask = () => {
  const [showPopupTask, setShowPopupTask] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { onAddNewTask, activeItem } = React.useContext(AppContext);

  const togglePopupTask = () => {
    setShowPopupTask(!showPopupTask);
    setInputValue("");
  };

  const addNewTask = () => {
    const obj = {
      listId: activeItem?.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        onAddNewTask(activeItem.id, data);
        togglePopupTask();
      })
      .catch((e) => {
        alert("Ошибка при добавлении задачи, попробуйте позже :(");
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="tasks__add-task">
      {showPopupTask ? (
        <div className="tasks__task-popup">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Текст задачи"
            type="text"
          />
          <div className="button">
            <button disabled={isLoading} onClick={addNewTask}>
              {!isLoading ? "Добавить задачу" : "Добавление..."}
            </button>
            <button onClick={() => togglePopupTask()}>Отмена</button>
          </div>
        </div>
      ) : (
        <>
          <svg
            onClick={() => togglePopupTask()}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1V15"
              stroke="#B4B4B4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 8H15"
              stroke="#B4B4B4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3>Новая задача</h3>
        </>
      )}
    </div>
  );
};

export default AddNewTask;
