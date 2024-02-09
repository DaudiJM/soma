import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { CustomTable } from "./Tables";
import { capitalize, extractKey, shouldAllow } from "utils/Utils";

export type CellProp = {
    property: string;
    value: string;
}

type Props = {
    data: object;
}

const Details = ({data}: Props) => {
    const values = Object.values(data);
    const [tables, setTables] = useState<CellProp[][]>([]);

    const filterKeys = (cells: CellProp[], key: string, index: number) => {
        let label = extractKey(key);
        if(!shouldAllow(label, ["id", "password", "attachment"])){
            if(label === "msisdn"){
                label = "Phone Number";
            }

            cells.push({ property: capitalize(label), value: values[index]});
        }
        return cells;
    }

    const chuckfilter = (cells: CellProp[][], item: CellProp, index: number) => {
        const chunkIndex = Math.floor(index/4);
        if(!cells[chunkIndex]){
            cells[chunkIndex] = [];
        }

        cells[chunkIndex].push(item);
        return cells;
    }
    
    const getTables = () => {
        const cells = Object.keys(data).reduce(filterKeys, []);
        const result = cells.reduce(chuckfilter, []);
        setTables(result);
    }

    
    useEffect(() => {
        getTables();

        return () => {}
    }, [data]);
    

    return(
        <Grid container>
            {tables.map((table, index) => 
                <Grid item xs={12} xl={6} key={index}>
                    <CustomTable 
                        cells={table}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default Details;