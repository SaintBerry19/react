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
import { deleteProductos } from "../../globalFunctions/globalFunctions";
import { v4 as uuid } from "uuid";

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

export default function Carrito(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return props.carrito.products.length !== 0 ? (
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
                    key={column.id + uuid()}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.carrito.products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((producto) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={producto.brand + producto.title + uuid()}
                    >
                      {columns.map((column) => {
                        const value = producto[column.id];
                        return (
                          <TableCell
                            key={column.id + uuid()}
                            align={column.align}
                          >
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
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => {
                                    deleteProductos(producto, props.user).then(
                                      (value) => {
                                        props.setRemove(!props.remove)
                                        props.setCarrito(value);
                                      }
                                    );
                                  }}
                                >
                                  Delete from Cart
                                </Button>
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
          count={props.carrito.products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  ) : (
    <div>
      <br></br>
      <br></br>
      <h2>No hay productos en tu carrito!</h2>
    </div>
  );
}
