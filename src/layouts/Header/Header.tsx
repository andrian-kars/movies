import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";
import logo from "@/assets/images/logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { headerData } from "./headerData";
import { INITIAL_PAGE_PATH } from "@/constants";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openedMenu, setOpenedMenu] = useState<null | string>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
    setOpenedMenu(e.currentTarget.id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenedMenu(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          component={Link}
          to={INITIAL_PAGE_PATH}
          display="flex"
          alignItems="center"
        >
          <Box
            sx={{
              width: {
                xs: 75,
                sm: 150,
              },
              mr: {
                xs: 0.5,
                sm: 2,
              },
            }}
            component="img"
            src={logo}
            alt="logo"
          />
        </Box>
        <Stack
          direction="row"
          spacing={{
            xs: 0.5,
            sm: 2,
          }}
        >
          {headerData.map(({ id, name }) => {
            const idButton = `${id}-button`;
            const idMenu = `${id}-menu`;

            return (
              <Button
                key={idButton}
                color="inherit"
                id={idButton}
                onClick={handleMenuOpen}
                aria-controls={openedMenu === idButton ? idMenu : undefined}
                aria-haspopup="true"
                aria-expanded={openedMenu === idButton ? "true" : undefined}
                sx={{
                  fontSize: {
                    xs: 10,
                    sm: 14,
                  },
                }}
              >
                {name}
              </Button>
            );
          })}
        </Stack>
        {headerData.map(({ id, menuItems }) => {
          const idButton = `${id}-button`;
          const idMenu = `${id}-menu`;

          return (
            <Menu
              key={idMenu}
              id={idMenu}
              anchorEl={anchorEl}
              open={openedMenu === idButton}
              MenuListProps={{
                "aria-labelledby": idButton,
              }}
              onClose={handleMenuClose}
            >
              {menuItems.map(({ name, path }) => (
                <MenuItem
                  key={path}
                  component={Link}
                  onClick={handleMenuClose}
                  to={path}
                >
                  {name}
                </MenuItem>
              ))}
            </Menu>
          );
        })}
      </Toolbar>
    </AppBar>
  );
};