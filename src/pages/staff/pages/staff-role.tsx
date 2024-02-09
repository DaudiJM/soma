import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CCard from "core/components/Cards";
import Staff, { StaffRole } from "pages/staff/schema";
import { useState } from "react";
import useStaffService from "../staff-service";
import FormGroup from "@mui/material/FormGroup";
import { StaffRoles } from "utils/enums";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";


const StaffRolePage = ({data}: {data:Staff}) => {
    const [staff, setStaff] = useState<Staff>(data);
    const { loading, assignRoles } = useStaffService();
    const [staffRoles, setRoles] = useState<String[]>([]);

    const handleRoleAssignment = async () => {
        const data:StaffRole = {id: staff?.id, roles: staffRoles};
        const response = await assignRoles(data);
        if(response.header.responseCode === "0"){
            setRoles(response.body.data.roles);
        }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(staffRoles);
        const role = e.target.name;
        let roles:String[] = staffRoles;

        if(staffRoles.includes(role)){
            roles = staffRoles.filter((element, index, staffRoles) => element !== role);
        } else {
            roles = [...staffRoles, role];
        }
        
        setRoles(roles);
        console.log(roles);
    }

    return(
        <Box>
            <CCard 
                title="Role Assignment"
                children={
                    <Box>
                        <Typography>Assign Roles to <span><b>{ staff.firstName } {staff.middleName} {staff.lastName}</b></span></Typography>
                        <FormGroup>
                            { StaffRoles.map(role => <FormControlLabel 
                                control={<Checkbox checked={staffRoles?.includes(role)}name={role} onChange={handleChange}/>} 
                                label={role} key={role}/>)}
                        </FormGroup>
                        <LoadingButton
                            variant="contained"
                            loading={loading}
                            onClick={handleRoleAssignment}
                            sx={{mt:3}}
                        >
                            Assign Roles
                        </LoadingButton>
                    </Box>
                }
            />
        </Box>
    )
}

export default StaffRolePage;