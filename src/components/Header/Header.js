import React, {PureComponent} from 'react'
import {Button, Dropdown, ButtonGroup} from "react-bootstrap"
import classes from "./Header.module.sass"
import DeleteSelected from "../DeleteSelected/DeleteSelected"
import PropTypes from "prop-types"

class Header extends PureComponent {
    static propTypes = {
        tasks: PropTypes.array.isRequired,
        selectedTasks: PropTypes.object.isRequired,
        removeSelected: PropTypes.func.isRequired,
        selectAllTasks: PropTypes.func.isRequired,
        deselect: PropTypes.func.isRequired,
        toggleShow: PropTypes.func.isRequired,
        changeMode: PropTypes.func.isRequired,
    }

    render() {
        const {tasks, selectedTasks, removeSelected, selectAllTasks, deselect, toggleShow, changeMode} = this.props
        return (
            <header className={classes.header}>
                <div className={classes.logo}>To Do List</div>
                <div className={classes.items}>
                    <div className={`${classes.item} ${classes.checkbox}`}>
                        <Dropdown as={ButtonGroup} className={classes.deselect}>
                            <Button ><label className={classes.select}>
                                <input type="checkbox"
                                       disabled={!tasks.length}
                                       onChange={selectAllTasks}
                                       checked={selectedTasks.size === tasks.length && tasks.length > 0 }/>
                                <span className={classes.checkmark}/>
                            </label> </Button>
                            <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={deselect}
                                    disabled={!selectedTasks.size}>deselect</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                        <DeleteSelected
                            className={`${classes.item} rounded-0`}
                            removeSelected={removeSelected}
                            selectedTasks={selectedTasks}/>
                    <Button variant='success'
                            onClick={()=>{
                                toggleShow()
                                changeMode('new')
                            }}
                            className={`${classes.item} rounded-0 text-nowrap`}
                            disabled={!!selectedTasks.size}>
                        new task
                    </Button>
                </div>
            </header>
        )
    }
}

export default Header