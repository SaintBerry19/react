import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import "./table.css";
import { Link, NavLink } from "react-router-dom";
import { saveProductos } from "../../globalFunctions/globalFunctions";

const columns = [
  { id: "title", label: "Name", minWidth: 170 },
  { id: "brand", label: "Brand", minWidth: 100 },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
    align: "center",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "thumbnail",
    label: "Image",
    minWidth: 170,
    align: "center",
  },
  {
    id: "buttons",
    label: "Agregar a Carrito",
    minWidth: 170,
    align: "center",
  },
];

export default function Productos(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChange = (event) => {
    props.setCantidad(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <div className="tablaProductos">
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  MOBA STUDIO Productos
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.productos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((producto) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={producto.brand + producto.title}
                    >
                      {columns.map((column) => {
                        const value = producto[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : column.id === "thumbnail" ? (
                              <NavLink to={`/productos/${producto.id}`}>
                                <img
                                  className="logo2"
                                  src={producto[column.id]}
                                  alt="MOBA logo"
                                />
                              </NavLink>
                            ) : column.id === "buttons" ? (
                              <div className="tablecss">
                                <form>
                                <label htmlFor="quantity">Cantidad: </label>
                                  <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    max='99'
                                    onChange={handleChange}
                                  />
                                  <br></br>
                                  <br></br>
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                      saveProductos(producto, props.user,props.cantidad).then(
                                        (value) => {
                                          props.setAdd(!props.add);
                                          props.setCarrito(value);
                                        }
                                      );
                                    }}
                                  >
                                    Add to Cart
                                  </Button>
                                </form>
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.productos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
