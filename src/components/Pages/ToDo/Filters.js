import React, {useState, useEffect, useCallback} from "react"
import {connect} from "react-redux"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {deleteTasks, getTasks} from '../../../store/actions'
import {formatDate} from '../../../helpers/utils'
import {history} from "../../../helpers/history"
import {withRouter} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faTrash,
  faCaretDown,
  faSortAlphaUpAlt,
  faSortAlphaUp,
  faSortAmountUp,
  faSortAmountUpAlt,
} from "@fortawesome/free-solid-svg-icons"
import cls from "./Filters.module.sass"
import PropTypes from "prop-types"
import Confirm from "../../../components/Confirm/Confirm"




const statusOptions = [
  {
    label: "All",
    value: ""
  },
  {
    label: "Active",
    value: "active"
  },
  {
    label: "Done",
    value: "done"
  },
]

// each sort option has two values and two icons
const sortOptions = [
  {
    label: "Sort",
    value: ["", ""],
    icon: [faSortAmountUp, faSortAmountUpAlt]
  },
  {
    label: "A-Z",
    value: ["a-z", "z-a"],
    icon: [faSortAlphaUp, faSortAlphaUpAlt]
  },
  {
    label: "Creation date",
    value: ["creation_date_newest", "creation_date_oldest"],
    icon: [faSortAmountUp, faSortAmountUpAlt]
  },
  {
    label: "Deadline",
    value: ["completion_date_newest", "completion_date_Oldest"],
    icon: [faSortAmountUp, faSortAmountUpAlt]
  },
]

const dateOptions = [
  {
    label: 'Created before',
    value: 'create_lte'
  },
  {
    label: 'Created after',
    value: 'create_gte'
  },
  {
    label: 'Complete before',
    value: 'complete_lte'
  },
  {
    label: 'Complete after',
    value: 'complete_gte'
  }
]

