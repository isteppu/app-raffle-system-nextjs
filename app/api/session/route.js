import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {authOptions} from "../../lib/authOptions"

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("session", session)
  if (!session || !session.user) {
    return NextResponse.json({ responseCode: 401, responseStatus: "Unauthorized", responseDetail: "Session not found" },{ status: 401 });
  }

  return NextResponse.json(session);
}

export async function POST(request) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ responseCode: 401, responseStatus: "Unauthorized", responseDetail: "Session not found" }, { status: 401 });
  }

  const body = await request.json();

  session.user = {
    ...session.user,
    ...body, 
  };

  return NextResponse.json({ message: "Session updated", session: session.user });
}
