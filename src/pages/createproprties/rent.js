import React from 'react'
import AddPropertyDialog from 'src/sections/properties/add-property-form-rent';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Rent = () => {
  return (
    <AddPropertyDialog/>
    )
}
Rent.getLayout = (Rent) => (
  <DashboardLayout>
    {Rent}
  </DashboardLayout>
);
export default Rent