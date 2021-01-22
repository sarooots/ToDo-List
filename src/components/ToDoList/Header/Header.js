import React, {Component} from 'react'
import {Button, Dropdown, ButtonGroup} from "react-bootstrap"
import classes from "./Header.module.sass"
import DeleteSelected from "../DeleteSelected/DeleteSelected"
import PropTypes from "prop-types"
import NewTask from "../NewTask"

class Header extends Component {
    static propTypes = {
        addTask: PropTypes.func.isRequired,
        tasks: PropTypes.array.isRequired,
        selectedTasks: PropTypes.object.isRequired,
        removeSelected: PropTypes.func.isRequired,
        selectAllTasks: PropTypes.func.isRequired,
        deselect: PropTypes.func.isRequired,
    }
    render() {
        const {addTask, tasks, selectedTasks, removeSelected, selectAllTasks, deselect} = this.props

        return (
            <header className={classes.header}>
                <div className={classes.logo}>To Do List</div>
                <div className={classes.items}>
                    <div className={`${classes.item} ${classes.checkbox}`}>

                        <Dropdown as={ButtonGroup} className={classes.deselect} >

                            <Button ><label className={classes.select}>
                                <input type="checkbox"
                                       disabled={!tasks.length}
                                       onChange={selectAllTasks}
                                       checked={selectedTasks.size === tasks.length && tasks.length > 0 }
                                />
                                <span className={classes.checkmark}></span>
                            </label> </Button>
                            <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={()=> deselect()}
                                    disabled={!selectedTasks.size}>deselect</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <DeleteSelected
                        className={`${classes.item} rounded-0`}
                        removeSelected={removeSelected}
                        selectedTasks={selectedTasks}
                    />
                    <NewTask
                        className={`${classes.item} rounded-0`}
                        addTask={addTask}
                        selectedTasks={selectedTasks}
                        tasks={tasks}
                        mode='new'
                        variant='success'
                        buttonName='new task'
                    />
                </div>
            </header>
        )
    }
}

export default Header