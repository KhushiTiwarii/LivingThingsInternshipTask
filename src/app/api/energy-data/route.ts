// import { NextRequest, NextResponse } from "next/server"
// import clientPromise from "@/lib/db"
// import { EnergyData } from "@/models/EnergyData"
// import { verifyToken } from "@/lib/auth"

// export async function GET(req: NextRequest) {
  

//   try {
//     const client = await clientPromise
//     const db = client.db("energy_analytics")
//     const energyData = await db.collection<EnergyData>("energy_data").find({}).toArray()
//     return NextResponse.json(energyData)
//   } catch (error) {
//     console.error("Error fetching energy data:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }


// // POST request: Adds new energy data
// export async function POST(req: NextRequest) {
//   try {
//     // Parse request body
//     const body = await req.json()
//     const { createdAt, total_kwh, algo_status } = body

//     // Validate required fields
//     if (!createdAt || !total_kwh || typeof algo_status !== 'number') {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//     }

//     const client = await clientPromise
//     const db = client.db("energy_analytics")
//     const collection = db.collection<EnergyData>("energy_data")

//     // Insert data into MongoDB
//     const result = await collection.insertOne({
//       createdAt: new Date(createdAt),
//       total_kwh,
//       algo_status,
//     })

//     return NextResponse.json({ message: "Data inserted successfully", data: result }, { status: 200 })
//   } catch (error) {
//     console.error("Error inserting energy data:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }
import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/db"
import { EnergyData } from "@/models/EnergyData"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("energy_analytics")
    const energyData = await db.collection<EnergyData>("energy_data").find({}).toArray()
    return NextResponse.json(energyData)
  } catch (error) {
    console.error("Error fetching energy data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Destructuring the body to match your schema
    const {
      createdAt,
      serialNo,
      clientID,
      deviceMapID,
      devices,
      total_kwh,
      updatedAt,
      ac_run_hrs,
      ac_fan_hrs,
      algo_status,
      billing_ammount,
      cost_reduction,
      energy_savings,
      mitigated_co2,
      weather,
    } = body

    // Ensure required fields are present (basic validation)
    if (!createdAt || !serialNo || !clientID || !deviceMapID || !devices || !total_kwh || !updatedAt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("energy_analytics")
    const collection = db.collection<EnergyData>("energy_data")

    // Insert the document with the parsed data
    const result = await collection.insertOne({
      createdAt: new Date(createdAt),
      serialNo,
      clientID: new ObjectId(clientID),
      deviceMapID: new ObjectId(deviceMapID),
      devices: devices.map((id: string) => new ObjectId(id)),
      total_kwh,
      updatedAt: new Date(updatedAt),
      ac_run_hrs,
      ac_fan_hrs,
      algo_status,
      billing_ammount,
      cost_reduction,
      energy_savings: {
        savings_percent: energy_savings.savings_percent,
        ref_kwh: energy_savings.ref_kwh,
        us_meter: energy_savings.us_meter,
        us_calc: energy_savings.us_calc,
        inv_factor: energy_savings.inv_factor,
      },
      mitigated_co2,
      weather: {
        max_temp: weather.max_temp,
        min_temp: weather.min_temp,
      },
    })

    return NextResponse.json({ message: "Data inserted successfully", data: result }, { status: 201 })
  } catch (error) {
    console.error("Error inserting energy data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
