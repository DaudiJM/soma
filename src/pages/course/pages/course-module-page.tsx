import Box from "@mui/material/Box";
import CCard from "core/components/Cards";
import { useDetails } from "core/hooks/use-page-state";
import useCurriculumService from "pages/carriculum/curriculum-schema";
import { useParams } from "react-router";
import { CourseCarriculum } from "../schema";
import { DETAILS_PAGE_ACTION } from "utils/enums";
import { useEffect, useState } from "react";
import DataTable from "core/components/data-table";
import { GridColDef } from "@mui/x-data-grid";
import Actions from "core/components/Actions";
import Button from "@mui/material/Button";
import useToggle from "core/hooks/use-toggle";
import CourseCurriculumConfigPage from "pages/carriculum/pages/course-curriculum-config-page";
import { TSelected } from "utils/schema";

const CourseModulePage = () => {
    const { id } = useParams();
    const { getCourseCurriculum, loading, setCourseCurriculum } = useCurriculumService();
    const [state, dispatch] = useDetails<CourseCarriculum>();
    const [setCurriculum, toggle] = useToggle();

    const loadData = async () => {
        const response = await getCourseCurriculum(id ?? 0);
        if(response.header.responseCode === "0"){
            dispatch({action: DETAILS_PAGE_ACTION.SET_DATA, payload: response.body.data});
        }
    }

    const handleActions = () => {};

    const actions = (
        <Box>
            <Button onClick={toggle}>{setCurriculum ? "Close" : "Set Curriculum"}</Button>
        </Box>
    );

    const columns:GridColDef[] = [
        {
            field: 'sn',
            headerName: "SN",
            editable: false,
            width: 70,
            renderCell: (index) => (index.api.getRowIndexRelativeToVisibleRows(index.id) + 1)
        },
        {
            field: 'moduleTitle',
            headerName: "Module Title",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'moduleCode',
            headerName: "Module Code",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: "moduleCategory",
            headerName: "Category",
            editable: false,
            minWidth: 120,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            editable: false,
            minWidth: 150,
            flex: 1,
            renderCell: (params) => 
                <Actions 
                    roles={[]} 
                    params={params}
                    entity="User"
                    actionHandler={handleActions}
                    actions={[
                        // params.row.status !== EntityStatus.ACTIVE && <ActionButton title="Activate User" icon={CheckOutlinedIcon} onClick={() => handleActions(Action.Activate, params)}/>
                    ]}
                />
        }
    ];

    useEffect(() => {
        loadData();
    }, []);
    
    return(
        <Box>
            <CCard 
                title={setCurriculum ? "Set Curriculum" : "Course Modules"}
                actions={actions}
                children={
                    setCurriculum ? <CourseCurriculumConfigPage id={id ?? 0}/> : <DataTable 
                        rows={state.data.modules}
                        columns={columns}
                        records={state.data.modules?.length ?? 0}
                        model={{page: 0, pageSize: state.data.modules?.length ?? 0}}
                        loading={loading}
                        onPagechange={() => {}}
                    />
                }
            />
        </Box>
    )
};

export default CourseModulePage;