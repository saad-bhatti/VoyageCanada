import React from "react"
import PropTypes from "prop-types";
import TableRow from "@mui/material/TableRow";
import {Collapse, InputAdornment, TableCell, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from '@mui/icons-material/Search';
import {addToCart, getCart} from "../api";

function createCart(productId, name, date, price) {
    return {
        productId,
        name,
        date,
        price,
    };
}

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);

    const handleAddCart = () => {
        addToCart(row.flightId).then((data) => {
            console.log(data);
            getCart().then((data) => {
                let rows = [];
                if(!(data.data.getCart===null)) {
                    rows = data.data.getCart.map(f => {
                        return createCart(f._id, f.departLoc + "->" + f.arrLoc, f.departTime, f.price);
                    });
                }
                props.findC(rows);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.Departure}
                </TableCell>
                <TableCell>{row.Arrival}</TableCell>
                <TableCell align="right">{row.a}</TableCell>
                <TableCell align="right">{row.NumSeats}</TableCell>
                <TableCell align="right">{row.Price}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Departure Time</TableCell>
                                        <TableCell align="right">Arrival Time</TableCell>
                                        <TableCell align="right">
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.detail.map((detailRow) => (
                                        <TableRow key={row.flightId}>
                                            <TableCell component="th" scope="row" align="right">
                                                {detailRow.DepartureTime}
                                            </TableCell>
                                            <TableCell align="right">{detailRow.ArrivalTime}</TableCell>
                                            <TableCell align="right">
                                                <Button onClick={handleAddCart}>Add to Cart</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        Price: PropTypes.number.isRequired,
        NumSeats: PropTypes.number.isRequired,
        a: PropTypes.string.isRequired,
        detail: PropTypes.arrayOf(
            PropTypes.shape({
                ArrivalTime: PropTypes.string.isRequired,
                DepartureTime: PropTypes.string.isRequired,
            }),
        ).isRequired,
        Departure: PropTypes.string.isRequired,
        Arrival: PropTypes.string.isRequired,
        flightId: PropTypes.string.isRequired,
    }).isRequired,
};

export default function Flight(props) {

    /*    const rows = [
            createData(1, 'Toronto', 'Montreal', true, 24, 259.98, "2022/06/06 16:00", "2022/06/06 19:00"),
            createData(2, 'Toronto', 'Ottawa', false, 37, 369.98, "2022/05/06 16:00", "2022/06/06 19:00"),
            createData(3, 'Montreal', 'Toronto', true, 24, 102.98, "2022/06/12 16:00", "2022/06/06 19:00"),
            createData(4, 'Ottawa', 'Vancouver', true, 67, 457.98, "2022/06/30 16:00", "2022/06/06 20:00"),
            createData(5, 'Vancouver', 'Ottawa', true, 49, 300.98, "2022/06/03 16:00", "2022/06/06 22:00"),
        ];*/


    const rows = props.flights;

    const [result, setResult] = React.useState(props.flights);

    // Pagination functions variables & declaration
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    // Pagination functions
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 15));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        const arrival = event.target.value;
        setResult(rows.filter(r => r.Arrival.toLowerCase().includes(arrival.toLowerCase())));
    };

    return (
        <Box>
            <TextField
                id="SearchBar"
                label="Search For Destination"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                onChange={handleSearchChange}
                sx={{marginTop: '5%', width: '94%', marginLeft: '3%'}}
            />
            <Box sx={{width: '94%', marginTop: '2%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2%'}}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell><Typography variant='h6'>Departure</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Arrival</Typography></TableCell>
                                <TableCell align="right"><Typography variant='h6'>Interprovince</Typography></TableCell>
                                <TableCell align="right"><Typography variant='h6'>Number of
                                    Seats</Typography></TableCell>
                                <TableCell align="right"><Typography variant='h6'>Price($)</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((result) => (
                                <Row key={result.flightId} row={result} findC={props.findC}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[15]}
                    component="div"
                    count={result.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}