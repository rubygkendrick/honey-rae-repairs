
import { EmployeeList } from "../components/Employees/EmployeeList"
import { Route, Outlet, Routes } from "react-router-dom"
import { CustomerDetails } from "../components/customers/CustomerDetails"
import { NavBar } from "../components/nav/NavBar"
import { CustomerList } from "../components/customers/CustomerList"
import { Welcome } from "../components/welcome/Welcome"
import { TicketList } from "../components/tickets/TicketList"
import { EmployeeDetails } from "../components/Employees/EmployeesDetails"
import { useState, useEffect } from "react"
import { EmployeeForm } from "../components/forms/EmployeeForm"


export const ApplicationViews = () => {
    const [currentUser, setCurrentUser]= useState({})

    useEffect(() => {
      const localHoneyUser = localStorage.getItem("honey_user")
      const honeyUserObject = JSON.parse(localHoneyUser)
      setCurrentUser(honeyUserObject)
    }, [])

  return <Routes>
    <Route path="/" element={
      <>
        <NavBar />
        <Outlet />
      </>
    }>
      <Route index element={<Welcome />} />
      <Route path="tickets" element={<TicketList currentUser={currentUser} />} />
      <Route path="employees">
        <Route index element={<EmployeeList />} />
        <Route path=":employeeId" element={<EmployeeDetails />}></Route>
      </Route>
      <Route path="customers">
        <Route index element={<CustomerList />}></Route>
        <Route path=":customerId" element={<CustomerDetails />}></Route>
      </Route>
      <Route path="profile" element={<EmployeeForm currentUser={currentUser}/>}></Route>

    </Route>
  </Routes>
}
