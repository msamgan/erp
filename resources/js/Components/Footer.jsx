import { useEffect, useState } from "react"

export default function Footer() {
    /*const [serverTime, setServerTime] = useState(new Date().toLocaleTimeString())
    const [indianTime, setIndianTime] = useState(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }))
    const [usEastTime, setUsEastTime] = useState(new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" }))
    const [usWestTime, setUsWestTime] = useState(new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" }))
    const [euTime, setEuTime] = useState(new Date().toLocaleTimeString("en-US", { timeZone: "Europe/London" }))
    const [vtTime, setVtTime] = useState(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))

    useEffect(() => {
        const interval = setInterval(() => {
            setServerTime(new Date().toLocaleTimeString())
            setIndianTime(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }))
            setUsEastTime(new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" }))
            setUsWestTime(new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" }))
            setEuTime(new Date().toLocaleTimeString("en-US", { timeZone: "Europe/London" }))
            setVtTime(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))
        }, 1000)

        return () => clearInterval(interval)
    }, [])*/

    const TimeCard = ({ title, time, className = "" }) => {
        return (
            <span className={"shadow p-3 rounded bg-white text-black font-bold " + className}>
                {title}: {time}
            </span>
        )
    }

    return (
        <footer className="primary-bg text-white text-center py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
            {/*Current Time.*/}
            {/*<div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-2">
                <p>
                    <TimeCard title={"SRV"} time={serverTime} />
                    <TimeCard title={"IST"} time={indianTime} className={'ml-4'} />
                    <TimeCard title={"US East"} time={usEastTime} className={'ml-4'} />
                    <TimeCard title={"US West"} time={usWestTime} className={'ml-4'} />
                    <TimeCard title={"EU"} time={euTime} className={'ml-4'} />
                    <TimeCard title={"VT"} time={vtTime} className={'ml-4'} />
                </p>
            </div>*/}
        </footer>
    )
}
