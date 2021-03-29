import React from "react"
import cls from "../Tasks/Tasks.module.sass";
import illustration from "../../Style assets/Tasks page illustration.svg";
import Wrapper from "../../HOC Wrapper/Wrapper";

function NotFound(){
return (
  <>
    {/*whole page content*/}
    <section className={cls.wrapper}>
      {/*first section of page, intro*/}
      <article className={`intro ${cls.article}`}>
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

export default Wrapper(NotFound)
