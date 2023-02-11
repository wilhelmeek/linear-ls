import { createClient, defaultExchanges, gql } from "@urql/core";
import fetch from "node-fetch";
import {
  FindIssuesByTitleQuery,
  FindIssuesByTitleQueryVariables,
  FindTeamPrefixesQuery,
  GetIssueByKeyQuery,
  GetIssueByKeyQueryVariables,
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

export async function getIssueByKey(key: string) {
  const components = key.split("-");

  const teamKey = components[0];
  if (teamKey?.length !== 3) {
    return;
  }

  const issueNumber = Number(components[1]);
  if (!Number.isInteger(issueNumber)) {
    return;
  }

  const resp = await client
    .query(
      gql<GetIssueByKeyQuery, GetIssueByKeyQueryVariables>`
        query GetIssueByKey($filter: IssueFilter!) {
          issues(filter: $filter) {
            nodes {
              ...Issue
            }
          }
        }
        ${issueFragment}
      `,
      {
        filter: {
          team: { key: { eqIgnoreCase: teamKey } },
          number: { eq: issueNumber },
        },
      }
    )
    .toPromise();

  return resp.data?.issues?.nodes[0];
}

export async function findIssuesByTitle(
  teamKeys: string[],
  issueTitle: string
) {
  const resp = await client
    .query(
      gql<FindIssuesByTitleQuery, FindIssuesByTitleQueryVariables>`
        query FindIssuesByTitle(
          $teamFilter: TeamFilter!
          $issueFilter: IssueFilter!
        ) {
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
