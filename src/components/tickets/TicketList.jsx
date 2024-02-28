import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService"
import "./Tickets.css"
import { Ticket } from "./Ticket"
import { TicketFilterBar } from "./TicketFilterBar"


export const TicketList = () => {
    const [allTickets, setAllTickets] = useState([]) // [stateVariable, setterFunction]
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
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


    useEffect(() => {
        getAllTickets().then(ticketsArray => {
            setAllTickets(ticketsArray)
            console.log("tickets set!")
        })

    }, [])



    return (
        <div className="tickets-container">
            <h2>Tickets</h2>
            <TicketFilterBar
                setShowEmergencyOnly={setShowEmergencyOnly}
                setSearchTerm={setSearchTerm} />
            <article className="tickets">
                {filteredTickets.map((ticketObject) => {
                    return (
                        <Ticket ticket={ticketObject} key={ticketObject.id} />
                    )
                })}
            </article>
        </div>
    )
}