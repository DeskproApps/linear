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
      const { findByText, findAllByText } = renderInfo();

      expect(await findByText(/Control and Maintenance of the Wall's Defense/i)).toBeInTheDocument();
      expect(await findByText(/Conduct a comprehensive review and enhancement of the Wall's defense mechanisms to ensure maximum preparedness against potential threats from the North\./i)).toBeInTheDocument();
      expect(await findByText(/GOT-26/i)).toBeInTheDocument();
      expect(await findByText(/In Progress/i)).toBeInTheDocument();
      expect(await findByText(/High/i)).toBeInTheDocument();
      expect(await findByText(/30 Nov, 2023/i)).toBeInTheDocument();
      expect(await findByText(/Jon Snow/i)).toBeInTheDocument();
      expect(await findByText(/Strategy/i)).toBeInTheDocument();
      expect(await findByText(/White Walker/i)).toBeInTheDocument();
      expect(await findAllByText(/Wall/i)).toHaveLength(3);
      expect(await findAllByText(/Defense/i)).toHaveLength(3);
    });
  });
});
