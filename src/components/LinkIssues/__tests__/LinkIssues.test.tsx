import { cleanup } from "@testing-library/react";

describe("LinkIssues", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test.todo("should navigate to \"create issue\" page");
});
