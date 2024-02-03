import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";

// Constructor of each data
function createData(pid, name, date, price) {
    return {
        pid,
        name,
        date,
        price,
    };
}

// Hard coded data here, rows need to be replaced by data passed in from backend
// Need to pass in the product id as key, product name, added date, and price
const rows = [
    createData(1, 'Toronto', "2022/01/09", 3.7),
    createData(2, 'Ottawa', "2022/09/29", 25.0),
    createData(3, 'Montreal', "2022/06/30", 16.0),
    createData(4, 'British Columbia', "2022/02/18", 6.0),
    createData(5, 'Alberta', "2022/10/29", 18.0),
    createData(6, 'Toronto', "2022/01/19", 3.7),
    createData(7, 'Ottawa', "2022/09/19", 25.0),
    createData(8, 'Montreal', "2022/01/30", 16.0),
    createData(9, 'British Columbia', "2022/01/18", 6.0),
    createData(10, 'Alberta', "2022/11/29", 18.0),
    createData(11, 'Toronto', "2022/11/09", 3.7),
    createData(12, 'Ottawa', "2022/10/29", 25.0),
    createData(13, 'Montreal', "2021/06/30", 16.0),
    createData(14, 'British Columbia', "2012/02/18", 6.0),
    createData(15, 'Alberta', "2022/10/21", 18.0),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// Header of the tables
const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Product',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Viewed Date (Year/Month/Date)',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price ($)',
    },
];

// Table header rendered here
function Header(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            style={{fontWeight: 'bolder', fontSize: '17px'}}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

Header.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    const { totalItem } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="h6"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    HISTORY
                </Typography>
            )}

            {/* Delete icon showed up if products are selected */}
            {numSelected > 0 ? (
                /* When deleted is clicked, remove the selected from the history record on the backend */
                <Tooltip title="Remove history">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function HistoryData(){
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    // selected contains pids that need to be removed from wishlist / add to cart
    const [selected, setSelected] = React.useState([]);
    // Pagination functions variables & declaration
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.pid);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, pid) => {
        const selectedIndex = selected.indexOf(pid);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, pid);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    // Pagination functions
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(event.target.count);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (pid) => selected.indexOf(pid) !== -1;

    return (
        <Box sx={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
            <Paper sx={{ width: '100%', mb: 2, backgroundColor: '#ffffff' }} elevation={0} >
                <EnhancedTableToolbar numSelected={selected.length} totalItem={rows.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 600 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <Header
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                /*Slice the page by the pagination and page number*/
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.pid);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick=
                                                {(event) => handleClick(event, row.pid)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.pid}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.date}</TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}