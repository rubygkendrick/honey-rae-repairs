import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService"
import "./Tickets.css"
import { Ticket } from "./Ticket"
import { TicketFilterBar } from "./TicketFilterBar"


export const TicketList = ({ currentUser }) => {
    const [allTickets, setAllTickets] = useState([]) // [stateVariable, setterFunction]
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
    const [showOpenOnly, setShowOpenOnly] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredTickets, setFilteredTickets] = useState([])


    useEffect(() => {
        if (showEmergencyOnly) {
            const emergencyTickets = allTickets.filter(
                (ticket) => ticket.emergency === true
            )
            setFilteredTickets(emergencyTickets)
        } else {
            setFilteredTickets(allTickets)
        }
    }, [showEmergencyOnly, allTickets])

    useEffect(() => {
        const searchedTickets = allTickets.filter(
            (ticket) => ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredTickets(searchedTickets)
    }, [searchTerm, allTickets])

    const getAndResetTickets = () => {
        getAllTickets().then(ticketsArray => {
            if (currentUser.isStaff) {
                setAllTickets(ticketsArray)
            } else {
                const customerTickets = ticketsArray.filter(
                    (ticket) => ticket.userId == currentUser.id
                )
                setAllTickets(customerTickets)
            }
        })
    }

    useEffect(() => {
        getAndResetTickets()
    }, [currentUser])

        useEffect(()=> {
            if (showOpenOnly) {
                const openTickets = allTickets.filter(ticket => ticket.dateCompleted === "")
                setFilteredTickets(openTickets)
            } else {
                setFilteredTickets(allTickets)
            }
        }, [showOpenOnly , allTickets])



    return (
        <div className="tickets-container">
            <h2>Tickets</h2>
            <TicketFilterBar
                setShowEmergencyOnly={setShowEmergencyOnly}
                setSearchTerm={setSearchTerm}
                setShowOpenOnly={setShowOpenOnly}
                currentUser={currentUser} />
            <article className="tickets">
                {filteredTickets.map((ticketObject) => {
                    return (
                        <Ticket
                            ticket={ticketObject}
                            getAndResetTickets={getAndResetTickets}
                            currentUser={currentUser}
                            key={ticketObject.id} />
                    )
                })}
            </article>
        </div>
    )
}