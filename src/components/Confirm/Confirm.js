import React, {useState} from "react"
import cls from "../Editor/Editor.module.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

function Confirm ({selectedTasks, action, className, buttonContent}) {

  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)
  return (
    <>
      <button className={className}
              disabled={!selectedTasks.size}
              onClick={()=> {if(selectedTasks.size === 1) {
                setShow( false)
                action(selectedTasks)
              } else {
                setShow( true)
              }}}>
        {buttonContent}
      </button>


      <div className={`${cls.overlay} ${show? cls.show: cls.hide}`}>
        <div className={cls.modal}>
          <div className={cls.header}>
            <h4 className={cls.title}>Delete Selected</h4>
            <span className={cls.closeModal} onClick={toggleShow}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
          <div className={cls.body}>
            <p className={cls.text}>
            Do you really want to delete selected {selectedTasks.size} task{selectedTasks.size>1?"s":""} ?
            </p>
          </div>
          <div className={cls.footer}>
            <button className={`${cls.button} ${cls.add}`}
                    onClick={() => {
                      toggleShow()
                      action(selectedTasks)
                    }}>
              Delete {selectedTasks.size} task{selectedTasks.size>1?"s":""}
            </button>
            <button className={`${cls.button} ${cls.cancel}`}
                    onClick={toggleShow}>
              Close
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Confirm
