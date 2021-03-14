import React, {useState, useEffect, useCallback} from "react"
import {connect} from "react-redux"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {getTasks} from '../../../store/actions'
import {formatDate} from '../../../helpers/utils'
import {history} from "../../../helpers/history"
import {withRouter} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch, faTrash, faCaretDown, faSortAlphaUpAlt, faSortAlphaUp, faSortAmountUp, faSortAmountUpAlt} from "@fortawesome/free-solid-svg-icons"
import cls from "./Filters.module.sass"
import PropTypes from "prop-types"
import Confirm from "../../../components/Confirm/Confirm"




const statusOptions = [
  {
    label: "Unset",
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

function Search({
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
  const [status, setStatus] = useState({
    label: "Status",
    value: ""
  })
  const [sortIndex, setSortIndex] = useState(0)
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


  const handleChangeDates = (value, name) => {
    setDates({
      ...dates,
      [name]: value
    })
  }

  const handleSubmit = (innerSort=sort, innerSortIndex= sortIndex)=>{
    const params = {}

    search && (params.search = search)
    innerSort.value[innerSortIndex] && (params.sort = innerSort.value[innerSortIndex])
    status.value && (params.status = status.value)

    for(let key in dates){
      const value = dates[key]
      if(value){
        params[key] = formatDate(value.toISOString())
      }
    }

    getTasks(params)
  }


  useEffect(()=> {
    const queryString = require('query-string')
    const url = history.location.search
    const filters = {...queryString.parse(url)}

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

    handleSubmit()
  },[dates])

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

  }, [getTasks])

  useEffect(()=>{!location.search && clearFilters()},
    [location.search, clearFilters])



  return (

    <div>
      <div className={cls.filters}>
        <div className={`${cls.filtersGroup}`}>
          <div className={cls.filter}>
            <input
              type="search"
              value={search && search}
              onChange={(e)=> setSearch(e.target.value)}
            />
            <button onClick={()=> handleSubmit()}>
              <FontAwesomeIcon icon={faSearch}/>
            </button>
          </div>


          <div className={cls.filter}>
            <div>{sort.label}</div>
            <ul>
              {
                sortOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={()=> {
                      setSort(option)
                      !(sort.label === option.label) && handleSubmit(option, 0)
                    }}
                  >
                    {option.label}
                  </li>
                ))
              }
            </ul>
            <button onClick={()=> {
              setSortIndex(sortIndex?0:1)

              handleSubmit(undefined, sortIndex?0:1)
            }}>
              <FontAwesomeIcon icon={sort.icon[sortIndex]}/>
            </button>

          </div>

          <button onClick={clearFilters}>
            reset
          </button>
        </div>
        <div className={`${cls.filtersGroup}`}>
          <div className={cls.filter}>
            {
              dateOptions.map((option,index)=> (
                <div key={index}>

                  <DatePicker
                    selected={dates[option.value]}
                    onChange={(value) => handleChangeDates(value, option.value)}
                    customInput={
                      <label>
                        <span>{option.label}</span>
                        <input type="text"/>
                      </label>
                    }
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className={cls.actions}>
        <div className={cls.actionsGroup}>
          <label>
            <div
              className={`${cls.action} ${cls.select}`}
            >
              <input type="checkbox"
                     disabled={!tasks.length}
                     onChange={selectAllTasks}
                     checked={selectedTasks.size === tasks.length && tasks.length > 0 }
              />
              <span className={`${cls.checkbox}`}/>
            </div>
          </label>
          <div>
            <FontAwesomeIcon icon={faCaretDown}/>
          </div>
          <ul>
                <li onClick={deselect}>
                  deselect
                </li>
                <li onClick={inverseSelection}>
                  inverse selection
                </li>
          </ul>
        </div>
      </div>
      <Confirm action={deleteTasks}
               selectedTasks={selectedTasks}
               buttonContent={"դելետե"}/>
      <button onClick={()=>{
        toggleShow()
        changeMode("new")
      }}
              disabled={!!selectedTasks.size}
      >
        new task
      </button>
    </div>

  )


}

Search.propTypes = {
  selectedTasks: PropTypes.object.isRequired,
  selectAllTasks: PropTypes.func.isRequired,
  deselect: PropTypes.func.isRequired,
  toggleShow: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
}



const mapDispatchToProps = {
  getTasks,
}
const mapStateToProps = (state) => {
  return{
    tasks: state.tasks
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Search)
)
