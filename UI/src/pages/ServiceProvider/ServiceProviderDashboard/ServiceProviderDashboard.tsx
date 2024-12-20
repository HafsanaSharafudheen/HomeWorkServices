import ServiceHeading from "./ServiceHeader"
import ServiceNavbar from "../ServiceNavbar"
import ServiceSidebar from "../serviceSidebar"

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
                {/* Add chart components here */}
                <div className="chart bg-light p-5 border">Chart 1</div>
                <div className="chart bg-light p-5 border mt-3">Chart 2</div>
              </div>
            </div>
          </div>
          </div>
    
  )
}

export default ServiceProviderDashboard