import React, {useState} from "react";
import {connect} from "react-redux"
import {InputGroup, FormControl, Button, DropdownButton, Dropdown, Form} from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


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

function Search() {
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

    const handleSubmit = () => {
        console.log(search)
        console.log(dates)
        console.log(sort)
    }


    return (
        <div className="mb-3">
            <InputGroup >
                <FormControl
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
                        statusOptions.map((option) => (
                            <Dropdown.Item
                                key={option.value}
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
                        sortOptions.map((option) => (
                            <Dropdown.Item
                                key={option.value}
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
            </InputGroup>

            {
                dateOptions.map((option)=> (
                    <div>
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

export default connect()(Search)