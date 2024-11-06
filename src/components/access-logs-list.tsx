"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AccessLog {
  _id: string
  access_date: string
  access_time: string
  employee_name: string
  algo_status: string
  timestamp: string
}

export default function AccessLogsList() {
  const [logs, setLogs] = useState<AccessLog[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/api/log-access`)
        const data = await response.json()
        setLogs(data)
      } catch (error) {
        console.error('Error fetching access logs:', error)
      }
    }
    fetchLogs()
  }, [])

  return (
    <Table>
      <TableCaption>A list of recent chart access logs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Energy Saving Mode</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log._id}>
            <TableCell>{format(new Date(log.access_date), 'PP')}</TableCell>
            <TableCell>{log.access_time}</TableCell>
            <TableCell>{log.employee_name}</TableCell>
            <TableCell>{log.algo_status === "1" ? "ON" : "OFF"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}