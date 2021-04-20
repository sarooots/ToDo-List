import React from "react"
import illustration from "../../Style assets/Welcome page illustration.png"
import Wrapper from "../../HOC Wrapper/Wrapper"
import cls from "./Welcome.module.sass"
import {TaskPreview} from "../Tasks/Task/Task"
import {Link} from "react-router-dom";
import {deleteTask} from "../../../store/actions";
import {connect} from "react-redux";

const task = {
  title: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore…",
  status: "active"
}

function repeatTask(count) {
  const tasks = []
  for (let i = 0; i < count; i++) {
    tasks.push(task)
  }
  return tasks.map((task, index)=> {
    return <TaskPreview
      task={task}
      key={index}
    />
  })


}
function Welcome ({intro, article, isAuthenticated}) {
    return (
      <>
        {/*whole page content*/}
        <section className={cls.wrapper}>
          {/*first section of page, intro*/}
          <article className={`${intro} ${article} ${cls.article}`}>
            <div className={`${cls.introItem}`}>
              <img src={illustration} alt=""
                   className={`${cls.illustration}`}
              />
            </div>

            <div className={`${cls.introItem} ${cls.introInfo}`}>
              <h1 className={`${cls.introTitle}`}>About The Project</h1>
              <p className={cls.text}>
                This project was made during the React JS course as an experimental project, for learning purposes.
                Working on this project was a great opportunity to use all skills that I've got during the participating to the course.
                This project was developed with React JS, Redux JS, REST API and token based authentication.              </p>
              <Link to={"/about"}
                      className={`${cls.submit} ${cls.button}`}
              >
                Read more
              </Link>

            </div>
          </article>
          <article className={`${article}`}>
            <h1 className={cls.title}> Task examples</h1>
            <p className={cls.desc}>
              Here you can see how tasks looks like. To create your tasks you have to create account or simply login.
            </p>
            <div className={cls.tasks}>
              {
                repeatTask(5)
              }
              <Link to={isAuthenticated ?`/tasks`: "/signup"} className={`${cls.button}`}>
                {isAuthenticated? "See your tasks": "create account"}
              </Link>
            </div>
          </article>

        </section>
      </>
    )
}


const mapStateToProps = (state) => {
  return{
    isAuthenticated: state.isAuthenticated,
  }
}
const mapDispatchToProps =  {
  deleteTask
}

export default Wrapper(connect(mapStateToProps, mapDispatchToProps)(Welcome))
