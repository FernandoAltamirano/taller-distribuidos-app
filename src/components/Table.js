import { useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  LastPageOutlined,
  FirstPageOutlined,
} from "@mui/icons-material";
import isEmpty from "is-empty";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === "rtl" ? (
          <LastPageOutlined />
        ) : (
          <FirstPageOutlined />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === "rtl" ? (
          <FirstPageOutlined />
        ) : (
          <LastPageOutlined />
        )}
      </IconButton>
    </Box>
  );
}

export const TableComponent = (props) => {
  const { data, slots, actionRow } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
        <TableBody>
          <TableRow className='table-headers'>
            {slots?.map((item) => {
              return (
                <TableCell key={item.title} style={{ width: 160 }} align='left'>
                  {item.title}
                </TableCell>
              );
            })}
          </TableRow>
          {data?.length < 1 ? (
            <></>
          ) : (
            (rowsPerPage > 0 && !isEmpty(data)
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => {
              return (
                <TableRow
                  key={row.id}
                  className={!isEmpty(actionRow) ? "table-row" : ""}
                  onClick={() => actionRow(row)}
                >
                  {slots.map((slot) => {
                    return (
                      <TableCell
                        key={Math.random()}
                        style={{ width: 160 }}
                        align='left'
                      >
                        {!isEmpty(slot.cell) ? slot.cell(row) : row[slot.tag]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "Registros por página",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
