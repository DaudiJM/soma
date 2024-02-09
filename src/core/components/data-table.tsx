import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid/models";
import { TSelected } from "../../utils/schema";
import Empty from "./Empty";
import { ChangeEvent } from "react";

type Props <T> = {
    columns: GridColDef[];
    rows: T[];
    records: number;
    model: GridPaginationModel;
    loading?: boolean;
    enableSelection?: boolean;
    onPagechange: (model: GridPaginationModel) => void;
    onSelectionChange?: (selected: TSelected) => void;
}

const getPages = (records: number, model: GridPaginationModel) => {
    return Math.ceil(records/model.pageSize);
}

const DataTable = <T extends object > (props: Props<T>) => {
    const { columns, rows, model, records, onPagechange, loading = false, onSelectionChange, enableSelection = false } = props;

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        onPagechange({page: (page - 1), pageSize: model.pageSize});
    }
    
    return(
        <Box>
            {rows?.length > 0 ? <Box sx={{width: "100%"}}>
                <DataGrid 
                    autoHeight
                    columns={columns}
                    rows={rows}
                    rowCount={records}
                    loading={loading}
                    pageSizeOptions={[5, 10, 15]}
                    disableRowSelectionOnClick
                    checkboxSelection={enableSelection}
                    paginationMode="server"
                    sx={{ px:2, my:2 }}
                    initialState={{
                        pagination: { paginationModel: model },
                    }}
                    onPaginationModelChange={(model, callback) => onPagechange(model)}
                    onRowSelectionModelChange={(model) => {
                        onSelectionChange?.(model as TSelected);
                    }}
                />
                <Pagination 
                    color="primary" 
                    count={getPages(records, model)} 
                    onChange={handlePageChange}/>
            </Box> : 
            <Empty />}
        </Box>
    )
}

export default DataTable;