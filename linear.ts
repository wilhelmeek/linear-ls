import { createClient, defaultExchanges, gql } from "@urql/core";
import fetch from "node-fetch";
import {
  FindIssuesQuery,
  FindIssuesQueryVariables,
  FindTeamPrefixesQuery,
  GetIssueQuery,
  GetIssueQueryVariables,
} from "./types.generated";

const client = createClient({
  url: "https://api.linear.app/graphql",
  requestPolicy: "cache-first",
  exchanges: defaultExchanges,
  fetch,
  fetchOptions: {
    headers: {
      authorization: process.env.LINEAR_API_KEY,
    },
  },
});

export async function getTeamKeys() {
  const resp = await client
    .query(
      gql<FindTeamPrefixesQuery>`
        query FindTeamPrefixes {
          teams {
            nodes {
              id
              key
            }
          }
        }
      `,
      {}
    )
    .toPromise();

  return resp.data?.teams.nodes.map((t) => t.key) ?? [];
}

const issueFragment = gql`
  fragment Issue on Issue {
    id
    identifier
    title
    description
    url
    team {
      id
      key
    }
  }
`;

export async function getIssue(issueId: string) {
  const resp = await client
    .query(
      gql<GetIssueQuery, GetIssueQueryVariables>`
        query GetIssue($id: String!) {
          issue(id: $id) {
            ...Issue
          }
        }
        ${issueFragment}
      `,
      {
        id: issueId,
      }
    )
    .toPromise();

  return resp.data?.issue;
}

export async function findIssues(teamKeys: string[], issueTitle: string) {
  const resp = await client
    .query(
      gql<FindIssuesQuery, FindIssuesQueryVariables>`
        query FindIssues($teamFilter: TeamFilter!, $issueFilter: IssueFilter!) {
          teams(filter: $teamFilter) {
            nodes {
              id
              issues(filter: $issueFilter) {
                nodes {
                  ...Issue
                }
              }
            }
          }
        }
        ${issueFragment}
      `,
      {
        teamFilter: {
          or: teamKeys.map((tk) => ({
            key: {
              containsIgnoreCase: tk,
            },
          })),
        },
        issueFilter: {
          title: {
            containsIgnoreCase: issueTitle,
          },
        },
      }
    )
    .toPromise();

  return resp.data?.teams.nodes.flatMap((team) => team.issues.nodes);
}
