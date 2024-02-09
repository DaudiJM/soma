import CustomDialog from "core/components/Dialogs";
import { useAuth } from "core/hooks/custom-hooks";
import useToggle from "core/hooks/use-toggle";
import { ReactNode, createContext, useState } from "react";
import { ReactComponent as NotFoundSvg } from "core/assets/404.svg";
import { ReactComponent as UnderConstructionSvg } from "core/assets/constructions.svg";
import { ReactComponent as ErrorSvg } from "core/assets/error.svg";
import { ReactComponent as ForbiddenSvg } from "core/assets/403.svg";
import Result from "core/components/Result";
import Button from "@mui/material/Button";


type ErrorProviderProp = {
    showErrorOccured: (type: number, message: string) => void;
}

export const ErrorContext = createContext({} as ErrorProviderProp);

type Props = {
    children: ReactNode;
}

const ErrorProvider = (props: Props) => {
    const [showError, toggleErrorModal] = useToggle();
    const { isUserAuthenticated } = useAuth();
    const [errorType, setType] = useState<number>(0);
    const [message, setMessage] = useState<string>("An Error has occurred");

    const showErrorOccured = (type: number, message: string) => {
        setType(type);
        setMessage(message);
        toggleErrorModal();
    }

    const getChild = () => {
        switch(errorType){
            case 404:
                return <NotFoundSvg />
            case 600:
                return <UnderConstructionSvg />;
            case 401:
            case 403:
                return <ForbiddenSvg />
            default: 
                return <ErrorSvg />;
        }
    }

    return(
        <ErrorContext.Provider
            value={{showErrorOccured}}
        >
            { props.children }
            {isUserAuthenticated && <CustomDialog 
                width="sm"
                onClose={toggleErrorModal}
                open={showError}
                children={
                    <Result 
                        title="Ooops!"
                        image={getChild()}
                        status="error"
                        subTitle={message}
                        maxWidth="xs"
                        extra={
                            <Button
                                color="error"
                                variant="outlined"
                                onClick={toggleErrorModal}
                            >Close</Button>
                        }
                    />
                }
            />}
        </ErrorContext.Provider>
    )
}

export default ErrorProvider;