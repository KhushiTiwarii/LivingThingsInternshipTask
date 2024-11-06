// "use client"

// import { useEffect, useState } from "react"
// import { Bar, BarChart, XAxis, YAxis } from "recharts"
// import { format } from "date-fns"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// interface EnergyData {
//   createdAt: string
//   total_kwh: number
//   algo_status: number
// }

// export default function EnergyDashboard() {
//   const [data, setData] = useState<EnergyData[]>([])
//   const [showEnergyOn, setShowEnergyOn] = useState(true)
//   const [showEnergyOff, setShowEnergyOff] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         const response = await fetch('/api/energy-data', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         })
//         if (response.ok) {
//           const jsonData = await response.json()
//           setData(jsonData)
//         } else {
//           throw new Error('Failed to fetch data')
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       }
//     }
//     fetchData()
//   }, [])

//   const chartData = data.map(item => ({
//     date: format(new Date(item.createdAt), 'MMM d, yyyy'),
//     energyOn: item.algo_status === 1 ? item.total_kwh : 0,
//     energyOff: item.algo_status === 0 ? item.total_kwh : 0,
//   }))

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle>Energy Consumed</CardTitle>
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <Checkbox 
//               id="energyOn" 
//               checked={showEnergyOn}
//               onCheckedChange={(checked: boolean) => setShowEnergyOn(checked)}
//             />
//             <label htmlFor="energyOn">Energy Saving Mode ON</label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Checkbox 
//               id="energyOff" 
//               checked={showEnergyOff}
//               onCheckedChange={(checked: boolean) => setShowEnergyOff(checked)}
//             />
//             <label htmlFor="energyOff">Energy Saving Mode OFF</label>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer
//           config={{
//             energyOn: {
//               label: "Energy Saving ON",
//               color: "hsl(var(--chart-1))",
//             },
//             energyOff: {
//               label: "Energy Saving OFF", 
//               color: "hsl(var(--chart-2))",
//             },
//           }}
//           className="h-[400px]"
//         >
//           <BarChart
//             data={chartData}
//             stackOffset="none"
//             margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
//           >
//             <XAxis 
//               dataKey="date" 
//               angle={-45}
//               textAnchor="end"
//               height={60}
//               tickMargin={20}
//             />
//             <YAxis label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }} />
//             {showEnergyOn && (
//               <Bar
//                 dataKey="energyOn"
//                 fill="var(--color-energyOn)"
//                 stackId="stack"
//                 radius={[4, 4, 0, 0]}
//               />
//             )}
//             {showEnergyOff && (
//               <Bar
//                 dataKey="energyOff"
//                 fill="var(--color-energyOff)"
//                 stackId="stack"
//                 radius={[4, 4, 0, 0]}
//               />
//             )}
//             <ChartTooltip content={<ChartTooltipContent />} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }
"use client"
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEnergyContext } from "@/components/EnergyContext";

interface EnergyData {
  createdAt: string;
  total_kwh: number;
  algo_status: number;
}

export default function EnergyDashboard() {
  const { algoStatus } = useEnergyContext();
  const [data, setData] = useState<EnergyData[]>([]);
  const [showEnergyOn, setShowEnergyOn] = useState(true);
  const [showEnergyOff, setShowEnergyOff] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('/api/energy-data', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
          console.log(jsonData);
          
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Aggregate data by date
  const aggregatedData = data.reduce((acc, item) => {
    const date = format(new Date(item.createdAt), 'MMM d, yyyy');
    if (!acc[date]) {
      acc[date] = { date, energyOn: 0, energyOff: 0 };
    }
    if (item.algo_status === 1) {
      acc[date].energyOn += item.total_kwh;
    } else if (item.algo_status === 0) {
      acc[date].energyOff += item.total_kwh;
    }
    return acc;
  }, {} as Record<string, { date: string; energyOn: number; energyOff: number }>);

  const chartData = Object.values(aggregatedData);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
      <CardTitle>Energy Consumed </CardTitle>
      {algoStatus==='1' && <CardTitle className=" text-red-600">Log Access &apos;ON&apos; </CardTitle>}
      {algoStatus==='0' && <CardTitle className=" text-red-600">LogAccess &apos;OFF&apos;</CardTitle>}      
        <div className="flex items-center space-x-4">
          {algoStatus==="" && <div className="flex items-center space-x-2">
            <Checkbox 
              id="energyOn" 
              checked={showEnergyOn}
              onCheckedChange={(checked: boolean) => setShowEnergyOn(checked)}
            />
            <label htmlFor="energyOn">Energy Saving Mode ON</label>
          </div>}
          {algoStatus==="" && <div className="flex items-center space-x-2">
            <Checkbox 
              id="energyOff" 
              checked={showEnergyOff}
              onCheckedChange={(checked: boolean) => setShowEnergyOff(checked)}
            />
            <label htmlFor="energyOff">Energy Saving Mode OFF</label>
          </div>}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            energyOn: {
              label: "Energy Saving ON",
              color: "hsl(var(--chart-1))",
            },
            energyOff: {
              label: "Energy Saving OFF", 
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px]"
        >
          <BarChart
            data={chartData}
            stackOffset="none"
            margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
          >
            <XAxis 
              dataKey="date" 
              angle={-45}
              textAnchor="end"
              height={60}
              tickMargin={20}
            />
            <YAxis label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }} />
            {showEnergyOn && algoStatus==="" && (
              <Bar
                dataKey="energyOn"
                fill="var(--color-energyOn)"
                stackId="stack"
                radius={[4, 4, 0, 0]}
              />
            )}
            {algoStatus==="1" && (
              <Bar
                dataKey="energyOn"
                fill="var(--color-energyOn)"
                stackId="stack"
                radius={[4, 4, 0, 0]}
              />
            )}
            {showEnergyOff && algoStatus==="" && (
              <Bar
                dataKey="energyOff"
                fill="var(--color-energyOff)"
                stackId="stack"
                radius={[4, 4, 0, 0]}
              />
            )}
            {algoStatus==="0" && (
              <Bar
                dataKey="energyOff"
                fill="var(--color-energyOff)"
                stackId="stack"
                radius={[4, 4, 0, 0]}
              />
            )}
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


