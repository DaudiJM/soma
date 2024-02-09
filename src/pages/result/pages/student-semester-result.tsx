import Box from "@mui/material/Box";
import { StudentModuleResult, StudentSemesterResult } from "../schema";
import DataTable from "core/components/data-table";
import Chip from "@mui/material/Chip";
import { GridColDef } from "@mui/x-data-grid/models";
import { color } from "utils/schema";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const StudentSemesterResultsTable = ({ results }:{results: StudentSemesterResult} ) => {

    const columns: GridColDef[] = [
        {
            field: 'index',
            headerName: 'S/N',
            maxWidth: 80,
            minWidth: 50,
            flex: 1,
            renderCell: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1
        },
        {
            field: 'moduleTitle',
            headerName: 'ModuleTitle',
            minWidth: 150,
            flex: 1,
            editable: false,
        },
        {
            field: 'moduleCode',
            headerName: 'moduleCode',
            minWidth: 150,
            flex: 1,
            editable: false,
        },
        {
            field: 'grade',
            headerName: 'Grade',
            minWidth: 150,
            flex: 1,
            editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          minWidth: 150,
          flex: 1,
          renderCell: (params) => {
            let color:color = 'info';
      
            switch(params.row.status){
              case "PASS":
                color = 'success';
                break;
              case "IN ACTIVE":
                color = 'warning';
                break;
              case "FAILED":
                color = 'error';
                break;
              default:
                color = 'primary';
            }
      
            return(<Chip label={params.row.status} color={color}/>)
          }
        },
    ];
    
    return(
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Stack spacing={3}>
                        <Typography variant="body1">Status</Typography>
                        <Typography variant="body1">GPA</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={3}>
                        <Typography variant="h6">{ results?.status }</Typography>
                        <Typography variant="h6">{ results?.semesterGpa ?? 0 }</Typography>
                    </Stack>
                </Grid>
            </Grid>
            <DataTable
                columns={columns}
                rows={results?.results as StudentModuleResult[]}
                onPagechange={() => {}}
                model={{page: 0, pageSize: results?.results?.length ?? 0}}
                records={results?.results?.length ?? 0}
            />
        </Box>
    )
}

export default StudentSemesterResultsTable;