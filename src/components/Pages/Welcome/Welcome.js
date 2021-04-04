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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cupiditate dolore eligendi eum id neque quaerat quo, tempore vero voluptate? Consectetur consequuntur deserunt esse et laudantium magnam molestiae quo vero!
              </p>
              <Link to={"/about"}
                      className={`${cls.submit} ${cls.button}`}
              >
                Read more
              </Link>

            </div>
          </article>
          <article className={`${article}`}>
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
