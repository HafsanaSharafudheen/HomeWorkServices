import ServiceHeading from "./ServiceHeader"
import ServiceNavbar from "../ServiceNavbar"
import ServiceSidebar from "../serviceSidebar"
import Chart from "../../../components/chart/chart"

function ServiceProviderDashboard() {

    return (
      <div>
        <ServiceNavbar />

      
       <div className="row">

      
           <div className="col-md-3">
           <ServiceSidebar />

           </div>
            
            <div className="col-md-9">
              <ServiceHeading />
              <div className="charts p-4">
             <Chart/>
              
              </div>
            </div>
          </div>
          </div>
    
  )
}

export default ServiceProviderDashboard