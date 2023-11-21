import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import {visuallyHidden} from '@mui/utils';
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send'
import Paypal from "./Paypal";

// Constructor of each data
function createData(productId, name, date, price) {
    return {
        productId,
        name,
        date,
        price,
    };
}

// Hard coded data here
/*
const rows = [
    createData('1', 'Cupcake', "2022/01/09", 3.7),
    createData('2', 'Donut', "2022/09/29", 25.0),
    createData('3', 'Eclair', "2022/06/30", 16.0),
    createData('4', 'Frozen yoghurt', "2022/02/18", 6.0),
    createData('5', 'Gingerbread', "2022/01/07", 16.0),
    createData('6', 'Honeycomb', "2022/01/10", 3.2),
    createData('7', 'Ice cream sandwich', "2022/01/09", 9.0),
    createData('8', 'Jelly Bean', "2022/01/21", 0.0),
    createData('9', 'KitKat', "2022/03/31", 26.0),
    createData('10', 'Lollipop', "2022/02/08", 0.2),
    createData('11', 'Marshmallow', "2022/11/01", 0),
    createData('12', 'Nougat', "2022/12/15", 19.0),
    createData('13', 'Oreo', "2022/10/29", 18.0),
];
*/

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
        label: 'Date (Year/Month/Date)',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price ($)',
    },
];

function findTotal(items) {
    return items.map(({price}) => price).reduce((sum, item) => sum + item, 0);
}

// Table header rendered here
function Header(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
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
    const {numSelected} = props;
    const {totalItem} = props;
    const {itemSelected} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="h6"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {totalItem} Items
                </Typography>
            )}

            {/* Delete icon showed up if products are selected */}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [checkout, setCheckout] = React.useState(false);

    const rows = props.carts;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, productId) => {
        const selectedIndex = selected.indexOf(productId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, productId);
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

    const isSelected = (productId) => selected.indexOf(productId) !== -1;

    const subtotal = findTotal(rows);
    const taxes = 0.13 * subtotal;
    const totalcost = taxes + subtotal;

    return (
        <Box sx={{width: '75%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Paper sx={{width: '100%', mb: 2, backgroundColor: '#ffffff'}} elevation={0}>
                <EnhancedTableToolbar numSelected={selected.length} totalItem={rows.length} itemSelected={selected}/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 600}}
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
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.productId);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick=
                                                {(event) => handleClick(event, row.productId)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.productId}
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
                            <TableRow>
                                <TableCell rowSpan={3}/>
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell align='right'>{subtotal.toFixed(2)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tax</TableCell>
                                <TableCell align="right">{`${(0.13 * 100).toFixed(0)} %`}</TableCell>
                                <TableCell align="right">{taxes.toFixed(2)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align="right">{totalcost.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    checkout ? (<Paypal cost={totalcost.toFixed(2)}/>) : (
                        <Button variant="contained" color="secondary" sx={{
                            width: 'fit-content', marginLeft: '88%',
                            marginTop: '3%', marginBottom: '5%'
                        }} endIcon={<SendIcon/>}
                                onClick={() => {
                                    setCheckout(true);
                                }}>CHECKOUT</Button>
                    )
                }
            </Paper>
        </Box>
    );
}