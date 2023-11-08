import { useCallback, useMemo, useState } from "react";
import get from "lodash/get";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import {
  useSetTitle,
  useReplyBox,
  useAsyncError,
  useRegisterElements,
  useLinkedAutoComment,
} from "../../hooks";
import { setEntityService } from "../../services/deskpro";
import { createIssueService } from "../../services/linear";
import { DEFAULT_ERROR } from "../../constants";
import { getEntityMetadata } from "../../utils";
import { getIssueValues } from "../../components/IssueForm";
import { CreateIssue } from "../../components";
import type { FC } from "react";
import type { Maybe, TicketContext } from "../../types";
import type { FormValidationSchema } from "../../components/IssueForm";

const CreateIssuePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { addLinkComment } = useLinkedAutoComment();
  const { setSelectionState } = useReplyBox();
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  const onNavigateToLink = useCallback(() => navigate("/issues/link"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit = useCallback((values: FormValidationSchema) => {
    if (!client || !ticketId || isEmpty(values)) {
      return Promise.resolve();
    }

    setError(null);

    return createIssueService(client, getIssueValues(values))
      .then((issue) => Promise.all([
        setEntityService(client, ticketId, issue.id, getEntityMetadata(issue)),
        addLinkComment(issue.id),
        setSelectionState(issue.id, true, "email"),
        setSelectionState(issue.id, true, "note"),
      ]))
      .then(() => navigate("/home"))
      .catch((err) => {
        const error = get(err, ["data", "error_description"])
          || get(err, ["data", "errors"])
          || DEFAULT_ERROR;

        if (error) {
          setError(Array.isArray(error) ? map(error, "message") : error)
        } else {
          asyncErrorHandler(err);
        }
      })
  }, [client, ticketId, navigate, asyncErrorHandler, addLinkComment, setSelectionState]);

  useSetTitle("Link Issue");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateIssue
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onNavigateToLink={onNavigateToLink}
    />
  );
};

export { CreateIssuePage };
