import { useMemo } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import type { TicketContext } from "../../types";

type UseCheckAuth = () => void;

const useCheckAuth: UseCheckAuth = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  useInitialisedDeskproAppClient(() => {
    if (!ticketId) {
      return;
    }

    navigate("/login");
  }, [navigate, ticketId]);
};

export { useCheckAuth };
