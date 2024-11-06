// "use client"

// import { useState } from "react"
// import { format } from "date-fns"
// import { Calendar } from "@/components/ui/calendar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// export default function AccessLogForm() {
//   const [date, setDate] = useState<Date>()
//   const [time, setTime] = useState("")
//   const [employeeName, setEmployeeName] = useState("")
//   const [algoStatus, setAlgoStatus] = useState("")

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     try {
//       const response = await fetch(`/api/log-access`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           access_date: date,
//           access_time: time,
//           employee_name: employeeName,
//           algo_status: algoStatus
//         }),
//       })
      
//       if (response.ok) {
//         // Reset form
//         setDate(undefined)
//         setTime("")
//         setEmployeeName("")
//         setAlgoStatus("")
//         alert("Access log submitted successfully!")
//       } else {
//         throw new Error("Failed to submit access log")
//       }
//     } catch (error) {
//       console.error('Error logging access:', error)
//       alert("Failed to submit access log. Please try again.")
//     }
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Log Chart Access</CardTitle>
//         <CardDescription>Record your chart data access details</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="date">Access Date</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start text-left font-normal"
//                 >
//                   {date ? format(date, "PPP") : "Pick a date"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={date}
//                   onSelect={setDate}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
          
//           <div className="space-y-2">
//             <Label htmlFor="time">Access Time</Label>
//             <Input
//               id="time"
//               type="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="space-y-2">
//             <Label htmlFor="employee">Employee Name</Label>
//             <Input
//               id="employee"
//               value={employeeName}
//               onChange={(e) => setEmployeeName(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="space-y-2">
//             <Label htmlFor="status">Energy Saving Mode</Label>
//             <Select value={algoStatus} onValueChange={setAlgoStatus}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select filter" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="1">ON</SelectItem>
//                 <SelectItem value="0">OFF</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <Button type="submit" className="w-full">
//             Submit Log
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// access-log-form.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEnergyContext } from "@/components/EnergyContext"; // Import the context

export default function AccessLogForm() {
  const { setAlgoStatus } = useEnergyContext(); // Access setAlgoStatus from context
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [algoStatus, setAlgoStatusLocal] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/log-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_date: date,
          access_time: time,
          employee_name: employeeName,
          algo_status: algoStatus,
        }),
      });
      
      if (response.ok) {
        setAlgoStatus(algoStatus); // Update the algoStatus in the context
        setDate(undefined);
        setTime("");
        setEmployeeName("");
        setAlgoStatusLocal("");
        alert("Access log submitted successfully!");
      } else {
        throw new Error("Failed to submit access log");
      }
    } catch (error) {
      console.error("Error logging access:", error);
      alert("Failed to submit access log. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Log Chart Access</CardTitle>
        <CardDescription>Record your chart data access details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Access Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Access Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employee">Employee Name</Label>
            <Input
              id="employee"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Energy Saving Mode</Label>
            <Select value={algoStatus} onValueChange={setAlgoStatusLocal}>
              <SelectTrigger>
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">ON</SelectItem>
                <SelectItem value="0">OFF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full">
            Submit Log
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
