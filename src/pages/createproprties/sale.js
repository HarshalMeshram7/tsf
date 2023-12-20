import React from 'react'
import AddPropertyDialogForSale from 'src/sections/properties/add-property-form-sale';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Sale = () => {
  return (
    <AddPropertyDialogForSale/>
    )
}
Sale.getLayout = (Sale) => (
  <DashboardLayout>
    {Sale}
  </DashboardLayout>
);
export default Sale