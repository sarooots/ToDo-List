import React, {useState, useEffect, useCallback} from "react"
import {connect} from "react-redux"
import {InputGroup, FormControl, Button, DropdownButton, Dropdown, Form} from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {getTasks} from '../../store/actions'
import {formatDate} from '../../helpers/utils'
import {history} from "../../helpers/history"
import {withRouter} from "react-router-dom";


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
        label: "All",
        value: ""
    },
    {
        label: "A-Z",
        value: "a-z"
    },
    {
        label: "Z-A",
        value: "z-a"
    },
    {
        label: "Creation Date Oldest",
        value: "creation_date_oldest"
    },
    {
        label: "Creation Date Newest",
        value: "creation_date_newest"
    },
    {
        label: "Completion Date Newest",
        value: "completion_date_newest"
    },
    {
        label: "Completion Date Oldest",
        value: "completion_date_Oldest"
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

function Search({getTasks, location}) {
    const [status, setStatus] = useState({
        label: "Status",
        value: ""
    })
    const [sort, setSort] = useState({
        label: "All",
        value: ""
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

    const handleSubmit = ()=>{
        const params = {}

        search && (params.search = search)
        sort.value && (params.sort = sort.value)
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
                return option.value === filters.sort
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
    },[dates])

    const clearFilters = useCallback(() => {
        setStatus({
            label: "Status",
            value: ""
        })
        setSort({
            label: "All",
            value: ""
        })
        setSearch("")
        setDates({
            create_lte: null,
            create_gte: null,
            complete_lte: null,
            complete_gte: null,
        })

        getTasks({})

    }, [getTasks])

    useEffect(()=>{
        !location.search && clearFilters()

    }, [location.search, clearFilters])

    return (
        <div className="mb-3">
            <InputGroup >
                <FormControl
                    value={search && search}
                    placeholder="Search"
                    onChange={(e)=> setSearch(e.target.value)}
                />
                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-primary"
                    title={status.value? status.label: "Status"}
                    id="input-group-dropdown-1"
                >
                    {
                        statusOptions.map((option,index) => (
                            <Dropdown.Item
                                key={index}
                                active={status.value === option.value}
                                onClick={()=> setStatus(option)}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>

                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-primary"
                    title={sort.value? sort.label: "Sort"}
                    id="input-group-dropdown-1"
                >
                    {
                        sortOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                active={sort.value === option.value}
                                onClick={()=> setSort(option)}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>

                <Button
                    variant="outline-primary"
                    onClick={handleSubmit}
                >
                    Search
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={clearFilters}
                >
                    clear
                </Button>
            </InputGroup>

            {
                dateOptions.map((option,index)=> (
                    <div key={index}>
                        <span>{option.label}</span>
                        <DatePicker
                            selected={dates[option.value]}
                            onChange={(value) => handleChangeDates(value, option.value)}
                            customInput={<Form.Control type="text"/>}
                        />

                    </div>
                ))
            }

        </div>
    )


}

const mapDispatchToProps = {
    getTasks
}
// export default connect(null, mapDispatchToProps)(
//     compose(
//         withRouter,Search
//     )
// )

export default withRouter(
    connect(null, mapDispatchToProps)(Search)
)