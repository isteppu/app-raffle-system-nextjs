"use server"
// import axios from "axios";
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";

// export async function POST(request) {
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user) {
//         return NextResponse.json({ responseCode: 401, responseStatus: "Unauthorized", responseDetail: "Session not found" }, { status: 401 });
//     }
//     const data = await request.json()
//     const body = {
//         "raffleCode": process.env.NEXT_APP_CODE,
//         "drawPeriod": data.category,
//         "cashierLogin": data.username,
//         "drawDate": `${data.date}`
//     }

//     console.log(body)
//     const res = await axios.post(`${process.env.NEXT_APP_URL}/api/inplay/raffle/picker?key=${process.env.NEXT_APP_API_KEY}`, body , 
//     { 
//         headers: { 
//             'Authorization': `Basic aW5wbGF5OjEyMzQ1Njc4` 
//         }
//     }).then((response) => {
//         return response.data
//     }).catch((error) => {
//         console.log(error)
//         return error
//     })
//     return NextResponse.json({
//         res,
//     });
// }


import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req) {
  try {
    // Define the path to the JSON file
    const filePath = path.join(process.cwd(), "app/api/sample/entries.json");
    
    // Read and parse the JSON file
    const fileContents = await fs.readFile(filePath, "utf-8");
    let entries = JSON.parse(fileContents);

    // Check if there are any entries
    if (entries.length === 0) {
      return NextResponse.json({ error: "No entries available" }, { status: 404 });
    }

    // Pick a random winner
    const winner = entries[Math.floor(Math.random() * entries.length)];

    // Convert EntryNo to an array of numbers
    winner.EntryNo = winner.EntryNo.split('').map(Number);
    console.log(winner)

    return NextResponse.json(winner);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to pick a winner" }, { status: 500 });
  }
}
