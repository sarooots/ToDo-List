import React, {useState} from 'react'
import Member from "./Member";
import "./ShowMembers.css";

function ShowMembers() {
    const member = [{name: "Gago", born: 1987}, {name: "Bxdo", born: 2001}]
    // const [member, setMember] = useState([{name: "Gago", born: 1987}, {name: "Gago", born: 1987}])
    return (
        <table>
            <tr>
                <th>name</th>
                <th>born in</th>
            </tr>
            {member.map((member, index) =>
                <Member key={index}
                        name={member.name}
                        born={member.born}
                />
            )}
        </table>
        )
}
export default ShowMembers
