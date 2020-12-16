import React, {useState} from 'react'
import Member from "./Member";
import "./ShowMembers.css";

function ShowMembers() {
    // const member = [{name: "Gago", born: 1987}, {name: "Bxdo", born: 2001}]
    const [member, setMember] = useState([{name: "Gago", bornDate: 1987}, {name: "Bxdo", bornDate: 2001}])
    const [name, setName] = useState("wrong name")
    const [bornDate, setBornDate] = useState("yy.mm.dd")
    console.log(member)
    return (
        <div>
            <form>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                <input type="date" placeholder="born in" onChange={(e) => setBornDate(e.target.value)} />
                <br/>
                <button type="button" onClick={() => setMember([...member, {name: name, bornDate: bornDate}])}>add new member</button>
            </form>
            <table>
                <tr>
                    <th>name</th>
                    <th>born in</th>
                </tr>
                {member.map((member, index) =>
                    <Member key={index}
                            name={member.name}
                            bornDate={member.bornDate}
                    />
                )}
            </table>
        </div>
        )
}
export default ShowMembers
