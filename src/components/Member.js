import React from 'react'

function Member(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.born}</td>
        </tr>
    )
}
export default Member
