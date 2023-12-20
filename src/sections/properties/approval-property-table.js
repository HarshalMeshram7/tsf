import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'next/navigation'


export const PropertiesTableApproval = (props) => {
  const router = useRouter()

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>
                  Name
                </TableCell>
                <TableCell>

                Property Type
                </TableCell>
                <TableCell>
                Building Type
                </TableCell>
                <TableCell>
                City
                </TableCell>
                <TableCell>
                Property Status
                </TableCell>
               
                <TableCell>
                Posted At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.filter((res)=>res.property_status == "Pending").map((property) => {
                const isSelected = selected.includes(property.id);
                // const createdAt = format(property.created_at, 'dd/MM/yyyy');
             
                return (
                  <TableRow
                    hover
                    key={property.id}
                    selected={isSelected}
                  onClick={()=>router.push(`/properties/${property.id}`)
                }
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(property.id);
                          } else {
                            onDeselectOne?.(property.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        {/* <Avatar src={property.image}>
                          {getInitials(property.name)}
                        </Avatar> */}
                        <Typography variant="subtitle2">
                          {property.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {property.property_type}
                    </TableCell>
                    <TableCell>
                      {property.building_type}
                    </TableCell>
                    <TableCell>
                      {property.city}
                    </TableCell>
                   
                    <TableCell>
                      {property.property_status}
                    </TableCell>
                    <TableCell>
                      {property.created_at}
                    </TableCell>
                    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PropertiesTableApproval.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
