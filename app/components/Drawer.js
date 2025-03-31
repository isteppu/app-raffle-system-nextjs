"use client"
import React, { useEffect, useState } from 'react'
import { CSVLink } from "react-csv";

const Drawer = ({ winners, prizes, today, entries, openPrizeDialog, loading }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleDownload = () => {
        document.getElementById("csv-download").click();
    };

    return (
        <div className="bg-base-100 col-span-4 shadow-md h-full">
            <div className="stat">
                <div className="stat place-items-center">
                    <div className="stat-title">Raffle Entries</div>
                    {
                        entries.length === 0 ?
                            <div className="skeleton h-10 w-full"></div>
                            :
                            <div className="stat-value fugaz-one-regular">{entries}</div>
                    }

                    <div className="stat-desc">From February 5, 2024 to {today}</div>
                </div>
            </div>
            <div className="divider small-screen-m-0"></div>
            <div className="text-sm font-semibold uppercase text-center">Raffle Prizes</div>
            <div className="overflow-scroll small-container h-[50vh]">
                <ul className="list">
                    {
                        loading ?
                            [...Array(5)].map((_, i) => (
                                <li className="list-row" key={i}>
                                    <div className="skeleton h-10 w-10"></div>
                                    <div className="skeleton h-10 w-full"></div>
                                    <div className="skeleton h-10 w-10"></div>
                                </li>
                            ))
                            :
                            prizes.map((prize, index) => {
                                return (
                                    <li className="list-row" key={index}>
                                        <div><img width="48" height="48" src="https://img.icons8.com/emoji/48/coin-emoji.png" alt="coin-emoji" /></div>
                                        <div>
                                            <div>{prize}</div>
                                            {
                                                (index + 1) <= winners?.length ?
                                                    <div className="text-xs uppercase font-semibold opacity-60 text-green-800">Winner:<i className="text-green-600"> {winners[index].name} </i></div>
                                                    :
                                                    <div className="text-xs uppercase font-semibold opacity-60 text-blue-600">No Winner Yet</div>
                                            }
                                        </div>

                                        {
                                            (index + 1) <= winners?.length ?
                                                <div>
                                                    <svg className="w-6 h-6 text-green-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                                    </svg>

                                                </div>
                                                :
                                                <div>
                                                    <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M5.5 3a1 1 0 0 0 0 2H7v2.333a3 3 0 0 0 .556 1.74l1.57 2.814A1.1 1.1 0 0 0 9.2 12a.998.998 0 0 0-.073.113l-1.57 2.814A3 3 0 0 0 7 16.667V19H5.5a1 1 0 1 0 0 2h13a1 1 0 1 0 0-2H17v-2.333a3 3 0 0 0-.56-1.745l-1.616-2.82a1 1 0 0 0-.067-.102 1 1 0 0 0 .067-.103l1.616-2.819A3 3 0 0 0 17 7.333V5h1.5a1 1 0 1 0 0-2h-13Z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                        }
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
            <div className="divider small-screen-m-0"></div>
            <div className="grid gap-2 p-2">
                <button className={`btn btn-sm w-full bg-white border-[#e5e5e5] ${loading ? "text-gray-400" : "text-black"}`} onClick={openPrizeDialog} disabled={loading}>
                    <svg className={`w-6 h-6 dark:text-white ${loading ? "text-gray-400" : "text-gray-800"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
                    </svg>
                    See table
                </button>
                <button className={`btn btn-sm w-full bg-white border-[#e5e5e5] ${loading ? "text-gray-400" : "text-black"}`} disabled={loading} onClick={handleDownload}> 
                    <svg className={`w-6 h-6 dark:text-white ${loading? "text-gray-400" : "text-gray-800"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd" />
                    </svg>
                    Download
                    {isClient && (
                        <CSVLink
                            data={winners}
                            filename="winners.csv"
                            id="csv-download"
                            style={{ display: "none" }}
                        />
                    )}
                </button>
            </div>
        </div>

    )
}

export default Drawer