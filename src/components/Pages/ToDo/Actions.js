import React, {PureComponent} from "react"
import {Button, Dropdown, ButtonGroup} from "react-bootstrap"
import classes from "./Actions.module.sass"
import DeleteTasks from "../../DeleteTasks/DeleteTasks"
import PropTypes from "prop-types"
import Search from "../../Search/Search";

class Actions extends PureComponent {
    static propTypes = {
        selectedTasks: PropTypes.object.isRequired,
        selectAllTasks: PropTypes.func.isRequired,
        deselect: PropTypes.func.isRequired,
        toggleShow: PropTypes.func.isRequired,
        changeMode: PropTypes.func.isRequired,
    }

    render() {
        const {tasks, selectedTasks, deleteTasks, selectAllTasks, deselect, toggleShow, changeMode} = this.props
        return (
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
                    <DeleteTasks
                        className={`${classes.item} rounded-0`}
                        deleteTasks={deleteTasks}
                        selectedTasks={selectedTasks}/>
                    <Button variant="success"
                            onClick={()=>{
                                toggleShow()
                                changeMode("new")
                            }}
                            className={`${classes.item} rounded-0 text-nowrap`}
                            disabled={!!selectedTasks.size}
                    >
                        new task
                    </Button>
                    <Search/>
                </div>
        )
    }
}

export default Actions