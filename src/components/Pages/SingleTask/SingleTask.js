import React, {Component} from "react"
import Editor from "../../Editor/Editor";
import {connect} from "react-redux";
import {getTask, deleteTask} from "../../../store/actions";
import Wrapper from "../../HOC Wrapper/Wrapper";
import cls from "../LoginRegister/Register.module.sass";

class SingleTask extends Component{

    state = {
        show: false
    }
    componentDidMount() {
        this.props.getTask(this.props.match.params.taskId)


    }

    toggleShow = () => this.setState({show: !this.state.show})

    handleEdit = () => this.setState({show: !this.state.show})

    render() {
        const {show} = this.state
        const {task, article} = this.props

        return (
            <>
                <section className={cls.wrapper}>
                    {/*first section of page, intro*/}
                    <article className={`${article} ${cls.article}`}>

                    </article>
                </section>

                {
                    show &&
                    <Editor
                        mode='edit'
                        show={show}
                        from="single"
                        toggleShow={this.toggleShow}
                        task={task}/>
                }
            </>
        )
    }
}

const mapStateToProps =  (state)=> {
    return {task: state.task}
}

const mapDispatchToProps = {
    getTask,
    deleteTask
}

export default Wrapper(connect(mapStateToProps, mapDispatchToProps)(SingleTask))