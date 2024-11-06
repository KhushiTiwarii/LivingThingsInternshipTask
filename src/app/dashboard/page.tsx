// import { redirect } from "next/navigation"
// import { verifyToken } from "@/lib/auth"
// import { cookies } from "next/headers"
// import EnergyDashboard from "@/components/energy-dashboard"
// import AccessLogForm from "@/components/access-log-form"
// import AccessLogsList from "@/components/access-logs-list"

// export default async function DashboardPage() {
//   const cookieStore = await cookies()
//   const token = cookieStore.get("token")?.value
//   console.log(token);
  
//   if (!token || !verifyToken(token)) {
//     redirect("/login")
//   }

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       <h1 className="text-3xl font-bold mb-4">Energy Analytics Dashboard</h1>
//       <EnergyDashboard />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <AccessLogForm />
//         <AccessLogsList />
//       </div>
//     </div>
//   )
// }

// dashboard/page.tsx
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import EnergyDashboard from "@/components/energy-dashboard";
import AccessLogForm from "@/components/access-log-form";
import AccessLogsList from "@/components/access-logs-list";
import { EnergyProvider } from "@/components/EnergyContext";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !verifyToken(token)) {
    redirect("/login");
  }

  return (
    <EnergyProvider>
      <div className="container mx-auto py-8 space-y-8">
        <h1 className="text-3xl font-bold mb-4">Energy Analytics Dashboard</h1>
        <EnergyDashboard />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AccessLogForm />
          <AccessLogsList />
        </div>
      </div>
    </EnergyProvider>
  );
}
