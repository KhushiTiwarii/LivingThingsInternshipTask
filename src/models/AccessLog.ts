import { ObjectId } from "mongodb"

export interface AccessLog {
  _id?: ObjectId
  access_date: Date
  access_time: string
  employee_name: string
  algo_status: string
  timestamp: Date
}

export const AccessLogSchema = {
  access_date: { type: Date, required: true },
  access_time: { type: String, required: true },
  employee_name: { type: String, required: true },
  algo_status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}