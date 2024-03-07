import { useState } from "react"
import "./Form.css"
import { createServiceTicket } from "../../services/ticketService"
import { useNavigate } from "react-router-dom"

export const TicketForm = ({ currentUser }) => {
    const navigate = useNavigate()
    const [ticket, setTicket] = useState({
        description: "",
        emergency: false,
    })

    const handleNewTicket = (event) => {
       event.preventDefault()
        if (ticket.description) {
            const newTicket = {
                userId: currentUser.userId,
                description: ticket.description,
                emergency: ticket.emergency,
                dateCompleted: ""
            }

            createServiceTicket(newTicket).then(() => {
                navigate("/tickets")
            })
        } else {
            window.alert("description field required")
        }
        

    }

    return (
        <form>
            <h2>New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="brief description of problem"
                        onChange={(event) => {
                            const ticketCopy = { ...ticket }
                            ticketCopy.description = event.target.value
                            setTicket(ticketCopy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Emergency:
                        <input type="checkbox"
                            onChange={(event) => {
                                const ticketCopy = { ...ticket }
                                ticketCopy.emergency = event.target.checked
                                setTicket(ticketCopy)
                            }} />
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-info"
                        onClick={handleNewTicket}
                    >Submit Ticket</button>
                </div>
            </fieldset>
        </form>
    )
}