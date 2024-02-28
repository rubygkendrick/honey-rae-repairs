import { getStaffUsers } from "../../services/userService"
import { User } from "../users/User"
import "./Employees.css"
import { useEffect, useState } from "react"

export const EmployeeList = () => {
    const [staff, setStaff] = useState([])

    useEffect(() => {
        getStaffUsers().then((staffArray) => {
            setStaff(staffArray)
        }
        )
    }, [])

    return (
        <div className="employees">
        {staff.map((staffObj) => {
              return(
                 <User user={staffObj} key={staffObj.id}/> 
              )
            })}
        </div>
    )
}