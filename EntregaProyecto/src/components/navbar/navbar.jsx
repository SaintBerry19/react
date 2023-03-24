import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "./navbar.css";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { v4 as uuid } from "uuid";

const pages = ["Productos", "Usuarios", "Ordenes"];

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to={`/`}>
            <Tooltip title="Obersva la galeria">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                moba Studio
              </Typography>
            </Tooltip>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              key={uuid()}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) =>
                page === "Productos" ? (
                  <Link key={uuid()} to={`/productos`}>
                    <Tooltip key={uuid()} title="Productos Registrados">
                      <MenuItem
                        key={page + uuid()}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    </Tooltip>
                  </Link>
                ) : page === "Usuarios" ? (
                  <Link key={uuid()} to={`/users`}>
                    <Tooltip key={uuid()} title="Usuarios Registrados">
                      <MenuItem
                        key={page + uuid()}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    </Tooltip>
                  </Link>
                ) : (
                  <Link key={uuid()} to={`/orders`}>
                    <Tooltip key={uuid()} title="Ordenes Del Usuario">
                      <MenuItem
                        key={page + uuid()}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    </Tooltip>
                  </Link>
                )
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Tooltip title="Obersva la galeria">
            <Link to={`/`}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  alignContent: "center",
                }}
              >
                moba Studio
              </Typography>
            </Link>
          </Tooltip>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              page === "Productos" ? (
                <Link key={uuid()} to={`/productos`}>
                  <Tooltip key={uuid()} title="Productos Registrados">
                    <Button
                      key={page + uuid()}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  </Tooltip>
                </Link>
              ) : page === "Usuarios"?(
                <Link key={uuid()} to={`/users`}>
                  <Tooltip key={uuid()} title="Usuarios Registrados">
                    <Button
                      key={page + uuid()}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  </Tooltip>
                </Link>
              ):(                <Link key={uuid()} to={`/orders`}>
              <Tooltip key={uuid()} title="Ordenes Del Usuario">
                <Button
                  key={page + uuid()}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Tooltip>
            </Link>)
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link to={`/carrito`}>
              <MenuItem key={uuid()}>
                <IconButton
                  size="large"
                  aria-label="show 7 products"
                  color="inherit"
                >
                  <Badge badgeContent={props.contador} color="error">
                    <AddShoppingCartIcon />
                  </Badge>
                </IconButton>
              </MenuItem>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link to={`/profile`}>
              <Tooltip title="Visita tu perfil!">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src=" /2.jpg" />
                </IconButton>
              </Tooltip>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
