import { useState, useCallback } from "react";
import get from "lodash/get";
import omit from "lodash/omit";
import { P5, Spinner, Tooltip } from "@deskpro/deskpro-ui";
import { Select } from "@deskpro/app-sdk";
import { getOption } from "../../../utils";
import { Card } from "../Card";
import { Status } from "../Status";
import type { FC } from "react";
import type { Issue, WorkflowState } from "../../../services/linear/types";

type Props = {
  issue: Issue,
  states: WorkflowState[],
  onChangeState: (
    issueId: Issue["id"],
    statusId: WorkflowState["id"],
  ) => Promise<void|Issue>,
};

const SubIssue: FC<Props> = ({ issue, states, onChangeState }) => {
  const boxSize = 14;
  const [isLoading, setIsLoading] = useState(false);

  const onChange = useCallback((stateId: WorkflowState["id"]) => {
    if (onChangeState) {
      setIsLoading(true);
      onChangeState(issue.id, stateId).finally(() => setIsLoading(false));
    }
  }, [issue, onChangeState]);

  return (
    <Card style={{ marginBottom: 7 }}>
      <Card.Media>
        {isLoading
          ? (
            <div style={{ width: `${boxSize}px`, height: `${boxSize}px` }}>
              <Spinner size="extra-small"/>
            </div>
          )
          : (
              <Select
                initValue={get(issue, ["state", "id"], "") || ""}
                options={(states || []).map((state) => getOption(
                  state.id,
                  <Status state={state} />,
                  state.name,
                ))}
                onChange={(value) => onChange(value as WorkflowState["id"])}
                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                /* @ts-ignore */
                children={(
                  <Tooltip content={get(issue, ["state", "name"], "")}>
                    <Status state={omit(get(issue, ["state"]), ["name"])} />
                  </Tooltip>
                )}
              />
          )
        }
      </Card.Media>
      <Card.Body size={boxSize}><P5>{issue.title}</P5></Card.Body>
    </Card>
  );
};

export { SubIssue };
