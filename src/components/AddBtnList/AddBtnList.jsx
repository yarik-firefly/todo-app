import React from "react";
import plusIco from "../../assets/img/plus-ico.png";
import List from "../List/List";
import "./AddBtnList.scss";
import Badge from "../Badge/Badge";
import closeIco from "../../assets/img/close-ico.png";
import axios from "axios";

const AddBtnList = ({ colors, onAdd }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(3);
  const [inputValue, setInputValue] = React.useState("");
  const [emptyInput, setEmptyValue] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const simpleSettings = () => {
    setShowPopup(false);
    setInputValue("");
    setSelectedColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      setEmptyValue(true);
      setTimeout(() => {
        setEmptyValue(false);
      }, 700);
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0];
        const listObj = {
          ...data,
          color: { name: color.name, hex: color.hex, tasks: [] },
        };
        onAdd(listObj);
        simpleSettings();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <List
        items={[
          { img: plusIco, name: "Добавить папку", className: "ul__add-btn" },
        ]}
        setShowPopup={() => setShowPopup(!showPopup)}
      />

      <div className={`popup ${showPopup ? `popup__visible` : ""}`}>
        <div className={`popup__empty-input ${emptyInput ? "active" : ""}`}>
          <p>Введите название</p>
        </div>
        <img
          onClick={simpleSettings}
          src={closeIco}
          alt="Close"
          className="popup__close-img"
        />
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input"
          placeholder="Название папки"
          type="text"
        />
        <div className="popup__circle-color">
          {colors &&
            colors.map((color) => (
              <Badge
                className={selectedColor === color.id && "active"}
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
              />
            ))}
        </div>
        <button className={isLoading && "active"} onClick={addList}>
          {isLoading ? "Добавление..." : "Добавить"}
        </button>
      </div>
    </>
  );
};

export default AddBtnList;
