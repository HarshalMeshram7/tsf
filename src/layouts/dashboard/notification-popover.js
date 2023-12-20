import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
export const NotificationPopover = (props) => {
  const { anchorEl, onClose, open,pendingProperties } = props;
  const router = useRouter();
  const auth = useAuth();



  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 250, overflow: "auto", maxHeight: 300 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
         {pendingProperties && pendingProperties.map((property,key)=>(
          <>
          <ListItem   
          style={{cursor:'pointer'}}               
           onClick={()=>{
             router.push(`/properties/${property.id}`)
             onClose()
          }}
          key={key} alignItems="flex-start">
            {/* <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar> */}
            <ListItemText
              primary={property?.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Posted by :
                  </Typography>
                  username
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
         </>
         )) }
        </List>

        {/* <Typography variant="overline">
          Notification
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {auth?.user?.name}
        </Typography> */}
      </Box>
      {/* <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList> */}
    </Popover>
  );
};

NotificationPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
