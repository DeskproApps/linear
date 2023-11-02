import { cleanup } from "@testing-library/react";
import { render, mockIssue } from "../../../../../testing";
import { normalize } from "../../../../utils";
import { Info } from "../Info";
import type { Props } from "../Info";

const renderInfo = (props?: Partial<Props>) => render((
  <Info issue={props?.issue || normalize(mockIssue.data.issue) as never} />
), { wrappers: { theme: true } });

describe("ViewIssue", () => {
  describe("Info", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderInfo();

      expect(await findByText(/\[Linear\] Link & Search issues/i)).toBeInTheDocument();
      expect(await findByText(/DP-10/i)).toBeInTheDocument();
      expect(await findByText(/Done/i)).toBeInTheDocument();
      expect(await findByText(/Urgent/i)).toBeInTheDocument();
      expect(await findByText(/05 Nov, 2023/i)).toBeInTheDocument();
      expect(await findByText(/this is description/i)).toBeInTheDocument();
      expect(await findByText(/ilia makarov/i)).toBeInTheDocument();
      expect(await findByText(/Feature/i)).toBeInTheDocument();
      expect(await findByText(/Improvement/i)).toBeInTheDocument();
    });
  });
});
