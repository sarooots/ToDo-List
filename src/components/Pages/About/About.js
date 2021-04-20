import React from "react"
import Wrapper from "../../HOC Wrapper/Wrapper";
import cls from "./About.module.sass";
import illustration from "../../Style assets/About page illustration.png";


const featuresList = [
  "add task, task must have title (required) deadline and description (optional)",
  "view task in task viewer page",
  "edit task",
  "change task status (done / active)",
  "delete a single task",
  "select single or multiple tasks",
  "can change selection by \"deselect\" and \"invert selection\" actions",
  "delete selected multiple tasks",
  "search and filter tasks to find needed task",
  "sort tasks by status, deadline, creation date, A-Z"
]

const usedModules = [
  {
    name: "Sass",
    link: "https://sass-lang.com/"
  },
  {
    name: "node-sass",
    link: "https://www.npmjs.com/package/node-sass"
  },
  {
    name: "react-fontawesome",
    link: "https://www.npmjs.com/package/@fortawesome/react-fontawesome"
  },
  {
    name: "moment.js",
    link: "https://www.npmjs.com/package/moment"
  },
  {
    name: "bootstrap",
    link: "https://react-bootstrap.github.io"
  },
  {
    name: "query-string",
    link: "https://www.npmjs.com/package/query-string"
  },
  {
    name: "overlayscrollbars",
    link: "https://www.npmjs.com/package/overlayscrollbars"
  },
  {
    name: "redux",
    link: "https://www.npmjs.com/package/redux"
  },
  {
    name: "redux-thunk",
    link: "https://www.npmjs.com/package/redux-thunk"
  },
  {
    name: "redux-logger",
    link: "https://www.npmjs.com/package/redux-logger"
  },
  {
    name: "react-toastify",
    link: "https://www.npmjs.com/package/react-toastify"
  },
  {
    name: "history",
    link: "https://www.npmjs.com/package/history"
  },
]

// about sections
const abouts = [
  {
    title: "Intro",
    href: "intro",
    body() {
      return <p>
        This project was made during the React JS course as an experimental project, for learning purposes.
        Working on this project was a great opportunity to use all skills that I've got during the participating to the course.
        This project was developed with React JS, Redux JS, REST API and token based authentication.
      </p>
    }
  },
  {
    title: "Documentation",
    href: "documentation",
    body() {
      return <>
        <p>
          To access all features of this app you have to create an account and log in
          if you don't have an account you will have access to contact page where you can send a message to site admins.
          In welcome page before creating account you can learn how our tasks look.
          <br/>
          <br/>
          Once if you loged in you have access to all features listed below
        </p>
        <ol>
          {
            featuresList.map((feature, index) =>
              <li key={index}>{feature}</li>)
          }
        </ol>
      </>
    }
  },
  {
    title: "Production process",
    href: "production",
    body() {
      return <>
        <p>
          "Todo" was an experimental project intended for using the skills I've got during the participating to the course mentioned above.
          <br/>
          Of course this project could be better developed. for now I look at the code I wrote and I see many things which could be better than now they are.
          <br/>
          To develop this project, I used React JS, Redux JS, REST API and many node modules. In the code, some components were made with functions and some with classes, which means I worked with hooks and.
          <br/>
          For styling I used a UI that I made with Adobe XD, which was my first experience in creating a user-friendly UI and using it. So please don't criticize too much, considering that this was my first experience.
          <br/>
          The following modules were used to develop this site.
        </p>

        <ul>
          {
            usedModules.map((module, index)=>
              <li key={index}>
                <a href={module.link} target="_blank" rel="noreferrer">
                  {module.name}
                </a>
              </li>
            )
          }
        </ul>
      </>
    }
  },
  {
    title: "The course",
    href: "course",
    body() {
      return <p>
        This course was organized by the Мinestry of High Tech Industry with "Bitschool" business and IT school. I applied for the course at the end of 2020. Based on the results of the exam, I received a 60% discount and participated in a course that began in November and ended in April.  During the course I learned web development using React.js, Redux.js and REST API. Used Token Based Authentication for Single Page Apps (SPAs). Working on this project, I used all the skills that I gained during the course.
      </p>
    }
  },
  {
    title: "Author",
    href: "author",
    body() {
      return <p>
        Hello, I am Hayk, the frontend developer of this site. Low let me tell you a little about my involvement in the IT industry.
        <br/>
        I took my first step in IT in 2016, I learned HTML CSS JavaScript. Using several Javascript libraries, I've done small experimental projects just for practice.I had learned PHP MySQL until 2018, but since I had no idea of a really useful project in my mind․ So  I did not apply what I had learned and forget many things that way. From 2018-2020, I taught HTML CSS JavaScript to my students while teaching at "Armath" Laboratory. Starting in 2020, I decided to expand my knowledge and move from amateur to professional level, so I applied for the above course and took part. At the same time I repeated what I had learned earlier.
        <br/>
        At the moment I am looking for an opportunity to practically apply my skills. And now I am also learning backend development with Node JS.
        <br/>
        <br/>
        below you ill find the links to my social network accounts.
      </p>
    }
  },
]
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
              {
                abouts.map((about, index)=>
                  <li key={index}>
                    <a href={`#${about.href}`}>{about.title}</a>
                  </li>
                )
              }
            </ul>
          </div>
        </article>
        {
          abouts.map((about, index)=>
            <article
              key={index}
              className={`${cls.about} ${article} ${cls.article}`}
            >
              <div id={about.href} className={cls.trigger}/>
              <h2>{about.title}</h2>
              {about.body()}
            </article>
          )
        }
      </section>
    </>

  )
}

export default Wrapper(About)