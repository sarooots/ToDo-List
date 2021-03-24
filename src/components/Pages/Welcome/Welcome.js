import React, {Component} from "react"
import illustration from "../../Style assets/Tasks page illustration.svg"
import Wrapper from "../../HOC Wrapper/Wrapper"
import cls from "../Tasks/Tasks.module.sass"


class Welcome extends Component {
  state = {
  }


  render() {
    return (
      <>
        {/*whole page content*/}
        <section className={cls.wrapper}>
          {/*first section of page, intro*/}
          <article className={`${cls.intro} ${cls.article}`}>
            <div className={`${cls.introItem}`}>
              <img src={illustration} alt=""
                   className={`${cls.illustration}`}
              />
            </div>

            <div className={`${cls.introItem} ${cls.introInfo}`}>
              <h1 className={`${cls.introTitle}`}>Wellcome page</h1>

              <ul className={`${cls.list}`}>
                <li>add task</li>
                <li>edit task</li>
                <li>delete single or multiple tasks</li>
                <li>search and filter tasks</li>
                <li>sort tasks</li>
                <li>change task status</li>
              </ul>
            </div>
          </article>

        </section>
      </>
    )
  }
}

export default Wrapper(Welcome)