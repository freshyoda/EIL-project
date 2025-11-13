import { useState, useEffect } from "react";
import { Building, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeaveForm from "./LeaveForm";
import LeaveSummary from "./LeaveSummary";
import LeaveHistory from "./LeaveHistory";

const LeavePortal = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    document.title = "EIL-Employee Leave Portal";
  }, []);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleFormSubmitSuccess = () => {
    // Refresh components by changing key
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-eil-grey min-w-[100vw] text-black">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Leave Form and History */}
          <div className="lg:col-span-2">
            <LeaveForm
              key={`form-${refreshKey}`}
              onSubmitSuccess={handleFormSubmitSuccess}
              userData={userData}
            />
            <LeaveHistory key={`history-${refreshKey}`} userData={userData} />
          </div>

          {/* Right Column: Leave Summary */}
          <div className="lg:col-span-1">
            <LeaveSummary key={`summary-${refreshKey}`} />
          </div>
        </div>
      </main>

      {/* Load jsPDF from CDN for PDF export functionality */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    </div>
  );
};

export default LeavePortal;
