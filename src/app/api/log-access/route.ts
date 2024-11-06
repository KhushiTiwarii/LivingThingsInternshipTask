import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/db"
import { AccessLog } from "@/models/AccessLog"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { access_date, access_time, employee_name, algo_status } = body

    const client = await clientPromise
    const db = client.db("energy_analytics")
    
    const newAccessLog: AccessLog = {
      access_date: new Date(access_date),
      access_time,
      employee_name,
      algo_status,
      timestamp: new Date()
    }

    const result = await db.collection<AccessLog>("access_logs").insertOne(newAccessLog)

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error("Error logging access:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("energy_analytics")
    const accessLogs = await db.collection<AccessLog>("access_logs").find({}).sort({ timestamp: -1 }).toArray()
    return NextResponse.json(accessLogs)
  } catch (error) {
    console.error("Error fetching access logs:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}