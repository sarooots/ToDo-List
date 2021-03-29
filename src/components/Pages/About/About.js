import React from "react"
import Wrapper from "../../HOC Wrapper/Wrapper";
import cls from "../Tasks/Tasks.module.sass";
import illustration from "../../Style assets/Tasks page illustration.svg";

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

        </div>
      </article>

    </section>
  </>

)
}

export default Wrapper(About)