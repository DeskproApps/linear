import { useState, useCallback } from "react";
import get from "lodash/get";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import { useParams, useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { updateIssueService } from "../../services/linear";
import {
  useIssue,
  useSetTitle,
  useAsyncError,
  useRegisterElements,
} from "../../hooks";
import { DEFAULT_ERROR } from "../../constants";
import { getIssueValues } from "../../components/IssueForm";
import { EditIssue } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/IssueForm";

const EditIssuePage: FC = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const { isLoading, issue } = useIssue(issueId);

  const onCancel = useCallback(() => {
    navigate(`/issues/view/${issue?.id}`);
  }, [navigate, issue]);

  const onSubmit = useCallback((values: FormValidationSchema,) => {
    if (!client || isEmpty(values) || !issueId) {
      return Promise.resolve();
    }

    setError(null);

    return updateIssueService(client, issueId, getIssueValues(values))
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
      })
  }, [client, navigate, issueId, asyncErrorHandler]);

  useSetTitle("Edit Issue");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <EditIssue
      issue={issue}
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { EditIssuePage };
