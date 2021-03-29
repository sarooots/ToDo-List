import React, {Component} from "react"
import illustration from "../../Style assets/Tasks page illustration.svg"
import Wrapper from "../../HOC Wrapper/Wrapper"
import cls from "./Welcome.module.sass"


class Welcome extends Component {
  state = {
  }


  render() {
    const {intro, article} = this.props
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cupiditate dolore eligendi eum id neque quaerat quo, tempore vero voluptate? Consectetur consequuntur deserunt esse et laudantium magnam molestiae quo vero!
              </p>
              <button
                      className={`${cls.submit}`}
              >
                Read more
              </button>

            </div>
          </article>

        </section>
      </>
    )
  }
}

export default Wrapper(Welcome)