function Filters({
                   getTasks,
                   location,
                   deselect,
                   inverseSelection,
                   selectedTasks,
                   deleteTasks,
                   selectAllTasks,
                   tasks,
                   toggleShow,
                   changeMode
                 }) {

  //filters states
  const [status, setStatus] = useState({
    label: "Status",
    value: ""
  })
  const [sort, setSort] = useState({
    label: "Sort",
    value: ["", ""],
    icon: [faSortAmountUp, faSortAmountUpAlt]
  })
  const [search, setSearch] = useState("")
  const [dates, setDates] = useState({
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null,
  })




  // this state indicates index of each sortOption object's value and icon
  const [sortIndex, setSortIndex] = useState(0)
  // the following states is used to create some UI features
  const [showSort, setShowSort] = useState(false) // show or hide sort menu items
  const [showSelectMenu, setShowSelectMenu] = useState(false) // show or hide sort menu items
  const [showAllFilters, setShowAllFilters] = useState(false) // show or hide dates filter

  // get tasks by by URL search query
  // this part of code wil work once the component is loaded
  useEffect(()=> {

    // import query-string module
    const queryString = require('query-string')
    // get search query from URL (gives a string)
    const url = history.location.search
    // create object from query string
    const filters = {...queryString.parse(url)}

    //the following code checks if the filters from query has value then  use that value to change each filter state value
    if (filters.sort) {
      const newSort = sortOptions.find((option)=>{
        return option.value.includes(filters.sort)
      })
      setSort(newSort)
    }

    if (filters.status) {
      const newStatus = statusOptions.find((option)=>{
        return option.value === filters.status
      })
      setStatus(newStatus)
    }

    filters.search && setSearch(filters.search)

    const datesFromQuery = Object.keys(dates).filter((date)=>{
      return filters.hasOwnProperty(date)
    })

    const newDates = {}
    for (let [index, date] of datesFromQuery.entries()) {
      if (dates[date] === null) {
        newDates[date] = new Date(filters[date])
        index===(datesFromQuery.length-1) && setDates(newDates)
      }
    }

    // again call "getTasks" actions with filters, this time filters come from URL query
    getTasks(filters)
  },[getTasks])


  // change dates state value, this method is called on "onChange" event of each datepicker element
  const handleChangeDates = (value, name) => {
    setDates({
      ...dates,
      [name]: value
    })
  }

  // this method is used to send existing filters to API which gives us new filtered list of tasks
  // we pass props because when we call this method it uses old values of filters, to fix it we pass props directly
  const handleSubmit = (innerSort=sort, innerSortIndex= sortIndex, innerStatus = status)=>{

    // this  variable  is for "getTasks" actions, filters will include all filters in a single object
    const filters = {}

    // the following code checks if a filter has value then put  it on filters object
    search && (filters.search = search)
    innerSort.value[innerSortIndex] && (filters.sort = innerSort.value[innerSortIndex])
    innerStatus.value && (filters.status = innerStatus.value)

    for(let key in dates){
      const value = dates[key]
      if(value){
        filters[key] = formatDate(value.toISOString())
      }
    }

    // call "getTasks" action with the filters we created before
    getTasks(filters)
  }


  // this callback method reset all filters
  const clearFilters = useCallback(() => {
    setSort({
      label: "Sort",
      value: ["", ""],
      icon: [faSortAmountUp, faSortAmountUpAlt]
    })
    setSearch("")
    setDates({
      create_lte: null,
      create_gte: null,
      complete_lte: null,
      complete_gte: null,
    })

    getTasks("")

  },  [getTasks])

  // this code will reset all filters values when we query URL is changed
  useEffect(()=>{!location.search && clearFilters()},
    [location.search, clearFilters])



  return (

    <div>
      {/*container for all filters, there are 2 filter groups second one hidden by default */}
      <div className={cls.filters}>
        <div className={`${cls.filtersGroup}`}>
          <div className={`${cls.filter} ${cls.search}`}>
            <input
              className={cls.input}
              type="search"
              placeholder="search"
              value={search && search}
              onChange={(e)=> setSearch(e.target.value)}
            />
            <span className={`${cls.title}`}>
              Search
            </span>
            <button className={cls.button}
                    onClick={()=> handleSubmit()}>
              <FontAwesomeIcon icon={faSearch}/>
            </button>
          </div>

          <div className={`${cls.filter} ${cls.sort}`}>
            <button className={cls.dropDown}
                    onClick={() => setShowSort(!showSort)}
            >
              {sort.label}
              <FontAwesomeIcon icon={faCaretDown}/>
              <ul className={`${cls.dropDownMenu} ${showSort ? cls.showMenu: ""}`}>
                {
                  sortOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={()=> {
                        setSort(option)
                        setShowSort(!showSort)
                        !(sort.label === option.label) && handleSubmit(option, 0)
                      }}
                    >
                      {option.label}
                    </li>
                  ))
                }
              </ul>

            </button>
            <button  className={cls.button}
                     onClick={()=> {
                       setSortIndex(sortIndex?0:1)
                       handleSubmit(undefined, sortIndex?0:1)
                     }}>
              <FontAwesomeIcon icon={sort.icon[sortIndex]}/>
            </button>

          </div>

          <button  className={`${cls.filter} ${cls.reset}`}
                   onClick={clearFilters}>
            reset
          </button>
        </div>
        <div className={`${cls.filtersGroup} ${showAllFilters? cls.showAllFilters:""}`}>
          {
            dateOptions.map((option,index)=> (
              <div key={index}
                   className={`${cls.filter} ${cls.date}`}
              >

                <DatePicker
                  selected={dates[option.value]}
                  onChange={(value) => handleChangeDates(value, option.value)}
                  customInput={
                    <div>
                      <input type="search"
                             className={cls.input}
                             placeholder={option.label}
                             defaultValue={dates[option.value] ? formatDate(dates[option.value].toISOString()):null}
                      />
                      <span className={`${cls.title}`}>{option.label}</span>

                    </div>
                    }
                />

              </div>
            ))
          }
        </div>
      </div>


      {/*click on this element to change value "showAllFilters" and show date filters*/}
      <div className={cls.moreFilters}
           onClick={()=> setShowAllFilters(!showAllFilters)}
      >
        {`${showAllFilters? "less": "more"} filters`}
      </div>

      {/*container for actions */}
      <div className={cls.actions}>
        <div className={`${cls.action}  ${selectedTasks.size? cls.selected : ""}`}>
          <label
            className={`${cls.actionItem} ${cls.select}  ${selectedTasks.size? cls.selected : ""}`}
          >
              <input type="checkbox"
                     disabled={!tasks.length}
                     onChange={selectAllTasks}
                     checked={selectedTasks.size === tasks.length && tasks.length > 0 }
              />
              <span className={`${cls.checkbox}`}/>
          </label>
          <div onClick={()=> setShowSelectMenu(!showSelectMenu)}
               className={`${cls.selectDropDown}`}
          >
            <FontAwesomeIcon icon={faCaretDown}/>
          </div>
          <ul className={`${cls.dropDownMenu} ${showSelectMenu ? cls.showSelectMenu: ""}`}>
            <li onClick={deselect}>
              deselect
            </li>
            <li onClick={inverseSelection}>
              inverse selection
            </li>
          </ul>
        </div>

        <Confirm action={deleteTasks}
                 className={`${cls.action} ${cls.delete}`}
                 selectedTasks={selectedTasks}
                 buttonContent={<FontAwesomeIcon icon={faTrash}/>}/>

        <button disabled={!!selectedTasks.size}
                className={`${cls.action} ${cls.newTask}`}
                onClick={()=>{
                  toggleShow()
                  changeMode("new")
                }}
        >
          new task
        </button>
      </div>

      {/*info about all tasks count, and selected task count*/}
      <p
        className={cls.tasksCount}
      >
        {selectedTasks.size ? `selected ${selectedTasks.size} of ${tasks.length} tasks`: `${tasks.length} tasks were found` }
      </p>

      {/*status filters, in the page shown as pages, there are 3 status option*/}
      <div className={cls.statuses}>
        {
          statusOptions.map((option, index)=> (
            <div key={index}
                 className={`${cls.status} ${option.label === status.label ? cls.activeStatus:""}`}
                 onClick={() => {
                   setStatus(option)
                   handleSubmit(undefined, undefined, option)
                 }}
            >
              <span>{option.label}</span>
            </div>
          ))
        }
      </div>
    </div>

  )


}

// specify each props type, and make them required
// this is not necessary in this component because this component gets all props from it`s parent component and user can not send props
Filters.propTypes = {
  selectedTasks: PropTypes.object.isRequired,
  selectAllTasks: PropTypes.func.isRequired,
  deselect: PropTypes.func.isRequired,
  toggleShow: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return{
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
  getTasks,
  deleteTasks,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Filters)
)
