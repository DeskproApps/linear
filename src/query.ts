import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 2000,
    },
  },
});

const QueryKey = {
  ISSUE: "issue",
  ISSUES: "issues",
  LINKED_ISSUES: "linkedIssues",
  TEAMS: "teams",
  TEAM_MEMBERS: "teamMembers",
  TEAM_STATES: "teamStates",
}

export { queryClient, QueryKey };
