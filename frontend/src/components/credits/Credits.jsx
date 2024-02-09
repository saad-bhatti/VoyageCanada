import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CreditsData from "./credits.data.js";
import Stack from "@mui/material/Stack";

/** Customized table components. */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/** Customized table row component. */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * CustomizedTables component.
 * @returns {React.ReactNode} CustomizedTables component.
 */
function Credits() {
  return (
    <Stack id="CreditsPanel" spacing={2}>
      {/* Credits note. */}
      <Typography variant="subtitle1" gutterBottom>
        Thank you to the following sources for their inspiration:
      </Typography>

      {/* Table of credits. */}
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          {/* Table headers. */}
          <TableHead>
            <TableRow id={`credits-header`}>
              <StyledTableCell sx={{ fontWeight: "bold" }}>Source</StyledTableCell>
              <StyledTableCell align="justify" sx={{ fontWeight: "bold" }}>
                Use
              </StyledTableCell>
            </TableRow>
          </TableHead>

          {/* Table body. */}
          <TableBody>
            {CreditsData.map((credit, index) => (
              <StyledTableRow key={index} id={`credits-body-${index}`}>
                <StyledTableCell component="th" scope="row">
                  {credit.source}
                </StyledTableCell>
                <StyledTableCell align="justify">{credit.use}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default Credits;
