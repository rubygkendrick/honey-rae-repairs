
import { EmployeeList } from "../components/Employees/EmployeeList"
import { Route, Outlet, Routes } from "react-router-dom"
import { CustomerDetails } from "../components/customers/CustomerDetails"
import { EmployeeNav } from "../components/nav/EmployeeNav"
import { CustomerList } from "../components/customers/CustomerList"
import { Welcome } from "../components/welcome/Welcome"
import { TicketList } from "../components/tickets/TicketList"
import { EmployeeDetails } from "../components/Employees/EmployeesDetails"
import { EmployeeForm } from "../components/forms/EmployeeForm"

export const EmployeeViews = ({currentUser}) => {
    return <Routes>
        <Route path="/" element={
            <>
                <EmployeeNav />
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
            <Route path="profile" element={<EmployeeForm currentUser={currentUser} />}></Route>

        </Route>
    </Routes>
}