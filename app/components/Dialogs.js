"use client"
import React, { useRef, useEffect, useState } from 'react'

const Dialogs = ({
    dateFrom,
    dateTo,
    changeDateFrom,
    changeDateTo,
    searchEntries,
    searchEntriesResult,
    resetSearchEntries,
    searchCardNoRes,
    cardNo,
    searchCardNo,
    changeCardNo,
    loading,
    winnerName,
    winnerEntryNo,
    winnerCardNo,
    winners
}) => {
    const [outlet, setOutlet] = useState("")

    return (
        <div>
            <dialog id="winner_dialog" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box text-center">
                    <h3 className="font-bold text-lg">Raffle Winner</h3>
                    <p className="fugaz-one-regular py-4 font-bold text-5xl">{winnerEntryNo}</p>
                    <p className=" text-lg">{winnerName}</p>
                    <p className="text-lg">{winnerCardNo}</p>
                    <div className="modal-action flex justify-center">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => { document.getElementById("winner_dialog").classList.remove("modal-open"); }}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="prizes_dialog" className="modal">
                <div className="modal-box w-11/12 max-w-5xl h-4/6">
                    <div className="overflow-x-auto h-4/6">
                        <table className="table table-pin-rows table-pin-cols">
                            <thead>
                                <tr>
                                    <th></th>
                                    <td>Prize</td>
                                    <td>Name</td>
                                    <td>Entry No</td>
                                    <td>Card No</td>
                                    <td>Draw Date</td>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {winners.map((row, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{row.drawPrize}</td>
                                        <td>{row.name}</td>
                                        <td>{row.entryNo}</td>
                                        <td>{row.cardNo}</td>
                                        <td>{row.drawDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => { document.getElementById("prizes_dialog").classList.remove("modal-open"); }}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="entries_dialog" className="modal">
                <div className="modal-box  w-11/12 max-w-5xl  h-5/6">

                    <div className="flex gap-3 mb-2">
                        <label className="input font-bold text-gray-500">
                            Date From
                            <input type="date" disabled={!(searchEntriesResult.length === 0)} onChange={(e) => changeDateFrom(e)} value={dateFrom || ""} className="grow font-normal text-gray-900" />
                        </label>
                        <label className="input font-bold text-gray-500">
                            Date To
                            <input type="date" disabled={!(searchEntriesResult.length === 0)} onChange={(e) => changeDateTo(e)} value={dateTo || ""} className="grow font-normal text-gray-900" />
                        </label>
                        {
                            searchEntriesResult.length === 0 ?
                                <button className="btn btn-success btn-wide" onClick={searchEntries} disabled={loading}>Generate</button>
                                :
                                <button className="btn btn-primary btn-wide" onClick={resetSearchEntries}>Regenerate</button>
                        }
                    </div>
                  
                    <div className="divider m-0"></div>
                    <div className={`overflow-x-auto ${searchEntriesResult.length === 0 ? "h-1/10" : "h-5/9"}`}>
                        <table className="table table-xs table-pin-rows table-pin-cols">
                            <thead>
                                <tr>
                                    <th></th>
                                    <td>Outlet Name</td>
                                    <td>Full Name</td>
                                    <td>Entry No</td>
                                    <td>Card No</td>
                                    <td>Reference ID</td>
                                    <td>GP Source</td>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?
                                        <tr>
                                            <td colSpan="7" className="text-center">Loading...</td>
                                        </tr>
                                        : searchEntriesResult.length === 0 ?
                                            <tr>
                                                <td colSpan="7" className="text-center">No data found</td>
                                            </tr>
                                            :
                                            searchEntriesResult.map((entry, index) => (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <td>{entry.OutletName}</td>
                                                    <td>{entry.FullName}</td>
                                                    <td>{entry.EntryNo}</td>
                                                    <td>{entry.CardNo}</td>
                                                    <td>{entry.ExtRefId}</td>
                                                    <td>{entry.GPSource}</td>
                                                </tr>
                                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="divider m-0"></div>
                    {
                        searchEntriesResult.length > 0 && (
                            <h4 className='text-xs'>{searchEntriesResult.length} rows</h4>
                        )
                    }
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => { document.getElementById("entries_dialog").classList.remove("modal-open"); }}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="player_entries_dialog" className="modal">
                <div className="modal-box  w-9/12 max-w-2xl  h-4/6">

                    <div className="flex gap-3 mb-2">
                        <label className="input">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                            <input type="search" onChange={(e) => changeCardNo(e)} value={cardNo || ""} required placeholder="Card No" />
                        </label>

                        <button className="btn btn-primary" onClick={searchCardNo} disabled={loading}>Generate</button>
                    </div>
                    <div className="divider m-0"></div>
                    <div className={`overflow-x-auto ${searchCardNoRes.length === 0 ? "h-1/10" : "h-5/9"}`}>
                        <table className="table table-xs table-pin-rows table-pin-cols">
                            <thead>
                                <tr>
                                    <th></th>
                                    <td>Outlet Name</td>
                                    <td>Full Name</td>
                                    <td>Entry No</td>
                                    <td>Card No</td>
                                    <td>GP Source</td>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?
                                        <tr>
                                            <td colSpan="7" className="text-center">Loading...</td>
                                        </tr>
                                        :
                                        searchCardNoRes.length === 0 ?
                                            <tr>
                                                <td colSpan="7" className="text-center">No data found</td>
                                            </tr>
                                            :
                                            searchCardNoRes.map((entry, index) => (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <td>{entry.OutletName}</td>
                                                    <td>{entry.FullName}</td>
                                                    <td>{entry.EntryNo}</td>
                                                    <td>{entry.CardNo}</td>
                                                    <td>{entry.GPSource}</td>
                                                </tr>
                                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="divider m-0"></div>
                    {
                        searchCardNoRes.length > 0 && (
                            <h4 className='text-xs'>{searchCardNoRes.length} rows</h4>
                        )
                    }
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={() => { document.getElementById("player_entries_dialog").classList.remove("modal-open"); }}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Dialogs