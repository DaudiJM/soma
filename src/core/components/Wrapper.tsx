import { PropsWithChildren } from "react";

const Wrapper:React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <>{ children }</>
    );
}

export default Wrapper;