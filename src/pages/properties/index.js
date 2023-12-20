import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Tab, Tabs, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { applyPagination } from "src/utils/apply-pagination";
import { PropertiesSearch } from "src/sections/properties/properties-search";
import { PropertiesTable } from "src/sections/properties/properties-table";
import { getPropertyList } from "src/service/propertyRequests";
import { PropertiesTableActive } from "src/sections/properties/active-property-table";
import { PropertiesTableApproval } from "src/sections/properties/approval-property-table";
import { PropertiesTableReject } from "src/sections/properties/reject-property-table";
import { PropertiesTableInactive } from "src/sections/properties/inactive-property-table";

const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",
    address: {
      city: "Cleveland",
      country: "USA",
      state: "Ohio",
      street: "2849 Fulton Street",
    },
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    created_at: subDays(subHours(now, 7), 1).getTime(),
    email: "carson.darrin@devias.io",
    name: "Carson Darrin",
    phone: "304-428-3097",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    address: {
      city: "Atlanta",
      country: "USA",
      state: "Georgia",
      street: "1865  Pleasant Hill Road",
    },
    avatar: "/assets/avatars/avatar-fran-perez.png",
    created_at: subDays(subHours(now, 1), 2).getTime(),
    email: "fran.perez@devias.io",
    name: "Fran Perez",
    phone: "712-351-5711",
  },
  {
    id: "5e887b7602bdbc4dbb234b27",
    address: {
      city: "North Canton",
      country: "USA",
      state: "Ohio",
      street: "4894  Lakeland Park Drive",
    },
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    created_at: subDays(subHours(now, 4), 2).getTime(),
    email: "jie.yan.song@devias.io",
    name: "Jie Yan Song",
    phone: "770-635-2682",
  },
  {
    id: "5e86809283e28b96d2d38537",
    address: {
      city: "Madrid",
      country: "Spain",
      name: "Anika Visser",
      street: "4158  Hedge Street",
    },
    avatar: "/assets/avatars/avatar-anika-visser.png",
    created_at: subDays(subHours(now, 11), 2).getTime(),
    email: "anika.visser@devias.io",
    name: "Anika Visser",
    phone: "908-691-3242",
  },
  {
    id: "5e86805e2bafd54f66cc95c3",
    address: {
      city: "San Diego",
      country: "USA",
      state: "California",
      street: "75247",
    },
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    created_at: subDays(subHours(now, 7), 3).getTime(),
    email: "miron.vitold@devias.io",
    name: "Miron Vitold",
    phone: "972-333-4106",
  },
  {
    id: "5e887a1fbefd7938eea9c981",
    address: {
      city: "Berkeley",
      country: "USA",
      state: "California",
      street: "317 Angus Road",
    },
    avatar: "/assets/avatars/avatar-penjani-inyene.png",
    created_at: subDays(subHours(now, 5), 4).getTime(),
    email: "penjani.inyene@devias.io",
    name: "Penjani Inyene",
    phone: "858-602-3409",
  },
  {
    id: "5e887d0b3d090c1b8f162003",
    address: {
      city: "Carson City",
      country: "USA",
      state: "Nevada",
      street: "2188  Armbrester Drive",
    },
    avatar: "/assets/avatars/avatar-omar-darboe.png",
    created_at: subDays(subHours(now, 15), 4).getTime(),
    email: "omar.darobe@devias.io",
    name: "Omar Darobe",
    phone: "415-907-2647",
  },
  {
    id: "5e88792be2d4cfb4bf0971d9",
    address: {
      city: "Los Angeles",
      country: "USA",
      state: "California",
      street: "1798  Hickory Ridge Drive",
    },
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    created_at: subDays(subHours(now, 2), 5).getTime(),
    email: "siegbert.gottfried@devias.io",
    name: "Siegbert Gottfried",
    phone: "702-661-1654",
  },
  {
    id: "5e8877da9a65442b11551975",
    address: {
      city: "Murray",
      country: "USA",
      state: "Utah",
      street: "3934  Wildrose Lane",
    },
    avatar: "/assets/avatars/avatar-iulia-albu.png",
    created_at: subDays(subHours(now, 8), 6).getTime(),
    email: "iulia.albu@devias.io",
    name: "Iulia Albu",
    phone: "313-812-8947",
  },
  {
    id: "5e8680e60cba5019c5ca6fda",
    address: {
      city: "Salt Lake City",
      country: "USA",
      state: "Utah",
      street: "368 Lamberts Branch Road",
    },
    avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
    created_at: subDays(subHours(now, 1), 9).getTime(),
    email: "nasimiyu.danai@devias.io",
    name: "Nasimiyu Danai",
    phone: "801-301-7894",
  },
];

const Page = () => {
  const useProperties = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(propertiesAPIdata, page, rowsPerPage);
    }, [page, rowsPerPage, propertiesAPIdata]);
  };

  const usePropertyIds = (properties) => {
    return useMemo(() => {
      return properties.map((property) => property.id);
    }, [properties]);
  };
  const [propertiesAPIdata, setPropertiesAPIdata] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const properties = useProperties(page, rowsPerPage);
  const propertiesIds = usePropertyIds(properties);
  const propertiesSelection = useSelection(propertiesIds);
  const [filteredData, setFilteredData] = useState(propertiesAPIdata);

  const [openAddPropertyDialogue, setOpenAddPropertyDialogue] = useState(false);

  const handleClickOpen = () => {
    setOpenAddPropertyDialogue(true);
  };

  const handleClose = () => {
    setOpenAddPropertyDialogue(false);
  };

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const getPropertiesData = () => {
    getPropertyList().then((res) => {
      console.log(res, "ffffffffffffffffffffffffffffffffffffff");
      setPropertiesAPIdata(res);
    });
  };
  useEffect(() => {
    getPropertiesData();
  }, []);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function BasicTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Pending Approval" {...a11yProps(1)} />
            <Tab label="Active" {...a11yProps(2)} />
            <Tab label="Rejected" {...a11yProps(3)} />
            <Tab label="Inactive  / Expired " {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PropertiesTable
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <PropertiesTableApproval
            count={properties.length}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <PropertiesTableActive
            count={properties.length}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <PropertiesTableReject
            count={properties.length}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <PropertiesTableInactive
            count={properties.length}
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
        </CustomTabPanel>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Properties | True Square Feet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Properties</Typography>
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
                {/* <Button
                  onClick={handleClickOpen}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add Property
                </Button> */}
              </div>
            </Stack>
            {/* <PropertiesSearch /> */}
            <BasicTabs />

            {/* <PropertiesTable 
              count={data.length}
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
            />*/}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
