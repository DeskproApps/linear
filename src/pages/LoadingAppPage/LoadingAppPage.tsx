import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
// import { useCheckAuth } from "./hooks";
import { useEffect, useState, type FC } from "react";
import { Button } from "@deskpro/deskpro-ui";

const LoadingAppPage: FC = () => {
  // useCheckAuth();

  useSetTitle("Linear");

 const [errorState, setErrorState] = useState<string | null>(null)

    useEffect(() => {
        if (errorState === "left") {
            throw new Error("Hello from Linear")
        }

        if (errorState === "right") {
            throw "HI from Linear"
        }
    }, [errorState])

    return (
        <>
            <Button
                text="Left Error"
                onClick={() => { setErrorState("left") }}
            />
            <Button
                text="Right Error"
                onClick={() => { setErrorState("right") }}
            />
            <LoadingSpinner />
        </>
    );
};

export { LoadingAppPage };
