import { useParams } from "react-router-dom"
import "./Employees.css"
import { useEffect, useState } from "react"
import { getEmployeeByUserId } from "../../services/employeeService"

export const EmployeeDetails = () => {
    const { employeeId } = useParams()

    const [employee, setEmployee] = useState({})

    useEffect(() => {
        getEmployeeByUserId(employeeId).then(data => {
            const employeeObject = data[0]
            setEmployee(employeeObject)
        })
    }, [employeeId])

    return (
        <section className="employee">
            <header className="employee-header">{employee.user?.fullName}</header>
            <div>
                <span className="employee-info"> Email :</span>
                {employee.user?.email}
            </div>
            <div>
                <span className="employee-info"> Specialty :</span>
                {employee.specialty}
            </div>
        </section>
    )
}