import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { applyPagination } from 'src/utils/apply-pagination';
import { PropertiesSearch } from 'src/sections/properties/properties-search';
import { PropertiesTable } from 'src/sections/properties/properties-table';
import { getPropertyList } from 'src/service/propertyRequests';
import { UsersTable } from 'src/sections/users/usersTable';
import { getUserList } from 'src/service/userRequests';
import SimpleDialog from './createuser';

const now = new Date();






const Page = () => {

  const useProperties = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(propertiesAPIdata, page, rowsPerPage);
      },
      [page, rowsPerPage,propertiesAPIdata]
    );
  };
  
  const usePropertyIds = (properties) => {
    return useMemo(
      () => {
        return properties.map((property) => property.id);
      },
      [properties]
    );
  };
  const [propertiesAPIdata, setPropertiesAPIdata] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const properties = useProperties(page, rowsPerPage);
  const propertiesIds = usePropertyIds(properties);
  const propertiesSelection = useSelection(propertiesIds);


  const [openAddPropertyDialogue, setOpenAddPropertyDialogue] = useState(false);
  
 

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const getUserLists = () =>{
    getUserList().then((res)=>{
      setPropertiesAPIdata(res)
    })
  }
  useEffect(()=>{
    getUserLists()
  },[])

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Head>
        <title>
          Properties | True Square Feet
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Users
                </Typography>
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                <Button
                  onClick={handleClickOpen}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add Users
                </Button>
              </div>
            </Stack>
            {/* <PropertiesSearch /> */}
            <UsersTable
              count={propertiesAPIdata.length}
              items={properties}
              onDeselectAll={propertiesSelection.handleDeselectAll}
              onDeselectOne={propertiesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={propertiesSelection.handleSelectAll}
              onSelectOne={propertiesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={propertiesSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
      <div>
      
      <SimpleDialog
         
        open={open}
        onClose={handleClose}
      />
    </div>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
