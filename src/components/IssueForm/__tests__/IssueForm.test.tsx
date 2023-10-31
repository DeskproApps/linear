import get from "lodash/get";
import { cleanup } from "@testing-library/react";
import { render, mockTeams } from "../../../../testing";
import { normalize } from "../../../utils";
import { getTeamsService } from "../../../services/linear";
import { IssueForm } from "../IssueForm";
import type { Props } from "../types";

jest.mock("../../../services/linear/getTeamsService");
jest.mock("../../../services/linear/getTeamMembersService");

const mockNormalizeTeams = get(normalize(mockTeams), ["data", "teams"]);

const renderIssueForm = (props?: Partial<Props>) => render((
  <IssueForm
    onSubmit={props?.onSubmit || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
    isEditMode={props?.isEditMode || false}
    error={props?.error || null}
  />
), { wrappers: { theme: true, query: true } });

describe("IssueForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  beforeEach(() => {
    (getTeamsService as jest.Mock).mockResolvedValue(mockNormalizeTeams);
  });

  test("render", async () => {
    const { findByText } = renderIssueForm();

    expect(await findByText(/Team/i)).toBeInTheDocument();
    expect(await findByText(/Title/i)).toBeInTheDocument();
    expect(await findByText(/Description/i)).toBeInTheDocument();
    expect(await findByText(/Status/i)).toBeInTheDocument();
    expect(await findByText(/Priority/i)).toBeInTheDocument();
    expect(await findByText(/Due Date/i)).toBeInTheDocument();
    expect(await findByText(/Assignee/i)).toBeInTheDocument();
    expect(await findByText(/Labels/i)).toBeInTheDocument();
  });

  test("should show \"Create\" button", async () => {
    const { findByRole } = renderIssueForm();
    const createButton = await findByRole("button", { name: "Create" });
    expect(createButton).toBeInTheDocument();
  });

  test("should show \"Save\" button", async () => {
    const { findByRole } = renderIssueForm({ isEditMode: true });
    const saveButton = await findByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();
  });

  test("render error", async () => {
    const { findByText } = renderIssueForm({ error: "some error" });
    expect(await findByText(/some error/)).toBeInTheDocument();
  });
});
