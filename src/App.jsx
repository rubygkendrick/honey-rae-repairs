
import { Outlet, Route, Routes } from "react-router-dom"
import "./App.css"
import { EmployeeList } from "./components/Employees/EmployeeList"
import { CustomerList } from "./components/customers/CustomerList"
import { TicketList } from "./components/tickets/TicketList"
import { NavBar } from "./components/nav/NavBar"
import { Welcome } from "./components/welcome/Welcome"
import { CustomerDetails } from "./components/customers/CustomerDetails"
import { EmployeeDetails } from "./components/Employees/EmployeesDetails"

export const App = () => {
  return <>
    <Routes>
      <Route path="/" element={
        <>
          <NavBar />
          <Outlet />
        </>
      }>
        <Route index element={<Welcome />} />
        <Route path="tickets" element={<TicketList />} />
        <Route path="employees">
          <Route index element={<EmployeeList/>}/>
          <Route path=":employeeId" element={<EmployeeDetails/>}></Route>
        </Route>
        <Route path="customers">
          <Route index element={<CustomerList />}></Route>
          <Route path=":customerId" element={<CustomerDetails/>}></Route>
        </Route>

      </Route>
    </Routes>
  </>
}
