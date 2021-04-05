import React from "react"
import Wrapper from "../../HOC Wrapper/Wrapper";
import cls from "./About.module.sass";
import illustration from "../../Style assets/About page illustration.png";

 function About({intro, article}){

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
          <h1 className={`${cls.introTitle}`}>Read about</h1>

          <ul className={`${cls.list}`}>
            <li>
              <a href="#intro">Intro</a>
            </li>
            <li>
              <a href="#documentation">Documentation</a>
            </li>
            <li>
              <a href="#porduction">Production process</a>
            </li>
            <li>
              <a href="#course">The course</a>
            </li>
            <li>
              <a href="#author">Author</a>
            </li>
          </ul>
        </div>
      </article>

    </section>
  </>

)
}

export default Wrapper(About)