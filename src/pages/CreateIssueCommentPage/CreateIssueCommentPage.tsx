import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { createIssueCommentService } from "../../services/linear";
import { useSetTitle, useAsyncError, useRegisterElements } from "../../hooks";
import { getValues } from "../../components/IssueCommentForm";
import { CreateIssueComment } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/IssueCommentForm";
import get from "lodash/get";
import {DEFAULT_ERROR} from "../../constants";
import map from "lodash/map";

const CreateIssueCommentPage: FC = () => {
  const navigate = useNavigate();
  const { issueId } = useParams();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);

  const onCancel = useCallback(() => {
    navigate(`/issues/view/${issueId}`);
  }, [navigate, issueId]);

  const onSubmit = useCallback((values: FormValidationSchema) => {
    if (!client) {
      return Promise.resolve();
    }

    return createIssueCommentService(client, { ...getValues(values), issueId })
      .then(() => navigate(`/issues/view/${issueId}`))
      .catch((err) => {
        const error = get(err, ["data", "error_description"])
          || get(err, ["data", "errors"])
          || DEFAULT_ERROR;

        if (error) {
          setError(Array.isArray(error) ? map(error, "message") : error)
        } else {
          asyncErrorHandler(err);
        }
      });
  }, [client, issueId, navigate, asyncErrorHandler]);

  useSetTitle("Comment");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateIssueComment
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { CreateIssueCommentPage };
