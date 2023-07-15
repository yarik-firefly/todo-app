import React from "react";
import plusIco from "../../assets/img/plus-ico.png";
import List from "../List/List";
import "./AddBtnList.scss";
import Badge from "../Badge/Badge";
import closeIco from "../../assets/img/close-ico.png";

const AddBtnList = ({ colors, onAdd }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(colors[0].id);
  const [inputValue, setInputValue] = React.useState("");
  const [emptyInput, setEmptyValue] = React.useState(false);

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
    const color = colors.filter((c) => c.id === selectedColor)[0].name;
    onAdd({
      id: Math.random(),
      name: inputValue,
      color: color,
    });
    simpleSettings()
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
        <div className={`popup__empty-input ${emptyInput && "active"}`}>
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
          {colors.map((color) => (
            <Badge
              className={selectedColor === color.id && "active"}
              onClick={() => setSelectedColor(color.id)}
              key={color.id}
              color={color.name}
            />
          ))}
        </div>
        <button onClick={addList}>Добавить</button>
      </div>
    </>
  );
};

export default AddBtnList;
