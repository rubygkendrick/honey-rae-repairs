import { useParams } from "react-router-dom"
import "./Employees.css"
import { useEffect, useState } from "react"
import { getEmployeeByUserId, getEmployeeTickets } from "../../services/employeeService"

export const EmployeeDetails = () => {
    const { employeeId } = useParams()

    const [employee, setEmployee] = useState({})
    const [employeesWithTickets, setEmployeesWithTickets] = useState({})

    useEffect(() => {
        getEmployeeTickets().then((employeeWithTicketsArray) => {
            //if employeeWithTicket is an array of objects, you want to map that and call it 
            employeeWithTicketsArray.filter((employeeWithTicket) => {
                
               employeeWithTicket.id === employee.id ? setEmployeesWithTickets(employeeWithTicket) : null
                //this is returning an array of objects ? hopefully 
            })
          

        })
    }, [employee, employeeId])

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
            <div>
                <span className="employee-info">Rate :</span>
                {employee.rate}
            </div>
            <div>
                <h4 className="employee-info-italic">
                    Currently this employee is working on {employeesWithTickets.employeeTickets?.length === 0 ? 0 : employeesWithTickets.employeeTickets?.length} tickets
                </h4>

            </div>
        </section>
    )
}