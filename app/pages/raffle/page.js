"use client"
import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import moment from "moment";
import Navbar from "../../components/Navbar";
import Drawer from "../../components/Drawer";
import Dialogs from "../../components/Dialogs";
import NumberFlow from "@number-flow/react";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


const page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [raffleLoading, setRaffleLoading] = useState(false)
  const [prizes, setPrizes] = useState([])
  const [adminUsername, setAdminUsername] = useState("")
  const [winners, setWinners] = useState([])
  const [entries, setEntries] = useState([])
  const [winner, setWinner] = useState([0, 0, 0, 0, 0, 0])
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [totalEntries, setTotalEntries] = useState(0)
  const [searchEntriesResult, setSearchEntriesResult] = useState([])
  const [cardNo, setCardNo] = useState("")
  const [winnerName, setWinnerName] = useState("")
  const [winnerEntryNo, setwinnerEntryNo] = useState("")
  const [winnerCardNo, setwinnerCardNo] = useState("")
  const [searchByCardNoResult, setSearchByCardNoResult] = useState([])
  const {data: session, update} = useSession()
  const today = moment().format("MMM DD, YYYY")

  const getAllEntries = async () => {
    setLoading(true)
    try {
      const res = await axios.post("/api/raffle/AllEntries")
      console.log(res.data)
      const entriesLength = res.data.length
      setLoading(false)
      setEntries(entriesLength)
    } catch (error) {
      setLoading(false)
      console.log("/api/raffle/AllEntries Error: ", error)
      Toastify({
        duration: -1,
        text: "Error getting entries",
        gravity: "bottom",
        close: true,
        position: "right",
        style: {
          background: "red",
          color: "white"
        }
      }).showToast()
    }
  }

  const getSession = async () => {
    try {
      const getRes = await axios.get("/api/session")
      console.log(getRes.data.user)
      const prizes = JSON.parse(getRes.data.user.userData)
      setPrizes(prizes)
      setWinners(getRes.data.user.winnersData)
      setAdminUsername(getRes.data.user.username)
    } catch (error) {
      console.log("Error: ", error)
      // router.push("/")
    }
  }

  const searchEntries = async () => {
    if (dateFrom === "" || dateTo === "") {
      swal({
        title: "Oops...",
        icon: "error",
        text: "Please fill out the missing fields.",
        closeOnClickOutside: false,
        closeOnEsc: false,
      })
    } else {

      if (moment(dateFrom).isAfter(moment(dateTo))) {
        swal({
          title: "Oops...",
          icon: "error",
          text: "\"Date from\" should be before \"Date to\".",
          closeOnClickOutside: false,
          closeOnEsc: false,
        })
      } else {
        setLoading(true)
        try {
          const searchEntriesRes = await axios.post("/api/raffle/SearchEntries",
            {
              startDate: `${moment(dateFrom).format('MM/DD/YYYY')}`,
              endDate: `${moment(dateTo).format('MM/DD/YYYY')}`
            })

          const arr = searchEntriesRes.data.map((data, index) => {
            return ({
              id: index,
              OutletName: data.OutletName,
              FullName: data.FullName,
              CardNo: data.CardNo,
              EntryNo: data.EntryNo === null ? "There is no record" : data.EntryNo,
              ExtRefId: data.ExtRefId,
              GPSource: data.GPSource,
              ...data
            })
          })
          setLoading(false)
          setSearchEntriesResult(arr)
          setTotalEntries(arr.length)
        } catch (error) {
          setLoading(false)
          console.log("/api/raffle/SearchEntries Error: ", error)
          Toastify({
            duration: -1,
            text: "Error searching for entries",
            gravity: "bottom",
            close: true,
            position: "right",
            style: {
              background: "red",
              color: "white"
            }
          }).showToast()
        }
      }
    }

  }

  const searchCardNo = async () => {
    if (cardNo === "") {
      swal({
        title: "Oops...",
        icon: "error",
        text: "Please fill out the missing fields.",
        closeOnClickOutside: false,
        closeOnEsc: false,
      })
    } else {
      setLoading(true)
      try {
        const searchCardNoRes = await axios.post("/api/raffle/SearchByCardNo", { cardNo: cardNo })
        setLoading(false)
        setSearchByCardNoResult(searchCardNoRes.data)
      } catch (error) {
        setLoading(false)
        console.log("/api/raffle/SearchByCardNo Error: ", error)
        Toastify({
          duration: -1,
          text: "Error searching for entries",
          gravity: "bottom",
          close: true,
          position: "right",
          style: {
            background: "red",
            color: "white"
          }
        }).showToast()
      }
    }
  }

  const picker = async () => {
    if (prizes.length === winners.length) {
      Toastify({
        duration: -1,
        text: "Raffle has ended",
        gravity: "bottom",
        close: true,
        position: "right",
        style: {
          background: "blue",
          color: "white"
        }
      }).showToast()
    }
    else {
      setLoading(true)
      setRaffleLoading(true)
      try {
        const pickerRes = await axios.post("/api/raffle/Picker")
        const win = [...session.user.winnersData, { name: pickerRes.data.FullName, entryNo: pickerRes.data.EntryNo.join(''), cardNo: pickerRes.data.CardNo, drawDate: moment().format("MM/DD/YYYY"), drawPrize: prizes[winners?.length || 0] }]
        await update({ winnersData: win })
        setLoading(false)
        setWinnerName(pickerRes.data.FullName)
        setwinnerCardNo(pickerRes.data.CardNo)
        setwinnerEntryNo(pickerRes.data.EntryNo)
        rollNumber(pickerRes.data.EntryNo)
      } catch (error) {
        setLoading(false)
        console.log("/api/raffle/SearchByCardNo Error: ", error)
        Toastify({
          duration: -1,
          text: "Error searching for entries",
          gravity: "bottom",
          close: true,
          position: "right",
          style: {
            background: "red",
            color: "white"
          }
        }).showToast()
      }
    }
  }

  const rollNumber = (winnerEntry) => {
    let count = 0;
    const finalNumbers = winnerEntry;
    const spinInterval = setInterval(() => {
      setWinner(Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)));
      count++;
      if (count >= 20) {
        clearInterval(spinInterval);
        setWinner(finalNumbers);
        const dialog = setTimeout(() => {
          document.getElementById("winner_dialog").classList.add("modal-open");
          getSession()
          setRaffleLoading(false)
        }, 1800)
        return () => clearTimeout(dialog);
      }
    }, 150);

    return () => {
      clearInterval(spinInterval);
    }
  }

  const openEntriesDialog = () => {
    document.getElementById("entries_dialog").classList.add("modal-open");
  }

  const openPlayerEntriesDialog = () => {
    document.getElementById("player_entries_dialog").classList.add("modal-open");
  }

  const openPrizeDialog = () => {
    document.getElementById("prizes_dialog").classList.add("modal-open");
  }

  const resetSearchEntries = () => {
    setDateFrom("")
    setDateTo("")
    setSearchEntriesResult([])
  }

  const handleInputDateFrom = (e) => {
    setDateFrom(e.target.value)
  }

  const handleInputDateTo = (e) => {
    setDateTo(e.target.value)
  }

  const handleInputCardNo = (e) => {
    setCardNo(e.target.value)
  }

  useEffect(() => {
    getSession()
    getAllEntries()
  }, [])

  return (
    <div className="h-full overflow-hidden">
      <Navbar date={today} adminUsername={adminUsername} />
      <div className="grid grid-cols-20 h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Drawer
            winners={winners}
            prizes={prizes}
            today={today}
            entries={entries}
            loading={loading}
            openPrizeDialog={openPrizeDialog}
          />
        </Suspense>
        <div className="col-span-15">
          <div className="flex justify-center items-center w-full p-20">
            <div className="stats shadow no-scrollbar w-[600px]">
              <div className="stat place-items-center p-10">
                <div className="stat-title mb-5">Raffle Picker</div>
                <div className="flex justify-center items-center">
                  {/* <div className="stat-value mb-5 fugaz-one-regular tracking-widest text-7xl">000000</div> */}
                  {winner.map((num, index) => (
                    <NumberFlow
                      key={index}
                      willChange
                      value={num}
                      spinTiming={{ duration: 1500 }}
                      trend={'+1'}
                      className="stat-value mb-5 fugaz-one-regular tracking-widest text-7xl"
                    />
                  ))}
                </div>
                <div className="stat-actions">
                  <button className="btn btn-xs btn-success uppercase" onClick={picker} disabled={raffleLoading}>Draw a winner</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-base-100 shadow-sm h-full py-3">
          <div className="grid gap-4 flex justify-center">
            <button className="btn btn-circle bg-white text-black border-[#e5e5e5]" disabled={loading} onClick={openEntriesDialog}>
              <svg className={`w-6 h-6 dark:text-white ${loading ? "text-gray-400" : "text-gray-800"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="btn btn-circle bg-white text-black border-[#e5e5e5]" disabled={loading} onClick={openPlayerEntriesDialog}>
              <svg className={`w-6 h-6 dark:text-white ${loading ? "text-gray-400" : "text-gray-800"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 5c.47 0 .917-.092 1.326-.26l1.967 1.967a1 1 0 0 0 1.414-1.414l-1.817-1.818A3.5 3.5 0 1 0 11.5 17Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <Dialogs
          changeDateFrom={handleInputDateFrom}
          changeDateTo={handleInputDateTo}
          changeCardNo={handleInputCardNo}
          searchEntries={searchEntries}
          resetSearchEntries={resetSearchEntries}
          searchCardNo={searchCardNo}
          searchEntriesResult={searchEntriesResult}
          totalEntries={totalEntries}
          dateFrom={dateFrom}
          dateTo={dateTo}
          loading={loading}
          cardNo={cardNo}
          searchCardNoRes={searchByCardNoResult}
          winners={winners}
          winnerName={winnerName}
          winnerCardNo={winnerCardNo}
          winnerEntryNo={winnerEntryNo}
        />
      </div>
    </div>
  );
};

export default page;
