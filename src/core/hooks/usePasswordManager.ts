import { useEffect, useState } from "react";
import { useAuth } from "./custom-hooks"

const usePasswordManager = () => {
    const { user, isUserAuthenticated } = useAuth();
    const [promptPasswordChange, setPrompt] = useState(false);

    const prompt = () => {
        if(isUserAuthenticated){
            if(user?.lastPasswordChangeDate == null || user.lastPasswordChangeDate == ""){
                setPrompt(true);
                return;
            }
        }
        setPrompt(false);
    }

    useEffect(() => {
        prompt();

        return () => {}

    }, [isUserAuthenticated, user]);

    return { promptPasswordChange };
}

export default usePasswordManager;