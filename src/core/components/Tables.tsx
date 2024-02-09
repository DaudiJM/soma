import { CustomTableInterface, DataTableInterface } from "./component-interfaces"
import { DataGrid } from "@mui/x-data-grid"
import Box from "@mui/material/Box"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import Pagination from '@mui/material/Pagination';
import Empty from "./Empty"
import { CellProp } from "./Details"

type CustomTableProps = {
    cells: CellProp[];
}

export const CustomTable= (props: CustomTableProps) => {
    const { cells } = props;

    return(
        <TableContainer>
            <Table
                aria-label="team progress table"
                size="small"
                sx={{
                  "& td, & th": {
                    border: 0,
                  },
                }}
            >
                {/* <TableHead>
                    <TableRow>
                        {columns.map((column, index) => <TableCell key={index}>{ column.charAt(0).toUpperCase().concat(column.slice(1).toLocaleLowerCase()) }</TableCell>)}
                    </TableRow>
                </TableHead> */}
                <TableBody>
                    {cells.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{ row.property }</TableCell>
                            <TableCell>{ row.value }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export const DataTable:React.FC<DataTableInterface> = ({ columns, rows, paginationModel, records, onPaginationModelChange, loading = false}) => {

    return(
        <Box>
            {rows.length > 0 ? <Box sx={{width: "100%"}}>
                <DataGrid 
                    autoHeight
                    columns={columns}
                    rows={rows}
                    rowCount={records}
                    loading={loading}
                    pageSizeOptions={[5, 10, 15]}
                    disableRowSelectionOnClick
                    paginationMode="server"
                    sx={{ px:2, my:2 }}
                    initialState={{
                        pagination: { paginationModel: paginationModel },
                    }}
                    onPaginationModelChange={(model, callback) => onPaginationModelChange(model)}
                />
                <Pagination count={Math.ceil(records/paginationModel.pageSize)} color="primary" 
                    onChange={(e, i) => onPaginationModelChange({page: i - 1, pageSize: paginationModel.pageSize})}/>
            </Box> : <Empty />}
        </Box>
    )
}
