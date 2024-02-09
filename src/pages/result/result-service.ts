import useController from "core/hooks/use-controller";
import { ClassModuleResult, StudentModuleResult, StudentSemesterResult } from "./schema";
import Endpoints from "utils/endpoints";
import { LecturerClasses } from "pages/staff/schema";

const useResultService = () => {
    const { loading, request } = useController();

    const uploadResults = async (data: ClassModuleResult, type: "ca" | "fe") => {
        const url: string = type === "ca" ? Endpoints.results.uploadCa : Endpoints.results.uploadFe;
        return await request<unknown, ClassModuleResult>({
            url: url,
            data: data,
            method: "POST",
        });
    }

    const getClassModuleResult = async (classId: number | string, moduleId: number | string) => {
        
        return await request<unknown, ClassModuleResult>({
            url: `result/programme/${classId}/module/${moduleId}`
        });
    }

    const getClassSemesterResult = async (classId: number) => {
        return await request({
            url: `/result/programme/${classId}/`
        });
    }

    const getStudentSemesterResult = async (registrationNumber: string, year?: number, semester: number = 1) => {
        const url = (year != null || year != undefined) ? `/result/student/${registrationNumber}/year/${year}/${semester}` :
            `/result/student/current/semester/${registrationNumber}`;

        return await request<unknown, StudentSemesterResult>({
            url: url,
        });
    }

    const getStudentYearResult = async (registrationNumber: string, year?: number) => {
        const url = (year != null || year != undefined) ? `/result/student/${registrationNumber}/year/${year}` 
            : `/result/student/current/year/${registrationNumber}`;

        return await request<unknown, StudentSemesterResult[]>({
            url: url
        });
    }

    const getLecturerClasses = async (lecturerId: number) => {

        return await request<unknown, LecturerClasses>({
            url: `/result/programme/list/${lecturerId}`
        })
    }

    return { loading, uploadResults, getClassModuleResult, 
        getClassSemesterResult, getStudentSemesterResult, getStudentYearResult,
        getLecturerClasses 
    }
}

export default useResultService;