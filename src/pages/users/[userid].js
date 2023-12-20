import React, { useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PropertyDetailsForm from "src/sections/properties/property-details-form";
import { useRouter } from 'next/router'

const Propertydetails = () => {

  const router = useRouter()
  const { propertyid } = router.query


  return <PropertyDetailsForm propertyid={propertyid} />;
};

Propertydetails.getLayout = (Propertydetails) => (
  <DashboardLayout>{Propertydetails}</DashboardLayout>
);

export default Propertydetails;
