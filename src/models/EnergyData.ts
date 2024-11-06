// import { ObjectId } from "mongodb"

// export interface EnergyData {
//   _id?: ObjectId
//   createdAt: Date
//   total_kwh: number
//   algo_status: number
// }

// export const EnergyDataSchema = {
//   createdAt: { type: Date, required: true },
//   total_kwh: { type: Number, required: true },
//   algo_status: { type: Number, required: true, enum: [0, 1] }
// }

import { ObjectId } from "mongodb"

export interface EnergyData {
  _id?: ObjectId
  createdAt: Date
  serialNo: string
  clientID: ObjectId
  deviceMapID: ObjectId
  devices: ObjectId[]
  total_kwh: number
  updatedAt: Date
  ac_run_hrs: number
  ac_fan_hrs: number
  algo_status: number
  billing_ammount: number
  cost_reduction: number
  energy_savings: {
    savings_percent: number
    ref_kwh: number
    us_meter: number
    us_calc: number
    inv_factor: number
  }
  mitigated_co2: number
  weather: {
    max_temp: number
    min_temp: number
  }
}

export const EnergyDataSchema = {
  createdAt: { type: Date, required: true },
  serialNo: { type: String, required: true },
  clientID: { type: ObjectId, required: true },
  deviceMapID: { type: ObjectId, required: true },
  devices: { type: [ObjectId], required: true },
  total_kwh: { type: Number, required: true },
  updatedAt: { type: Date, required: true },
  ac_run_hrs: { type: Number, required: true },
  ac_fan_hrs: { type: Number, required: true },
  algo_status: { type: Number, required: true, enum: [0, 1] },
  billing_ammount: { type: Number, required: true },
  cost_reduction: { type: Number, required: true },
  energy_savings: {
    savings_percent: { type: Number, required: true },
    ref_kwh: { type: Number, required: true },
    us_meter: { type: Number, required: true },
    us_calc: { type: Number, required: true },
    inv_factor: { type: Number, required: true },
  },
  mitigated_co2: { type: Number, required: true },
  weather: {
    max_temp: { type: Number, required: true },
    min_temp: { type: Number, required: true },
  }
}
