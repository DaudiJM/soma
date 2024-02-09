import CCard from "core/components/Cards";
import Details from "core/components/Details";
import { CustomTable } from "core/components/Tables";
import { TablecellInterface } from "core/components/component-interfaces";
import { useAuth } from "core/hooks/custom-hooks";


const UserInformation = () => {
    const { user } = useAuth();
    return(
        <CCard 
            title="User Information"
            hideBackButton
        >
            <Details 
                data={user}
            />
        </CCard>
    )
}

export default UserInformation;