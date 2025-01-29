import "./dropdown-styles.scss"

import React, { useState, useRef, useEffect } from 'react';
import { useUnit } from "effector-react";
import { $$activeStrategy } from "@/shared/effector";
import { $$editStep } from "./model-step";
import { $$dropdown } from "./modal-dropdown";
import { $$editStatus } from "./model-status";
import ArrowDown from "@/assets/account/images/arrow-down-list.png"
import ArrowUp from "@/assets/account/images/arrow-up-list.png"
import MenuBurgerLight from "@/assets/account/images/menu-burger-light.png"
import MenuBurgerDark from "@/assets/account/images/menu-burger-dark.png"
import RemoveIcon from "@/assets/account/images/remove-icon.png"
import { useTheme } from "@/shared/theme";

const Dropdown = () => {

  const { theme } = useTheme()

  const [statuses] = useUnit([$$activeStrategy.$statuses])

  const statusesForSelect = statuses?.map((status) => {
    return {
      // value: status.custom_strategy_status_id, // было так
      valueStatus: status.custom_strategy_status_id,
      value: status.custom_strategy_next_step_id,
      text: status.name,
    }
  })

  const [isOpen, setIsOpen] = useState(false);

  const srcArrow = isOpen ? ArrowUp : ArrowDown
  const srcMenu = theme === "light" ? MenuBurgerLight : MenuBurgerDark

  // const [selectedOption, setSelectedOption] = useState(statuses[0].name);
  const [isButtons, setButtons] = useState(false)
  const dropdownRef = useRef(null);
  const [stepChanged] = useUnit([$$editStep.stepChanged])
  const [statusChanged] = useUnit([$$editStatus.statusChanged])
  const [selectedOption, setSelectedOption] = useUnit([$$dropdown.$selectedOption, $$dropdown.selectedOptionChanged])
  const [statusId] = useUnit([$$editStatus.$statusId])

  // console.log("selectedOption", selectedOption)

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: { valueStatus: number | null, value: number | null, text: string }) => {
    setSelectedOption(option);
    // statusChanged(Number(option.value))
    statusChanged(Number(option.valueStatus))
    stepChanged(Number(option.value))
    setIsOpen(false);
  };

  const currentStatus = statusesForSelect.find(status => status.valueStatus === statusId) || statusesForSelect[0]
  // console.log("currentStatus", currentStatus)
  // console.log("statusId", statusId)

  const menuClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    console.log("menu click")
  }

  const removeClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    console.log("remove click")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(currentStatus || statusesForSelect[0])
  }, [])

  return (
    <div className="dropdown" ref={dropdownRef}>

      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {/* {selectedOption.text} */}
     
        <div className="current_status">
        {currentStatus?.text}
          {/* <span>{currentStatus?.text}</span> */}
        </div>
        <div className="arrow-container">
          <img src={srcArrow} alt='arrow' />
        </div>

      </div>

      {isOpen && (
        <div className="dropdown-menu">

          {statusesForSelect.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              <div>{option.text}</div>

              {isButtons && (
                <div className="icons-container">
                  <div
                    className="icons-container-menu"
                    onClick={menuClickHandler}
                  >
                    <img src={srcMenu} alt='menu-burger' width={14} height={12} />
                  </div>
                  <div
                    className="icons-container-remove"
                    onClick={removeClickHandler}
                  >
                    <img src={RemoveIcon} alt='remove-icon' />
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )
      }
    </div >
  );
};

export default Dropdown;
