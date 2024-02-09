import { useState } from "react";

const useFormManager = <T> ({initialState } : { initialState: T}) => {
    const [formState, setState] = useState<T>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({
            ...formState,
            [event.target.name] : event.target.value
        });
    }

    const handleElementChange = <T>(name: string, value : T) => {
        setState({
            ...formState,
            [name]: value
        });
    }

    const reset = () => setState(initialState);

    return { formState, handleChange, handleElementChange, reset }
}

export default useFormManager;