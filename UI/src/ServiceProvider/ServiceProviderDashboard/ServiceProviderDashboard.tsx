import ServiceHeading from "./ServiceHeader"
import ServiceNavbar from "../ServiceNavbar"
import Chart from "../../admin/components/chart/chart"
import ProviderSidebar from "../Sidebar/Sidebar"

function ServiceProviderDashboard() {

    return (
      <div>
        <ServiceNavbar />

      
        <div className="d-flex h-screen bg-gray-100">

      
       <ProviderSidebar />
       <div className="w-100 p-6 bg-white flex-1">
              <div className="charts">
             <Chart/>
              
              </div>
            </div>
          </div>
          </div>
    
  )
}

export default ServiceProviderDashboard