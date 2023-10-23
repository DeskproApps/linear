import { useMemo } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { getCurrentUserService } from "../../services/linear";
import type { TicketContext } from "../../types";

type UseCheckAuth = () => void;

const useCheckAuth: UseCheckAuth = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  useInitialisedDeskproAppClient((client) => {
    if (!ticketId) {
      return;
    }

    getCurrentUserService(client)
      .then(() => getEntityListService(client, ticketId))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/issues/link"))
      .catch(() => navigate("/login"))
  }, [navigate, ticketId]);
};

export { useCheckAuth };
