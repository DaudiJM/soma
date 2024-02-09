import { useCallback, useState } from "react";

const useToggle = () => {
    const [state, setState] = useState<boolean>(false);

    const toggle = useCallback(() => {
        setState((previousState) => !previousState);
    }, []);

    return [state, toggle] as const;
}

export default useToggle;