import React from 'react'

function Member(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.bornDate}</td>
        </tr>
    )
}
export default Member
