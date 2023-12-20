import React, { useEffect, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PropertyDetailsForm from "src/sections/properties/property-details-form";
import { useRouter } from 'next/router'

const Propertydetails = () => {

  const router = useRouter()
  const { propertyid } = router.query

  const [propertyidstate ,setPropertyidstate] = useState(propertyid)

  useEffect(()=>{
    setPropertyidstate(propertyid)
  },[propertyid])

  return <PropertyDetailsForm propertyid={propertyidstate} />;
};

Propertydetails.getLayout = (Propertydetails) => (
  <DashboardLayout>{Propertydetails}</DashboardLayout>
);

export default Propertydetails;
