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
//         "cardNo": 0,
//         "dateFrom": data.dateFrom,
//         "dateTo": data.dateTo,
//     }
//     const res = await axios.get(`${process.env.NEXT_APP_URL_REPORTS}/api/v1/raffle/inplay/entries/date?code=${process.env.NEXT_APP_CODE}&key=${process.env.NEXT_APP_KEY}` , 
//     { 
//         params: body
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
    // Parse request body
    const { startDate, endDate } = await req.json();

    // Define the path to the JSON file
    const filePath = path.join(process.cwd(), "app/api/sample/entries.json");
    
    // Read and parse the JSON file
    const fileContents = await fs.readFile(filePath, "utf-8");
    let entries = JSON.parse(fileContents);

    // Filter by date if provided
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      entries = entries.filter(entry => {
        const entryDate = new Date(entry.Date);
        return (
          (!start || entryDate >= start) &&
          (!end || entryDate <= end)
        );
      });
    }


    return NextResponse.json(entries);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to load entries" }, { status: 500 });
  }
}
