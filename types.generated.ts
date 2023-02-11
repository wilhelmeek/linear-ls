export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  JSONObject: any;
  TimelessDate: any;
  UUID: any;
};

export type AdminJobConfiguration = {
  currentJob?: InputMaybe<Scalars['String']>;
  delay?: InputMaybe<Scalars['Float']>;
  enabled: Scalars['Boolean'];
  param?: InputMaybe<Scalars['String']>;
};

export type AirbyteConfigurationInput = {
  /** Linear export API key. */
  apiKey: Scalars['String'];
};

export type ApiKeyCreateInput = {
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The API key value. */
  key: Scalars['String'];
  /** The label for the API key. */
  label: Scalars['String'];
};

/** Attachment collection filtering options. */
export type AttachmentCollectionFilter = {
  /** Compound filters, all of which need to be matched by the attachment. */
  and?: InputMaybe<Array<AttachmentCollectionFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the attachments creator must satisfy. */
  creator?: InputMaybe<NullableUserFilter>;
  /** Filters that needs to be matched by all attachments. */
  every?: InputMaybe<AttachmentFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Comparator for the collection length. */
  length?: InputMaybe<NumberComparator>;
  /** Compound filters, one of which need to be matched by the attachment. */
  or?: InputMaybe<Array<AttachmentCollectionFilter>>;
  /** Filters that needs to be matched by some attachments. */
  some?: InputMaybe<AttachmentFilter>;
  /** Comparator for the source type. */
  sourceType?: InputMaybe<SourceTypeComparator>;
  /** Comparator for the subtitle. */
  subtitle?: InputMaybe<NullableStringComparator>;
  /** Comparator for the title. */
  title?: InputMaybe<StringComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
  /** Comparator for the url. */
  url?: InputMaybe<StringComparator>;
};

export type AttachmentCreateInput = {
  /** Create a linked comment with markdown body. */
  commentBody?: InputMaybe<Scalars['String']>;
  /** Create a linked comment with Prosemirror body. Please use `commentBody` instead */
  commentBodyData?: InputMaybe<Scalars['JSONObject']>;
  /** Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=application` mode. */
  createAsUser?: InputMaybe<Scalars['String']>;
  /** Indicates if attachments for the same source application should be grouped in the Linear UI. */
  groupBySource?: InputMaybe<Scalars['Boolean']>;
  /** An icon url to display with the attachment. Should be of jpg or png format. Maximum of 1MB in size. Dimensions should be 20x20px for optimal display quality. */
  iconUrl?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The issue to associate the attachment with. */
  issueId: Scalars['String'];
  /** Attachment metadata object with string and number values. */
  metadata?: InputMaybe<Scalars['JSONObject']>;
  /** The attachment subtitle. */
  subtitle?: InputMaybe<Scalars['String']>;
  /** The attachment title. */
  title: Scalars['String'];
  /** Attachment location which is also used as an unique identifier for the attachment. If another attachment is created with the same `url` value, existing record is updated instead. */
  url: Scalars['String'];
};

/** Attachment filtering options. */
export type AttachmentFilter = {
  /** Compound filters, all of which need to be matched by the attachment. */
  and?: InputMaybe<Array<AttachmentFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the attachments creator must satisfy. */
  creator?: InputMaybe<NullableUserFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Compound filters, one of which need to be matched by the attachment. */
  or?: InputMaybe<Array<AttachmentFilter>>;
  /** Comparator for the source type. */
  sourceType?: InputMaybe<SourceTypeComparator>;
  /** Comparator for the subtitle. */
  subtitle?: InputMaybe<NullableStringComparator>;
  /** Comparator for the title. */
  title?: InputMaybe<StringComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
  /** Comparator for the url. */
  url?: InputMaybe<StringComparator>;
};

export type AttachmentUpdateInput = {
  /** An icon url to display with the attachment. Should be of jpg or png format. Maximum of 1MB in size. Dimensions should be 20x20px for optimal display quality. */
  iconUrl?: InputMaybe<Scalars['String']>;
  /** Attachment metadata object with string and number values. */
  metadata?: InputMaybe<Scalars['JSONObject']>;
  /** The attachment subtitle. */
  subtitle?: InputMaybe<Scalars['String']>;
  /** The attachment title. */
  title: Scalars['String'];
};

/** Audit entry filtering options. */
export type AuditEntryFilter = {
  /** Filters that the audit entry actor must satisfy. */
  actor?: InputMaybe<NullableUserFilter>;
  /** Comparator for the country code. */
  countryCode?: InputMaybe<StringComparator>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Comparator for the IP address. */
  ip?: InputMaybe<StringComparator>;
  /** Comparator for the type. */
  type?: InputMaybe<StringComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

/** Comparator for booleans. */
export type BooleanComparator = {
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['Boolean']>;
  /** Not equals constraint. */
  neq?: InputMaybe<Scalars['Boolean']>;
};

/** Comment filtering options. */
export type CommentCollectionFilter = {
  /** Compound filters, all of which need to be matched by the comment. */
  and?: InputMaybe<Array<CommentCollectionFilter>>;
  /** Comparator for the comments body. */
  body?: InputMaybe<StringComparator>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that needs to be matched by all comments. */
  every?: InputMaybe<CommentFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filters that the comments issue must satisfy. */
  issue?: InputMaybe<IssueFilter>;
  /** Comparator for the collection length. */
  length?: InputMaybe<NumberComparator>;
  /** Compound filters, one of which need to be matched by the comment. */
  or?: InputMaybe<Array<CommentCollectionFilter>>;
  /** Filters that needs to be matched by some comments. */
  some?: InputMaybe<CommentFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
  /** Filters that the comments creator must satisfy. */
  user?: InputMaybe<UserFilter>;
};

export type CommentCreateInput = {
  /** The comment content in markdown format. */
  body?: InputMaybe<Scalars['String']>;
  /** The comment content as a Prosemirror document. */
  bodyData?: InputMaybe<Scalars['JSON']>;
  /** Create comment as a user with the provided name. This option is only available to OAuth applications creating comments in `actor=application` mode. */
  createAsUser?: InputMaybe<Scalars['String']>;
  /** The date when the comment was created (e.g. if importing from another system). Must be a date in the past. If none is provided, the backend will generate the time as now. */
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=application` mode. */
  displayIconUrl?: InputMaybe<Scalars['String']>;
  /** Flag to prevent auto subscription to the issue the comment is created on. */
  doNotSubscribeToIssue?: InputMaybe<Scalars['Boolean']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The issue to associate the comment with. */
  issueId: Scalars['String'];
  /** [Internal] The parent under which to nest the comment. */
  parentId?: InputMaybe<Scalars['String']>;
};

/** Comment filtering options. */
export type CommentFilter = {
  /** Compound filters, all of which need to be matched by the comment. */
  and?: InputMaybe<Array<CommentFilter>>;
  /** Comparator for the comments body. */
  body?: InputMaybe<StringComparator>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filters that the comments issue must satisfy. */
  issue?: InputMaybe<IssueFilter>;
  /** Compound filters, one of which need to be matched by the comment. */
  or?: InputMaybe<Array<CommentFilter>>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
  /** Filters that the comments creator must satisfy. */
  user?: InputMaybe<UserFilter>;
};

export type CommentUpdateInput = {
  /** The comment content. */
  body?: InputMaybe<Scalars['String']>;
  /** The comment content as a Prosemirror document. */
  bodyData?: InputMaybe<Scalars['JSON']>;
};

export type ContactCreateInput = {
  /** User's browser information. */
  browser?: InputMaybe<Scalars['String']>;
  /** User's Linear client information. */
  clientVersion?: InputMaybe<Scalars['String']>;
  /** User's device information. */
  device?: InputMaybe<Scalars['String']>;
  /** How disappointed the user would be if they could no longer use Linear. */
  disappointmentRating?: InputMaybe<Scalars['Int']>;
  /** The message the user sent. */
  message: Scalars['String'];
  /** User's operating system. */
  operatingSystem?: InputMaybe<Scalars['String']>;
  /** The type of support contact. */
  type: Scalars['String'];
};

/** [INTERNAL] Input for sending a message to the Linear Sales team */
export type ContactSalesCreateInput = {
  /** Work email of the person requesting information. */
  email: Scalars['String'];
  /** The message the user sent. */
  message?: InputMaybe<Scalars['String']>;
  /** Name of the person requesting information. */
  name: Scalars['String'];
};

/** [Internal] Comparator for content. */
export type ContentComparator = {
  /** [Internal] Contains constraint. */
  contains?: InputMaybe<Scalars['String']>;
  /** [Internal] Not-contains constraint. */
  notContains?: InputMaybe<Scalars['String']>;
};

export type CreateOrganizationInput = {
  /** Whether the organization should allow email domain access. */
  domainAccess?: InputMaybe<Scalars['Boolean']>;
  /** The name of the organization. */
  name: Scalars['String'];
  /** The timezone of the organization, passed in by client. */
  timezone?: InputMaybe<Scalars['String']>;
  /** The URL key of the organization. */
  urlKey: Scalars['String'];
  /** JSON serialized UTM parameters associated with the creation of the workspace. */
  utm?: InputMaybe<Scalars['String']>;
};

export type CustomViewCreateInput = {
  /** The color of the icon of the custom view. */
  color?: InputMaybe<Scalars['String']>;
  /** The description of the custom view. */
  description?: InputMaybe<Scalars['String']>;
  /** The filter applied to issues in the custom view. */
  filterData?: InputMaybe<Scalars['JSONObject']>;
  /** The filters applied to issues in the custom view. */
  filters?: InputMaybe<Scalars['JSONObject']>;
  /** The icon of the custom view. */
  icon?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The name of the custom view. */
  name: Scalars['String'];
  /** Whether the custom view is shared with everyone in the organization. */
  shared?: InputMaybe<Scalars['Boolean']>;
  /** The id of the team associated with the custom view. */
  teamId?: InputMaybe<Scalars['String']>;
};

export type CustomViewUpdateInput = {
  /** The color of the icon of the custom view. */
  color?: InputMaybe<Scalars['String']>;
  /** The description of the custom view. */
  description?: InputMaybe<Scalars['String']>;
  /** The filter applied to issues in the custom view. */
  filterData?: InputMaybe<Scalars['JSONObject']>;
  /** The filters applied to issues in the custom view. */
  filters?: InputMaybe<Scalars['JSONObject']>;
  /** The icon of the custom view. */
  icon?: InputMaybe<Scalars['String']>;
  /** The name of the custom view. */
  name?: InputMaybe<Scalars['String']>;
  /** Whether the custom view is shared with everyone in the organization. */
  shared?: InputMaybe<Scalars['Boolean']>;
  /** The id of the team associated with the custom view. */
  teamId?: InputMaybe<Scalars['String']>;
};

export type CycleCreateInput = {
  /** The completion time of the cycle. If null, the cycle hasn't been completed. */
  completedAt?: InputMaybe<Scalars['DateTime']>;
  /** The description of the cycle. */
  description?: InputMaybe<Scalars['String']>;
  /** The end date of the cycle. */
  endsAt: Scalars['DateTime'];
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The custom name of the cycle. */
  name?: InputMaybe<Scalars['String']>;
  /** The start date of the cycle. */
  startsAt: Scalars['DateTime'];
  /** The team to associate the cycle with. */
  teamId: Scalars['String'];
};

/** Cycle filtering options. */
export type CycleFilter = {
  /** Compound filters, all of which need to be matched by the cycle. */
  and?: InputMaybe<Array<CycleFilter>>;
  /** Comparator for the cycle completed at date. */
  completedAt?: InputMaybe<DateComparator>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Comparator for the cycle ends at date. */
  endsAt?: InputMaybe<DateComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Comparator for the filtering active cycle. */
  isActive?: InputMaybe<BooleanComparator>;
  /** Comparator for the filtering future cycles. */
  isFuture?: InputMaybe<BooleanComparator>;
  /** Comparator for the filtering next cycle. */
  isNext?: InputMaybe<BooleanComparator>;
  /** Comparator for the filtering past cycles. */
  isPast?: InputMaybe<BooleanComparator>;
  /** Comparator for the filtering previous cycle. */
  isPrevious?: InputMaybe<BooleanComparator>;
  /** Filters that the cycles issues must satisfy. */
  issues?: InputMaybe<IssueCollectionFilter>;
  /** Comparator for the cycle name. */
  name?: InputMaybe<StringComparator>;
  /** Comparator for the cycle number. */
  number?: InputMaybe<NumberComparator>;
  /** Compound filters, one of which need to be matched by the cycle. */
  or?: InputMaybe<Array<CycleFilter>>;
  /** Comparator for the cycle start date. */
  startsAt?: InputMaybe<DateComparator>;
  /** Filters that the cycles team must satisfy. */
  team?: InputMaybe<TeamFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

export type CycleUpdateInput = {
  /** The end date of the cycle. */
  completedAt?: InputMaybe<Scalars['DateTime']>;
  /** The description of the cycle. */
  description?: InputMaybe<Scalars['String']>;
  /** The end date of the cycle. */
  endsAt?: InputMaybe<Scalars['DateTime']>;
  /** The custom name of the cycle. */
  name?: InputMaybe<Scalars['String']>;
  /** The start date of the cycle. */
  startsAt?: InputMaybe<Scalars['DateTime']>;
};

/** Comparator for dates. */
export type DateComparator = {
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['DateTime']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['DateTime']>>;
};

/** The day of the week. */
export type Day =
  | 'Friday'
  | 'Monday'
  | 'Saturday'
  | 'Sunday'
  | 'Thursday'
  | 'Tuesday'
  | 'Wednesday';

export type DeleteOrganizationInput = {
  /** The deletion code to confirm operation. */
  deletionCode: Scalars['String'];
};

export type DocumentCreateInput = {
  /** The color of the icon. */
  color?: InputMaybe<Scalars['String']>;
  /** The document content as markdown. */
  content?: InputMaybe<Scalars['String']>;
  /** The document content as a Prosemirror document. */
  contentData?: InputMaybe<Scalars['JSONObject']>;
  /** The icon of the document. */
  icon?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** Related project for the document. */
  projectId: Scalars['String'];
  /** The title of the document. */
  title: Scalars['String'];
};

export type DocumentUpdateInput = {
  /** The color of the icon. */
  color?: InputMaybe<Scalars['String']>;
  /** The document content as markdown. */
  content?: InputMaybe<Scalars['String']>;
  /** The document content as a Prosemirror document. */
  contentData?: InputMaybe<Scalars['JSONObject']>;
  /** The icon of the document. */
  icon?: InputMaybe<Scalars['String']>;
  /** Related project for the document. */
  projectId?: InputMaybe<Scalars['String']>;
  /** The title of the document. */
  title?: InputMaybe<Scalars['String']>;
};

export type EmailSubscribeInput = {
  /** [INTERNAL] Email to subscribe. */
  email: Scalars['String'];
};

export type EmailUnsubscribeInput = {
  /** The user's email validation token. */
  token: Scalars['String'];
  /** Email type to unsubscribed from. */
  type: Scalars['String'];
  /** The identifier of the user. */
  userId: Scalars['String'];
};

export type EmailUserAccountAuthChallengeInput = {
  /** Auth code for the client initiating the sequence. */
  clientAuthCode?: InputMaybe<Scalars['String']>;
  /** The email for which to generate the magic login code. */
  email: Scalars['String'];
  /** Whether the login was requested from the desktop app. */
  isDesktop?: InputMaybe<Scalars['Boolean']>;
  /** Signup code. */
  signupCode?: InputMaybe<Scalars['String']>;
};

export type EmojiCreateInput = {
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The name of the custom emoji. */
  name: Scalars['String'];
  /** The URL for the emoji. */
  url: Scalars['String'];
};

/** Comparator for estimates. */
export type EstimateComparator = {
  /** Compound filters, one of which need to be matched by the estimate. */
  and?: InputMaybe<Array<NullableNumberComparator>>;
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['Float']>;
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: InputMaybe<Scalars['Float']>;
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: InputMaybe<Scalars['Float']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['Float']>>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: InputMaybe<Scalars['Float']>;
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: InputMaybe<Scalars['Float']>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['Float']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['Float']>>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: InputMaybe<Scalars['Boolean']>;
  /** Compound filters, all of which need to be matched by the estimate. */
  or?: InputMaybe<Array<NullableNumberComparator>>;
};

export type EventCreateInput = {
  /** The category of the event to create. */
  category: Scalars['String'];
  /** Additional data of the event, encoded as JSON. */
  data?: InputMaybe<Scalars['JSON']>;
  /** The subject of the event. */
  subject: Scalars['String'];
  /** The target identifier of the event. */
  targetId?: InputMaybe<Scalars['String']>;
  /** The value of the event. */
  value?: InputMaybe<Scalars['Float']>;
};

export type FavoriteCreateInput = {
  /** The identifier of the custom view to favorite. */
  customViewId?: InputMaybe<Scalars['String']>;
  /** The identifier of the cycle to favorite. */
  cycleId?: InputMaybe<Scalars['String']>;
  /** The identifier of the document to favorite. */
  documentId?: InputMaybe<Scalars['String']>;
  /** The name of the favorite folder. */
  folderName?: InputMaybe<Scalars['String']>;
  /** The identifier. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The identifier of the issue to favorite. */
  issueId?: InputMaybe<Scalars['String']>;
  /** The identifier of the label to favorite. */
  labelId?: InputMaybe<Scalars['String']>;
  /** The parent folder of the favorite. */
  parentId?: InputMaybe<Scalars['String']>;
  /** The identifier of team for the predefined view to favorite. */
  predefinedViewTeamId?: InputMaybe<Scalars['String']>;
  /** The type of the predefined view to favorite. */
  predefinedViewType?: InputMaybe<Scalars['String']>;
  /** The identifier of the project to favorite. */
  projectId?: InputMaybe<Scalars['String']>;
  /** The identifier of the project team to favorite. */
  projectTeamId?: InputMaybe<Scalars['String']>;
  /** The identifier of the roadmap to favorite. */
  roadmapId?: InputMaybe<Scalars['String']>;
  /** The position of the item in the favorites list. */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

export type FavoriteUpdateInput = {
  /** The name of the favorite folder. */
  folderName?: InputMaybe<Scalars['String']>;
  /** The identifier (in UUID v4 format) of the folder to move the favorite under. */
  parentId?: InputMaybe<Scalars['String']>;
  /** The position of the item in the favorites list. */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

export type FrontSettingsInput = {
  /** Whether a ticket should be automatically reopened when its linked Linear issue is cancelled. */
  automateTicketReopeningOnCancellation?: InputMaybe<Scalars['Boolean']>;
  /** Whether a ticket should be automatically reopened when a comment is posted on its linked Linear issue */
  automateTicketReopeningOnComment?: InputMaybe<Scalars['Boolean']>;
  /** Whether a ticket should be automatically reopened when its linked Linear issue is completed. */
  automateTicketReopeningOnCompletion?: InputMaybe<Scalars['Boolean']>;
  /** Whether an internal message should be added when someone comments on an issue. */
  sendNoteOnComment?: InputMaybe<Scalars['Boolean']>;
  /** Whether an internal message should be added when a Linear issue changes status (for status types except completed or canceled). */
  sendNoteOnStatusChange?: InputMaybe<Scalars['Boolean']>;
};

export type GitHubSettingsInput = {
  /** The avatar URL for the GitHub organization */
  orgAvatarUrl: Scalars['String'];
  /** The GitHub organization's name */
  orgLogin: Scalars['String'];
};

export type GoogleSheetsSettingsInput = {
  sheetId: Scalars['Float'];
  spreadsheetId: Scalars['String'];
  spreadsheetUrl: Scalars['String'];
  updatedIssuesAt: Scalars['DateTime'];
};

export type GoogleUserAccountAuthInput = {
  /** Code returned from Google's OAuth flow. */
  code: Scalars['String'];
  /** The URI to redirect the user to. */
  redirectUri?: InputMaybe<Scalars['String']>;
  /** Signup code. */
  signupCode?: InputMaybe<Scalars['String']>;
  /** The identifiers of the teams to auto-join. */
  teamIdsToJoin?: InputMaybe<Array<Scalars['String']>>;
  /** The timezone of the user's browser. */
  timezone: Scalars['String'];
};

/** Comparator for identifiers. */
export type IdComparator = {
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['ID']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['ID']>>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['ID']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['ID']>>;
};

export type IntegrationRequestInput = {
  /** Email associated with the request. */
  email?: InputMaybe<Scalars['String']>;
  /** Name of the requested integration. */
  name: Scalars['String'];
};

export type IntegrationSettingsInput = {
  front?: InputMaybe<FrontSettingsInput>;
  gitHub?: InputMaybe<GitHubSettingsInput>;
  googleSheets?: InputMaybe<GoogleSheetsSettingsInput>;
  intercom?: InputMaybe<IntercomSettingsInput>;
  jira?: InputMaybe<JiraSettingsInput>;
  sentry?: InputMaybe<SentrySettingsInput>;
  slackOrgProjectUpdatesPost?: InputMaybe<SlackPostSettingsInput>;
  slackPost?: InputMaybe<SlackPostSettingsInput>;
  slackProjectPost?: InputMaybe<SlackPostSettingsInput>;
  zendesk?: InputMaybe<ZendeskSettingsInput>;
};

export type IntegrationTemplateCreateInput = {
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The identifier of the integration. */
  integrationId: Scalars['String'];
  /** The identifier of the template. */
  templateId: Scalars['String'];
};

export type IntegrationsSettingsCreateInput = {
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The identifier of the project to create settings for. */
  projectId?: InputMaybe<Scalars['String']>;
  /** Whether to send a Slack message when a new issue is added to triage. */
  slackIssueAddedToTriage?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a new issue is created for the project or the team. */
  slackIssueCreated?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a comment is created on any of the project or team's issues. */
  slackIssueNewComment?: InputMaybe<Scalars['Boolean']>;
  /** Whether to receive notification when an SLA has breached on Slack. */
  slackIssueSlaBreached?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when an SLA is at high risk */
  slackIssueSlaHighRisk?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when any of the project or team's issues has a change in status. */
  slackIssueStatusChangedAll?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when any of the project or team's issues change to completed or cancelled. */
  slackIssueStatusChangedDone?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a project update is created. */
  slackProjectUpdateCreated?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a project update is created to milestone channels. */
  slackProjectUpdateCreatedToMilestone?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a project update is created to team channels. */
  slackProjectUpdateCreatedToTeam?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a project update is created to workspace channel. */
  slackProjectUpdateCreatedToWorkspace?: InputMaybe<Scalars['Boolean']>;
  /** The identifier of the team to create settings for. */
  teamId?: InputMaybe<Scalars['String']>;
};

export type IntegrationsSettingsUpdateInput = {
  /** Whether to send a Slack message when a new issue is added to triage. */
  slackIssueAddedToTriage?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a new issue is created for the project or the team. */
  slackIssueCreated?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a comment is created on any of the project or team's issues. */
  slackIssueNewComment?: InputMaybe<Scalars['Boolean']>;
  /** Whether to receive notification when an SLA has breached on Slack. */
  slackIssueSlaBreached?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when an SLA is at high risk */
  slackIssueSlaHighRisk?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when any of the project or team's issues has a change in status. */
  slackIssueStatusChangedAll?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when any of the project or team's issues change to completed or cancelled. */
  slackIssueStatusChangedDone?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a project update is created. */
  slackProjectUpdateCreated?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a project update is created to milestone channels. */
  slackProjectUpdateCreatedToMilestone?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a project update is created to team channels. */
  slackProjectUpdateCreatedToTeam?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send a Slack message when a project update is created to workspace channel. */
  slackProjectUpdateCreatedToWorkspace?: InputMaybe<Scalars['Boolean']>;
};

export type IntercomSettingsInput = {
  /** Whether a ticket should be automatically reopened when its linked Linear issue is cancelled. */
  automateTicketReopeningOnCancellation?: InputMaybe<Scalars['Boolean']>;
  /** Whether a ticket should be automatically reopened when a comment is posted on its linked Linear issue */
  automateTicketReopeningOnComment?: InputMaybe<Scalars['Boolean']>;
  /** Whether a ticket should be automatically reopened when its linked Linear issue is completed. */
  automateTicketReopeningOnCompletion?: InputMaybe<Scalars['Boolean']>;
  /** Whether an internal message should be added when someone comments on an issue. */
  sendNoteOnComment?: InputMaybe<Scalars['Boolean']>;
  /** Whether an internal message should be added when a Linear issue changes status (for status types except completed or canceled). */
  sendNoteOnStatusChange?: InputMaybe<Scalars['Boolean']>;
};

/** Issue filtering options. */
export type IssueCollectionFilter = {
  /** Compound filters, all of which need to be matched by the issue. */
  and?: InputMaybe<Array<IssueCollectionFilter>>;
  /** Filters that the issues assignee must satisfy. */
  assignee?: InputMaybe<NullableUserFilter>;
  /** Filters that the issues attachments must satisfy. */
  attachments?: InputMaybe<AttachmentCollectionFilter>;
  /** Comparator for the issues auto archived at date. */
  autoArchivedAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the issues auto closed at date. */
  autoClosedAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the issues canceled at date. */
  canceledAt?: InputMaybe<NullableDateComparator>;
  /** Filters that the child issues must satisfy. */
  children?: InputMaybe<IssueCollectionFilter>;
  /** Filters that the issues comments must satisfy. */
  comments?: InputMaybe<CommentCollectionFilter>;
  /** Comparator for the issues completed at date. */
  completedAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the issues creator must satisfy. */
  creator?: InputMaybe<NullableUserFilter>;
  /** Filters that the issues cycle must satisfy. */
  cycle?: InputMaybe<NullableCycleFilter>;
  /** Comparator for the issues description. */
  description?: InputMaybe<NullableStringComparator>;
  /** Comparator for the issues due date. */
  dueDate?: InputMaybe<NullableTimelessDateComparator>;
  /** Comparator for the issues estimate. */
  estimate?: InputMaybe<EstimateComparator>;
  /** Filters that needs to be matched by all issues. */
  every?: InputMaybe<IssueFilter>;
  /** Comparator for filtering issues which are blocked. */
  hasBlockedByRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for filtering issues which are blocking. */
  hasBlockingRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for filtering issues which are duplicates. */
  hasDuplicateRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for filtering issues with relations. */
  hasRelatedRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filters that issue labels must satisfy. */
  labels?: InputMaybe<IssueLabelCollectionFilter>;
  /** Comparator for the collection length. */
  length?: InputMaybe<NumberComparator>;
  /** Comparator for the issues number. */
  number?: InputMaybe<NumberComparator>;
  /** Compound filters, one of which need to be matched by the issue. */
  or?: InputMaybe<Array<IssueCollectionFilter>>;
  /** Filters that the issue parent must satisfy. */
  parent?: InputMaybe<NullableIssueFilter>;
  /** Comparator for the issues priority. */
  priority?: InputMaybe<NullableNumberComparator>;
  /** Filters that the issues project must satisfy. */
  project?: InputMaybe<NullableProjectFilter>;
  /** [Internal] Comparator for the issues content. */
  searchableContent?: InputMaybe<ContentComparator>;
  /** Filters that the issues snoozer must satisfy. */
  snoozedBy?: InputMaybe<NullableUserFilter>;
  /** Comparator for the issues snoozed until date. */
  snoozedUntilAt?: InputMaybe<NullableDateComparator>;
  /** Filters that needs to be matched by some issues. */
  some?: InputMaybe<IssueFilter>;
  /** Comparator for the issues started at date. */
  startedAt?: InputMaybe<NullableDateComparator>;
  /** Filters that the issues state must satisfy. */
  state?: InputMaybe<WorkflowStateFilter>;
  /** Filters that issue subscribers must satisfy. */
  subscribers?: InputMaybe<UserCollectionFilter>;
  /** Filters that the issues team must satisfy. */
  team?: InputMaybe<TeamFilter>;
  /** Comparator for the issues title. */
  title?: InputMaybe<StringComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

export type IssueCreateInput = {
  /** The identifier of the user to assign the issue to. */
  assigneeId?: InputMaybe<Scalars['String']>;
  /** The position of the issue in its column on the board view. */
  boardOrder?: InputMaybe<Scalars['Float']>;
  /** Create issue as a user with the provided name. This option is only available to OAuth applications creating issues in `actor=application` mode. */
  createAsUser?: InputMaybe<Scalars['String']>;
  /** The date when the issue was created (e.g. if importing from another system). Must be a date in the past. If none is provided, the backend will generate the time as now. */
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** The cycle associated with the issue. */
  cycleId?: InputMaybe<Scalars['String']>;
  /** The issue description in markdown format. */
  description?: InputMaybe<Scalars['String']>;
  /** The issue description as a Prosemirror document. */
  descriptionData?: InputMaybe<Scalars['JSON']>;
  /** Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=application` mode. */
  displayIconUrl?: InputMaybe<Scalars['String']>;
  /** The date at which the issue is due. */
  dueDate?: InputMaybe<Scalars['TimelessDate']>;
  /** The estimated complexity of the issue. */
  estimate?: InputMaybe<Scalars['Int']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The identifiers of the issue labels associated with this ticket. */
  labelIds?: InputMaybe<Array<Scalars['String']>>;
  /** The identifier of the parent issue. */
  parentId?: InputMaybe<Scalars['String']>;
  /** The priority of the issue. */
  priority?: InputMaybe<Scalars['Int']>;
  /** The project associated with the issue. */
  projectId?: InputMaybe<Scalars['String']>;
  /** [ALPHA] The project milestone associated with the issue. */
  projectMilestoneId?: InputMaybe<Scalars['String']>;
  /** The comment the issue is referencing. */
  referenceCommentId?: InputMaybe<Scalars['String']>;
  /** The position of the issue related to other issues. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** The team state of the issue. */
  stateId?: InputMaybe<Scalars['String']>;
  /** The position of the issue in parent's sub-issue list. */
  subIssueSortOrder?: InputMaybe<Scalars['Float']>;
  /** The identifiers of the users subscribing to this ticket. */
  subscriberIds?: InputMaybe<Array<Scalars['String']>>;
  /** The identifier or key of the team associated with the issue. */
  teamId: Scalars['String'];
  /** The title of the issue. */
  title: Scalars['String'];
};

export type IssueDraftCreateInput = {
  /** The identifier of the user to assign the draft to. */
  assigneeId?: InputMaybe<Scalars['String']>;
  /** The attachments associated with this draft. */
  attachments?: InputMaybe<Scalars['JSONObject']>;
  /** The cycle associated with the draft. */
  cycleId?: InputMaybe<Scalars['String']>;
  /** The draft description in markdown format. */
  description?: InputMaybe<Scalars['String']>;
  /** The draft description as a Prosemirror document. */
  descriptionData?: InputMaybe<Scalars['JSON']>;
  /** The date at which the draft is due. */
  dueDate?: InputMaybe<Scalars['TimelessDate']>;
  /** The estimated complexity of the draft. */
  estimate?: InputMaybe<Scalars['Int']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The identifiers of the issue labels associated with this draft. */
  labelIds?: InputMaybe<Array<Scalars['String']>>;
  /** The identifier of the parent draft. */
  parentId?: InputMaybe<Scalars['String']>;
  /** The identifier of the parent issue. */
  parentIssueId?: InputMaybe<Scalars['String']>;
  /** The priority of the draft. */
  priority?: InputMaybe<Scalars['Int']>;
  /** The project associated with the draft. */
  projectId?: InputMaybe<Scalars['String']>;
  /** The team state of the draft. */
  stateId?: InputMaybe<Scalars['String']>;
  /** The position of the draft in parent draft's sub-draft list. */
  subIssueSortOrder?: InputMaybe<Scalars['Float']>;
  /** The identifier or key of the team associated with the draft. */
  teamId: Scalars['String'];
  /** The title of the draft. */
  title: Scalars['String'];
};

export type IssueDraftUpdateInput = {
  /** The identifier of the user to assign the draft to. */
  assigneeId?: InputMaybe<Scalars['String']>;
  /** The attachments associated with this draft. */
  attachments?: InputMaybe<Scalars['JSONObject']>;
  /** The cycle associated with the draft. */
  cycleId?: InputMaybe<Scalars['String']>;
  /** The draft description in markdown format. */
  description?: InputMaybe<Scalars['String']>;
  /** The draft description as a Prosemirror document. */
  descriptionData?: InputMaybe<Scalars['JSON']>;
  /** The date at which the draft is due. */
  dueDate?: InputMaybe<Scalars['TimelessDate']>;
  /** The estimated complexity of the draft. */
  estimate?: InputMaybe<Scalars['Int']>;
  /** The identifiers of the issue labels associated with this draft. */
  labelIds?: InputMaybe<Array<Scalars['String']>>;
  /** The identifier of the parent draft. */
  parentId?: InputMaybe<Scalars['String']>;
  /** The identifier of the parent issue. */
  parentIssueId?: InputMaybe<Scalars['String']>;
  /** The priority of the draft. */
  priority?: InputMaybe<Scalars['Int']>;
  /** The project associated with the draft. */
  projectId?: InputMaybe<Scalars['String']>;
  /** The team state of the draft. */
  stateId?: InputMaybe<Scalars['String']>;
  /** The position of the draft in parent draft's sub-draft list. */
  subIssueSortOrder?: InputMaybe<Scalars['Float']>;
  /** The identifier or key of the team associated with the draft. */
  teamId?: InputMaybe<Scalars['String']>;
  /** The title of the draft. */
  title?: InputMaybe<Scalars['String']>;
};

/** Issue filtering options. */
export type IssueFilter = {
  /** Compound filters, all of which need to be matched by the issue. */
  and?: InputMaybe<Array<IssueFilter>>;
  /** Filters that the issues assignee must satisfy. */
  assignee?: InputMaybe<NullableUserFilter>;
  /** Filters that the issues attachments must satisfy. */
  attachments?: InputMaybe<AttachmentCollectionFilter>;
  /** Comparator for the issues auto archived at date. */
  autoArchivedAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the issues auto closed at date. */
  autoClosedAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the issues canceled at date. */
  canceledAt?: InputMaybe<NullableDateComparator>;
  /** Filters that the child issues must satisfy. */
  children?: InputMaybe<IssueCollectionFilter>;
  /** Filters that the issues comments must satisfy. */
  comments?: InputMaybe<CommentCollectionFilter>;
  /** Comparator for the issues completed at date. */
  completedAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the issues creator must satisfy. */
  creator?: InputMaybe<NullableUserFilter>;
  /** Filters that the issues cycle must satisfy. */
  cycle?: InputMaybe<NullableCycleFilter>;
  /** Comparator for the issues description. */
  description?: InputMaybe<NullableStringComparator>;
  /** Comparator for the issues due date. */
  dueDate?: InputMaybe<NullableTimelessDateComparator>;
  /** Comparator for the issues estimate. */
  estimate?: InputMaybe<EstimateComparator>;
  /** Comparator for filtering issues which are blocked. */
  hasBlockedByRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for filtering issues which are blocking. */
  hasBlockingRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for filtering issues which are duplicates. */
  hasDuplicateRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for filtering issues with relations. */
  hasRelatedRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filters that issue labels must satisfy. */
  labels?: InputMaybe<IssueLabelCollectionFilter>;
  /** Comparator for the issues number. */
  number?: InputMaybe<NumberComparator>;
  /** Compound filters, one of which need to be matched by the issue. */
  or?: InputMaybe<Array<IssueFilter>>;
  /** Filters that the issue parent must satisfy. */
  parent?: InputMaybe<NullableIssueFilter>;
  /** Comparator for the issues priority. */
  priority?: InputMaybe<NullableNumberComparator>;
  /** Filters that the issues project must satisfy. */
  project?: InputMaybe<NullableProjectFilter>;
  /** [Internal] Comparator for the issues content. */
  searchableContent?: InputMaybe<ContentComparator>;
  /** Filters that the issues snoozer must satisfy. */
  snoozedBy?: InputMaybe<NullableUserFilter>;
  /** Comparator for the issues snoozed until date. */
  snoozedUntilAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the issues started at date. */
  startedAt?: InputMaybe<NullableDateComparator>;
  /** Filters that the issues state must satisfy. */
  state?: InputMaybe<WorkflowStateFilter>;
  /** Filters that issue subscribers must satisfy. */
  subscribers?: InputMaybe<UserCollectionFilter>;
  /** Filters that the issues team must satisfy. */
  team?: InputMaybe<TeamFilter>;
  /** Comparator for the issues title. */
  title?: InputMaybe<StringComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

/** Issue import mapping input */
export type IssueImportMappingInput = {
  /** The mapping configuration for epics */
  epics?: InputMaybe<Scalars['JSONObject']>;
  /** The mapping configuration for users */
  users?: InputMaybe<Scalars['JSONObject']>;
  /** The mapping configuration for workflow states */
  workflowStates?: InputMaybe<Scalars['JSONObject']>;
};

export type IssueImportUpdateInput = {
  /** The mapping configuration for the import. */
  mapping: Scalars['JSONObject'];
};

/** Issue label filtering options. */
export type IssueLabelCollectionFilter = {
  /** Compound filters, all of which need to be matched by the label. */
  and?: InputMaybe<Array<IssueLabelCollectionFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the issue labels creator must satisfy. */
  creator?: InputMaybe<NullableUserFilter>;
  /** Filters that needs to be matched by all issue labels. */
  every?: InputMaybe<IssueLabelFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Comparator for the collection length. */
  length?: InputMaybe<NumberComparator>;
  /** Comparator for the name. */
  name?: InputMaybe<StringComparator>;
  /** Compound filters, one of which need to be matched by the label. */
  or?: InputMaybe<Array<IssueLabelCollectionFilter>>;
  /** Filters that the issue label's parent label must satisfy. */
  parent?: InputMaybe<IssueLabelFilter>;
  /** Filters that needs to be matched by some issue labels. */
  some?: InputMaybe<IssueLabelFilter>;
  /** Filters that the issue labels team must satisfy. */
  team?: InputMaybe<TeamFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

export type IssueLabelCreateInput = {
  /** The color of the label. */
  color?: InputMaybe<Scalars['String']>;
  /** The description of the label. */
  description?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The name of the label. */
  name: Scalars['String'];
  /** The identifier of the parent label. */
  parentId?: InputMaybe<Scalars['String']>;
  /** The team associated with the label. If not given, the label will be associated with the entire workspace. */
  teamId?: InputMaybe<Scalars['String']>;
};

/** Issue label filtering options. */
export type IssueLabelFilter = {
  /** Compound filters, all of which need to be matched by the label. */
  and?: InputMaybe<Array<IssueLabelFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the issue labels creator must satisfy. */
  creator?: InputMaybe<NullableUserFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Comparator for the name. */
  name?: InputMaybe<StringComparator>;
  /** Compound filters, one of which need to be matched by the label. */
  or?: InputMaybe<Array<IssueLabelFilter>>;
  /** Filters that the issue label's parent label must satisfy. */
  parent?: InputMaybe<IssueLabelFilter>;
  /** Filters that the issue labels team must satisfy. */
  team?: InputMaybe<TeamFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

export type IssueLabelUpdateInput = {
  /** The color of the label. */
  color?: InputMaybe<Scalars['String']>;
  /** The description of the label. */
  description?: InputMaybe<Scalars['String']>;
  /** The name of the label. */
  name?: InputMaybe<Scalars['String']>;
  /** The identifier of the parent label. */
  parentId?: InputMaybe<Scalars['String']>;
};

export type IssueRelationCreateInput = {
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The identifier of the issue that is related to another issue. */
  issueId: Scalars['String'];
  /** The identifier of the related issue. */
  relatedIssueId: Scalars['String'];
  /** The type of relation of the issue to the related issue. */
  type: IssueRelationType;
};

/** The type of the issue relation. */
export type IssueRelationType =
  | 'blocks'
  | 'duplicate'
  | 'related';

export type IssueRelationUpdateInput = {
  /** The identifier of the issue that is related to another issue. */
  issueId?: InputMaybe<Scalars['String']>;
  /** The identifier of the related issue. */
  relatedIssueId?: InputMaybe<Scalars['String']>;
  /** The type of relation of the issue to the related issue. */
  type?: InputMaybe<Scalars['String']>;
};

export type IssueUpdateInput = {
  /** The identifier of the user to assign the issue to. */
  assigneeId?: InputMaybe<Scalars['String']>;
  /** The position of the issue in its column on the board view. */
  boardOrder?: InputMaybe<Scalars['Float']>;
  /** The cycle associated with the issue. */
  cycleId?: InputMaybe<Scalars['String']>;
  /** The issue description in markdown format. */
  description?: InputMaybe<Scalars['String']>;
  /** The issue description as a Prosemirror document. */
  descriptionData?: InputMaybe<Scalars['JSON']>;
  /** The date at which the issue is due. */
  dueDate?: InputMaybe<Scalars['TimelessDate']>;
  /** The estimated complexity of the issue. */
  estimate?: InputMaybe<Scalars['Int']>;
  /** The identifiers of the issue labels associated with this ticket. */
  labelIds?: InputMaybe<Array<Scalars['String']>>;
  /** The identifier of the parent issue. */
  parentId?: InputMaybe<Scalars['String']>;
  /** The priority of the issue. */
  priority?: InputMaybe<Scalars['Int']>;
  /** The project associated with the issue. */
  projectId?: InputMaybe<Scalars['String']>;
  /** [ALPHA] The project milestone associated with the issue. */
  projectMilestoneId?: InputMaybe<Scalars['String']>;
  /** [Internal] The timestamp at which an issue will be considered in breach of SLA. */
  slaBreachesAt?: InputMaybe<Scalars['DateTime']>;
  /** The identifier of the user who snoozed the issue. */
  snoozedById?: InputMaybe<Scalars['String']>;
  /** The time until an issue will be snoozed in Triage view. */
  snoozedUntilAt?: InputMaybe<Scalars['DateTime']>;
  /** The position of the issue related to other issues. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** The team state of the issue. */
  stateId?: InputMaybe<Scalars['String']>;
  /** The position of the issue in parent's sub-issue list. */
  subIssueSortOrder?: InputMaybe<Scalars['Float']>;
  /** The identifiers of the users subscribing to this ticket. */
  subscriberIds?: InputMaybe<Array<Scalars['String']>>;
  /** The identifier or key of the team associated with the issue. */
  teamId?: InputMaybe<Scalars['String']>;
  /** The issue title. */
  title?: InputMaybe<Scalars['String']>;
  /** Wether the issue has been trashed. */
  trashed?: InputMaybe<Scalars['Boolean']>;
};

export type JiraConfigurationInput = {
  /** The Jira personal access token. */
  accessToken: Scalars['String'];
  /** The Jira user's email address. */
  email: Scalars['String'];
  /** The Jira installation hostname. */
  hostname: Scalars['String'];
  /** The Jira project keys to scope the integration to. */
  project?: InputMaybe<Scalars['String']>;
};

export type JiraLinearMappingInput = {
  /** The Jira id for this project. */
  jiraProjectId: Scalars['String'];
  /** The Linear team id to map to the given project. */
  linearTeamId: Scalars['String'];
};

export type JiraProjectDataInput = {
  /** The Jira id for this project. */
  id: Scalars['String'];
  /** The Jira key for this project, such as ENG. */
  key: Scalars['String'];
  /** The Jira name for this project, such as Engineering. */
  name: Scalars['String'];
};

export type JiraSettingsInput = {
  /** The mapping of Jira project id => Linear team id. */
  projectMapping?: InputMaybe<Array<JiraLinearMappingInput>>;
  /** The Jira projects for the organization. */
  projects: Array<JiraProjectDataInput>;
};

export type JoinOrganizationInput = {
  /** The identifier of the organization. */
  organizationId: Scalars['String'];
};

export type MilestoneCreateInput = {
  /** [ALPHA] The description for the milestone. */
  description?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The name of the milestone. */
  name: Scalars['String'];
  /** The sort order of the milestone. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** [ALPHA] The planned target date of the milestone. */
  targetDate?: InputMaybe<Scalars['TimelessDate']>;
  /** [ALPHA] The identifiers of the teams this milestone is associated with. */
  teamIds?: InputMaybe<Array<Scalars['String']>>;
};

export type MilestoneUpdateInput = {
  /** [ALPHA] The description for the milestone. */
  description?: InputMaybe<Scalars['String']>;
  /** The name of the milestone. */
  name?: InputMaybe<Scalars['String']>;
  /** The sort order of the milestone. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** [ALPHA] The planned target date of the milestone. */
  targetDate?: InputMaybe<Scalars['TimelessDate']>;
  /** [ALPHA] The identifiers of the teams this milestone is associated with. */
  teamIds?: InputMaybe<Array<Scalars['String']>>;
};

export type MilestonesMigrateInput = {
  /** IDs of the milestones to delete. */
  milestonesToDelete?: InputMaybe<Array<Scalars['String']>>;
  /** IDs of the milestones to migrate. */
  milestonesToMigrate?: InputMaybe<Array<Scalars['String']>>;
};

export type NotificationSubscriptionCreateInput = {
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The identifier of the project to subscribe to. */
  projectId?: InputMaybe<Scalars['String']>;
  /** The type of the project subscription. */
  projectNotificationSubscriptionType?: InputMaybe<ProjectNotificationSubscriptionType>;
  /** The identifier of the team to subscribe to. */
  teamId?: InputMaybe<Scalars['String']>;
  /** The types of notifications of the team subscription. */
  teamNotificationSubscriptionTypes?: InputMaybe<Array<Scalars['String']>>;
};

export type NotificationSubscriptionUpdateInput = {
  /** The type of the project subscription. */
  projectNotificationSubscriptionType?: InputMaybe<ProjectNotificationSubscriptionType>;
  /** The types of notifications of the team subscription. */
  teamNotificationSubscriptionTypes?: InputMaybe<Array<Scalars['String']>>;
};

export type NotificationUpdateInput = {
  /** The id of the project update related to the notification. */
  projectUpdateId?: InputMaybe<Scalars['String']>;
  /** The time when notification was marked as read. */
  readAt?: InputMaybe<Scalars['DateTime']>;
  /** The time until a notification will be snoozed. After that it will appear in the inbox again. */
  snoozedUntilAt?: InputMaybe<Scalars['DateTime']>;
};

/** Cycle filtering options. */
export type NullableCycleFilter = {
  /** Compound filters, one of which need to be matched by the cycle. */
  and?: InputMaybe<Array<NullableCycleFilter>>;
  /** Comparator for the cycle completed at date. */
  completedAt?: InputMaybe<DateComparator>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Comparator for the cycle ends at date. */
  endsAt?: InputMaybe<DateComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Comparator for the filtering active cycle. */
  isActive?: InputMaybe<BooleanComparator>;
  /** Comparator for the filtering future cycles. */
  isFuture?: InputMaybe<BooleanComparator>;
  /** Comparator for the filtering next cycle. */
  isNext?: InputMaybe<BooleanComparator>;
  /** Comparator for the filtering past cycles. */
  isPast?: InputMaybe<BooleanComparator>;
  /** Comparator for the filtering previous cycle. */
  isPrevious?: InputMaybe<BooleanComparator>;
  /** Filters that the cycles issues must satisfy. */
  issues?: InputMaybe<IssueCollectionFilter>;
  /** Comparator for the cycle name. */
  name?: InputMaybe<StringComparator>;
  /** Filter based on the existence of the relation. */
  null?: InputMaybe<Scalars['Boolean']>;
  /** Comparator for the cycle number. */
  number?: InputMaybe<NumberComparator>;
  /** Compound filters, one of which need to be matched by the cycle. */
  or?: InputMaybe<Array<NullableCycleFilter>>;
  /** Comparator for the cycle start date. */
  startsAt?: InputMaybe<DateComparator>;
  /** Filters that the cycles team must satisfy. */
  team?: InputMaybe<TeamFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

/** Comparator for optional dates. */
export type NullableDateComparator = {
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['DateTime']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['DateTime']>>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: InputMaybe<Scalars['Boolean']>;
};

/** Issue filtering options. */
export type NullableIssueFilter = {
  /** Compound filters, all of which need to be matched by the issue. */
  and?: InputMaybe<Array<NullableIssueFilter>>;
  /** Filters that the issues assignee must satisfy. */
  assignee?: InputMaybe<NullableUserFilter>;
  /** Filters that the issues attachments must satisfy. */
  attachments?: InputMaybe<AttachmentCollectionFilter>;
  /** Comparator for the issues auto archived at date. */
  autoArchivedAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the issues auto closed at date. */
  autoClosedAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the issues canceled at date. */
  canceledAt?: InputMaybe<NullableDateComparator>;
  /** Filters that the child issues must satisfy. */
  children?: InputMaybe<IssueCollectionFilter>;
  /** Filters that the issues comments must satisfy. */
  comments?: InputMaybe<CommentCollectionFilter>;
  /** Comparator for the issues completed at date. */
  completedAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the issues creator must satisfy. */
  creator?: InputMaybe<NullableUserFilter>;
  /** Filters that the issues cycle must satisfy. */
  cycle?: InputMaybe<NullableCycleFilter>;
  /** Comparator for the issues description. */
  description?: InputMaybe<NullableStringComparator>;
  /** Comparator for the issues due date. */
  dueDate?: InputMaybe<NullableTimelessDateComparator>;
  /** Comparator for the issues estimate. */
  estimate?: InputMaybe<EstimateComparator>;
  /** Comparator for filtering issues which are blocked. */
  hasBlockedByRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for filtering issues which are blocking. */
  hasBlockingRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for filtering issues which are duplicates. */
  hasDuplicateRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for filtering issues with relations. */
  hasRelatedRelations?: InputMaybe<RelationExistsComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filters that issue labels must satisfy. */
  labels?: InputMaybe<IssueLabelCollectionFilter>;
  /** Filter based on the existence of the relation. */
  null?: InputMaybe<Scalars['Boolean']>;
  /** Comparator for the issues number. */
  number?: InputMaybe<NumberComparator>;
  /** Compound filters, one of which need to be matched by the issue. */
  or?: InputMaybe<Array<NullableIssueFilter>>;
  /** Filters that the issue parent must satisfy. */
  parent?: InputMaybe<NullableIssueFilter>;
  /** Comparator for the issues priority. */
  priority?: InputMaybe<NullableNumberComparator>;
  /** Filters that the issues project must satisfy. */
  project?: InputMaybe<NullableProjectFilter>;
  /** [Internal] Comparator for the issues content. */
  searchableContent?: InputMaybe<ContentComparator>;
  /** Filters that the issues snoozer must satisfy. */
  snoozedBy?: InputMaybe<NullableUserFilter>;
  /** Comparator for the issues snoozed until date. */
  snoozedUntilAt?: InputMaybe<NullableDateComparator>;
  /** Comparator for the issues started at date. */
  startedAt?: InputMaybe<NullableDateComparator>;
  /** Filters that the issues state must satisfy. */
  state?: InputMaybe<WorkflowStateFilter>;
  /** Filters that issue subscribers must satisfy. */
  subscribers?: InputMaybe<UserCollectionFilter>;
  /** Filters that the issues team must satisfy. */
  team?: InputMaybe<TeamFilter>;
  /** Comparator for the issues title. */
  title?: InputMaybe<StringComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

/** Comparator for optional numbers. */
export type NullableNumberComparator = {
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['Float']>;
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: InputMaybe<Scalars['Float']>;
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: InputMaybe<Scalars['Float']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['Float']>>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: InputMaybe<Scalars['Float']>;
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: InputMaybe<Scalars['Float']>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['Float']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['Float']>>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: InputMaybe<Scalars['Boolean']>;
};

/** Project filtering options. */
export type NullableProjectFilter = {
  /** Compound filters, all of which need to be matched by the project. */
  and?: InputMaybe<Array<NullableProjectFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the projects creator must satisfy. */
  creator?: InputMaybe<UserFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filters that the projects issues must satisfy. */
  issues?: InputMaybe<IssueCollectionFilter>;
  /** Filters that the projects lead must satisfy. */
  lead?: InputMaybe<NullableUserFilter>;
  /** Filters that the projects members must satisfy. */
  members?: InputMaybe<UserFilter>;
  /** Comparator for the project name. */
  name?: InputMaybe<StringComparator>;
  /** Filter based on the existence of the relation. */
  null?: InputMaybe<Scalars['Boolean']>;
  /** Compound filters, one of which need to be matched by the project. */
  or?: InputMaybe<Array<NullableProjectFilter>>;
  /** Filters that the projects roadmaps must satisfy. */
  roadmaps?: InputMaybe<RoadmapCollectionFilter>;
  /** Comparator for the project slug ID. */
  slugId?: InputMaybe<StringComparator>;
  /** Comparator for the project start date. */
  startDate?: InputMaybe<NullableDateComparator>;
  /** Comparator for the project state. */
  state?: InputMaybe<StringComparator>;
  /** Comparator for the project target date. */
  targetDate?: InputMaybe<NullableDateComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

/** Comparator for optional strings. */
export type NullableStringComparator = {
  /** Contains constraint. Matches any values that contain the given string. */
  contains?: InputMaybe<Scalars['String']>;
  /** Contains case insensitive constraint. Matches any values that contain the given string case insensitive. */
  containsIgnoreCase?: InputMaybe<Scalars['String']>;
  /** Ends with constraint. Matches any values that end with the given string. */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['String']>;
  /** Equals case insensitive. Matches any values that matches the given string case insensitive. */
  eqIgnoreCase?: InputMaybe<Scalars['String']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['String']>;
  /** Not-equals case insensitive. Matches any values that don't match the given string case insensitive. */
  neqIgnoreCase?: InputMaybe<Scalars['String']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['String']>>;
  /** Doesn't contain constraint. Matches any values that don't contain the given string. */
  notContains?: InputMaybe<Scalars['String']>;
  /** Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive. */
  notContainsIgnoreCase?: InputMaybe<Scalars['String']>;
  /** Doesn't end with constraint. Matches any values that don't end with the given string. */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Doesn't start with constraint. Matches any values that don't start with the given string. */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: InputMaybe<Scalars['Boolean']>;
  /** Starts with constraint. Matches any values that start with the given string. */
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NullableTimelessDateComparator = {
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['TimelessDate']>;
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: InputMaybe<Scalars['TimelessDate']>;
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: InputMaybe<Scalars['TimelessDate']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['TimelessDate']>>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: InputMaybe<Scalars['TimelessDate']>;
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: InputMaybe<Scalars['TimelessDate']>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['TimelessDate']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['TimelessDate']>>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: InputMaybe<Scalars['Boolean']>;
};

/** User filtering options. */
export type NullableUserFilter = {
  /** Comparator for the user's activity status. */
  active?: InputMaybe<BooleanComparator>;
  /** Comparator for the user's admin status. */
  admin?: InputMaybe<BooleanComparator>;
  /** Compound filters, all of which need to be matched by the user. */
  and?: InputMaybe<Array<NullableUserFilter>>;
  /** Filters that the users assigned issues must satisfy. */
  assignedIssues?: InputMaybe<IssueCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Comparator for the user's display name. */
  displayName?: InputMaybe<StringComparator>;
  /** Comparator for the user's email. */
  email?: InputMaybe<StringComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user. */
  isMe?: InputMaybe<BooleanComparator>;
  /** Comparator for the user's name. */
  name?: InputMaybe<StringComparator>;
  /** Filter based on the existence of the relation. */
  null?: InputMaybe<Scalars['Boolean']>;
  /** Compound filters, one of which need to be matched by the user. */
  or?: InputMaybe<Array<NullableUserFilter>>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

/** Comparator for numbers. */
export type NumberComparator = {
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['Float']>;
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: InputMaybe<Scalars['Float']>;
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: InputMaybe<Scalars['Float']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['Float']>>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: InputMaybe<Scalars['Float']>;
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: InputMaybe<Scalars['Float']>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['Float']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['Float']>>;
};

/** The different requests statuses possible for an OAuth client approval request */
export type OAuthClientApprovalStatus =
  | 'approved'
  | 'denied'
  | 'requested';

export type OnboardingCustomerSurvey = {
  companyRole?: InputMaybe<Scalars['String']>;
  companySize?: InputMaybe<Scalars['String']>;
};

/** What type of auth is the domain used for. */
export type OrganizationDomainAuthType =
  | 'general'
  | 'saml';

export type OrganizationDomainCreateInput = {
  /** The authentication type this domain is for. */
  authType?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The domain name to add. */
  name: Scalars['String'];
  /** The email address to which to send the verification code. */
  verificationEmail?: InputMaybe<Scalars['String']>;
};

export type OrganizationDomainVerificationInput = {
  /** The identifier in UUID v4 format of the domain being verified. */
  organizationDomainId: Scalars['String'];
  /** The verification code sent via email. */
  verificationCode: Scalars['String'];
};

export type OrganizationInviteCreateInput = {
  /** The email of the invitee. */
  email: Scalars['String'];
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The message to send to the invitee. */
  message?: InputMaybe<Scalars['String']>;
  /** What user role the invite should grant. */
  role?: InputMaybe<UserRoleType>;
  /** The teams that the user has been invited to. */
  teamIds?: InputMaybe<Array<Scalars['String']>>;
};

export type OrganizationInviteUpdateInput = {
  /** The teams that the user has been invited to. */
  teamIds: Array<Scalars['String']>;
};

/** By which field should the pagination order by */
export type PaginationOrderBy =
  | 'createdAt'
  | 'updatedAt';

/** Project filtering options. */
export type ProjectCollectionFilter = {
  /** Compound filters, all of which need to be matched by the project. */
  and?: InputMaybe<Array<ProjectCollectionFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the projects creator must satisfy. */
  creator?: InputMaybe<UserFilter>;
  /** Filters that needs to be matched by all projects. */
  every?: InputMaybe<ProjectFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filters that the projects issues must satisfy. */
  issues?: InputMaybe<IssueCollectionFilter>;
  /** Filters that the projects lead must satisfy. */
  lead?: InputMaybe<NullableUserFilter>;
  /** Comparator for the collection length. */
  length?: InputMaybe<NumberComparator>;
  /** Filters that the projects members must satisfy. */
  members?: InputMaybe<UserFilter>;
  /** Comparator for the project name. */
  name?: InputMaybe<StringComparator>;
  /** Compound filters, one of which need to be matched by the project. */
  or?: InputMaybe<Array<ProjectCollectionFilter>>;
  /** Filters that the projects roadmaps must satisfy. */
  roadmaps?: InputMaybe<RoadmapCollectionFilter>;
  /** Comparator for the project slug ID. */
  slugId?: InputMaybe<StringComparator>;
  /** Filters that needs to be matched by some projects. */
  some?: InputMaybe<ProjectFilter>;
  /** Comparator for the project start date. */
  startDate?: InputMaybe<NullableDateComparator>;
  /** Comparator for the project state. */
  state?: InputMaybe<StringComparator>;
  /** Comparator for the project target date. */
  targetDate?: InputMaybe<NullableDateComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

export type ProjectCreateInput = {
  /** The color of the project. */
  color?: InputMaybe<Scalars['String']>;
  /** The ID of the issue from which that project is created. */
  convertedFromIssueId?: InputMaybe<Scalars['String']>;
  /** The description for the project. */
  description?: InputMaybe<Scalars['String']>;
  /** The icon of the project. */
  icon?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The identifier of the project lead. */
  leadId?: InputMaybe<Scalars['String']>;
  /** The identifiers of the members of this project. */
  memberIds?: InputMaybe<Array<Scalars['String']>>;
  /** The identifier of the milestone to associate the project with. */
  milestoneId?: InputMaybe<Scalars['String']>;
  /** The name of the project. */
  name: Scalars['String'];
  /** The sort order for the project within shared views. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** The planned start date of the project. */
  startDate?: InputMaybe<Scalars['TimelessDate']>;
  /** The state of the project. */
  state?: InputMaybe<Scalars['String']>;
  /** The planned target date of the project. */
  targetDate?: InputMaybe<Scalars['TimelessDate']>;
  /** The identifiers of the teams this project is associated with. */
  teamIds: Array<Scalars['String']>;
};

/** Project filtering options. */
export type ProjectFilter = {
  /** Compound filters, all of which need to be matched by the project. */
  and?: InputMaybe<Array<ProjectFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the projects creator must satisfy. */
  creator?: InputMaybe<UserFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filters that the projects issues must satisfy. */
  issues?: InputMaybe<IssueCollectionFilter>;
  /** Filters that the projects lead must satisfy. */
  lead?: InputMaybe<NullableUserFilter>;
  /** Filters that the projects members must satisfy. */
  members?: InputMaybe<UserFilter>;
  /** Comparator for the project name. */
  name?: InputMaybe<StringComparator>;
  /** Compound filters, one of which need to be matched by the project. */
  or?: InputMaybe<Array<ProjectFilter>>;
  /** Filters that the projects roadmaps must satisfy. */
  roadmaps?: InputMaybe<RoadmapCollectionFilter>;
  /** Comparator for the project slug ID. */
  slugId?: InputMaybe<StringComparator>;
  /** Comparator for the project start date. */
  startDate?: InputMaybe<NullableDateComparator>;
  /** Comparator for the project state. */
  state?: InputMaybe<StringComparator>;
  /** Comparator for the project target date. */
  targetDate?: InputMaybe<NullableDateComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

export type ProjectLinkCreateInput = {
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The label for the link. */
  label: Scalars['String'];
  /** Related project for the link. */
  projectId: Scalars['String'];
  /** The URL of the link. */
  url: Scalars['String'];
};

export type ProjectLinkUpdateInput = {
  /** The label for the link. */
  label?: InputMaybe<Scalars['String']>;
  /** The URL of the link. */
  url?: InputMaybe<Scalars['String']>;
};

export type ProjectMilestoneCreateInput = {
  /** The description of the project milestone. */
  description?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The name of the project milestone. */
  name: Scalars['String'];
  /** Related project for the project milestone. */
  projectId: Scalars['String'];
  /** The planned target date of the project milestone. */
  targetDate?: InputMaybe<Scalars['TimelessDate']>;
};

export type ProjectMilestoneUpdateInput = {
  /** The description of the project milestone. */
  description?: InputMaybe<Scalars['String']>;
  /** The name of the project milestone. */
  name?: InputMaybe<Scalars['String']>;
  /** Related project for the project milestone. */
  projectId?: InputMaybe<Scalars['String']>;
  /** The planned target date of the project milestone. */
  targetDate?: InputMaybe<Scalars['TimelessDate']>;
};

/** The type of a project notification subscription. */
export type ProjectNotificationSubscriptionType =
  | 'all'
  | 'custom'
  | 'importantOnly';

export type ProjectUpdateCreateInput = {
  /** The content of the project update in markdown format. */
  body?: InputMaybe<Scalars['String']>;
  /** The content of the project update as a Prosemirror document. */
  bodyData?: InputMaybe<Scalars['JSON']>;
  /** The health of the project at the time of the update. */
  health?: InputMaybe<ProjectUpdateHealthType>;
  /** The identifier. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The project to associate the project update with. */
  projectId: Scalars['String'];
};

/** The health type of a project when the update is created. */
export type ProjectUpdateHealthType =
  | 'atRisk'
  | 'offTrack'
  | 'onTrack';

export type ProjectUpdateInput = {
  /** The date when the project was canceled. */
  canceledAt?: InputMaybe<Scalars['DateTime']>;
  /** The color of the project. */
  color?: InputMaybe<Scalars['String']>;
  /** The date when the project was completed. */
  completedAt?: InputMaybe<Scalars['DateTime']>;
  /** The ID of the issue from which that project is created. */
  convertedFromIssueId?: InputMaybe<Scalars['String']>;
  /** The description for the project. */
  description?: InputMaybe<Scalars['String']>;
  /** The icon of the project. */
  icon?: InputMaybe<Scalars['String']>;
  /** The identifier of the project lead. */
  leadId?: InputMaybe<Scalars['String']>;
  /** The identifiers of the members of this project. */
  memberIds?: InputMaybe<Array<Scalars['String']>>;
  /** The identifier of the milestone to associate the project with. */
  milestoneId?: InputMaybe<Scalars['String']>;
  /** The name of the project. */
  name?: InputMaybe<Scalars['String']>;
  /** The time until which project update reminders are paused. */
  projectUpdateRemindersPausedUntilAt?: InputMaybe<Scalars['DateTime']>;
  /** Whether to send new issue comment notifications to Slack. */
  slackIssueComments?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send issue status update notifications to Slack. */
  slackIssueStatuses?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send new issue notifications to Slack. */
  slackNewIssue?: InputMaybe<Scalars['Boolean']>;
  /** The sort order for the project in shared views. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** The planned start date of the project. */
  startDate?: InputMaybe<Scalars['TimelessDate']>;
  /** The state of the project. */
  state?: InputMaybe<Scalars['String']>;
  /** The planned target date of the project. */
  targetDate?: InputMaybe<Scalars['TimelessDate']>;
  /** The identifiers of the teams this project is associated with. */
  teamIds?: InputMaybe<Array<Scalars['String']>>;
};

export type ProjectUpdateInteractionCreateInput = {
  /** The identifier. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The id of the project update that has been interacted with. */
  projectUpdateId: Scalars['String'];
  /** The time at which the user read the project update. */
  readAt: Scalars['DateTime'];
};

/** The frequency at which to send project update reminders. */
export type ProjectUpdateReminderFrequency =
  | 'never'
  | 'twoWeeks'
  | 'week';

export type ProjectUpdateUpdateInput = {
  /** The content of the project update in markdown format. */
  body?: InputMaybe<Scalars['String']>;
  /** The content of the project update as a Prosemirror document. */
  bodyData?: InputMaybe<Scalars['JSON']>;
  /** The health of the project at the time of the update. */
  health?: InputMaybe<ProjectUpdateHealthType>;
};

export type PushSubscriptionCreateInput = {
  /** The data of the subscription in stringified JSON format. */
  data: Scalars['String'];
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** Whether this is a subscription payload for Google Cloud Messaging or Apple Push Notification service */
  type?: InputMaybe<PushSubscriptionType>;
  /** The user identifier of the subscription. */
  userId: Scalars['String'];
};

/** The different push subscription types */
export type PushSubscriptionType =
  | 'apple'
  | 'web';

export type ReactionCreateInput = {
  /** The comment to associate the reaction with. */
  commentId?: InputMaybe<Scalars['String']>;
  /** The emoji the user reacted with. */
  emoji?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one */
  id?: InputMaybe<Scalars['String']>;
  /** The project update to associate the reaction with. */
  projectUpdateId?: InputMaybe<Scalars['String']>;
};

/** Comparator for relation existence. */
export type RelationExistsComparator = {
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['Boolean']>;
  /** Not equals constraint. */
  neq?: InputMaybe<Scalars['Boolean']>;
};

/** Roadmap collection filtering options. */
export type RoadmapCollectionFilter = {
  /** Compound filters, all of which need to be matched by the roadmap. */
  and?: InputMaybe<Array<RoadmapCollectionFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the roadmap creator must satisfy. */
  creator?: InputMaybe<UserFilter>;
  /** Filters that needs to be matched by all roadmaps. */
  every?: InputMaybe<RoadmapFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Comparator for the collection length. */
  length?: InputMaybe<NumberComparator>;
  /** Comparator for the roadmap name. */
  name?: InputMaybe<StringComparator>;
  /** Compound filters, one of which need to be matched by the roadmap. */
  or?: InputMaybe<Array<RoadmapCollectionFilter>>;
  /** Comparator for the roadmap slug ID. */
  slugId?: InputMaybe<StringComparator>;
  /** Filters that needs to be matched by some roadmaps. */
  some?: InputMaybe<RoadmapFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

export type RoadmapCreateInput = {
  /** The description of the roadmap. */
  description?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The name of the roadmap. */
  name: Scalars['String'];
  /** The owner of the roadmap */
  ownerId?: InputMaybe<Scalars['String']>;
};

/** Roadmap filtering options. */
export type RoadmapFilter = {
  /** Compound filters, all of which need to be matched by the roadmap. */
  and?: InputMaybe<Array<RoadmapFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Filters that the roadmap creator must satisfy. */
  creator?: InputMaybe<UserFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Comparator for the roadmap name. */
  name?: InputMaybe<StringComparator>;
  /** Compound filters, one of which need to be matched by the roadmap. */
  or?: InputMaybe<Array<RoadmapFilter>>;
  /** Comparator for the roadmap slug ID. */
  slugId?: InputMaybe<StringComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

export type RoadmapToProjectCreateInput = {
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The identifier of the project. */
  projectId: Scalars['String'];
  /** The identifier of the roadmap. */
  roadmapId: Scalars['String'];
  /** The sort order for the project within its milestone. */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

export type RoadmapToProjectUpdateInput = {
  /** The sort order for the project within its milestone. */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

export type RoadmapUpdateInput = {
  /** The description of the roadmap. */
  description?: InputMaybe<Scalars['String']>;
  /** The name of the roadmap. */
  name?: InputMaybe<Scalars['String']>;
  /** The owner of the roadmap */
  ownerId?: InputMaybe<Scalars['String']>;
};

export type SamlConfigurationInput = {
  /** The issuer's custom entity ID. */
  issuerEntityId?: InputMaybe<Scalars['String']>;
  /** Binding method for authentication call. Can be either `post` (default) or `redirect`. */
  ssoBinding?: InputMaybe<Scalars['String']>;
  /** Sign in endpoint URL for the identity provider. */
  ssoEndpoint?: InputMaybe<Scalars['String']>;
  /** The algorithm of the Signing Certificate. Can be one of `sha1`, `sha256` (default), or `sha512`. */
  ssoSignAlgo?: InputMaybe<Scalars['String']>;
  /** X.509 Signing Certificate in string form. */
  ssoSigningCert?: InputMaybe<Scalars['String']>;
};

export type SentrySettingsInput = {
  /** The slug of the Sentry organization being connected. */
  organizationSlug: Scalars['String'];
};

export type SlackPostSettingsInput = {
  channel: Scalars['String'];
  channelId: Scalars['String'];
  configurationUrl: Scalars['String'];
};

/** Comparator for `sourceType` field. */
export type SourceTypeComparator = {
  /** Contains constraint. Matches any values that contain the given string. */
  contains?: InputMaybe<Scalars['String']>;
  /** Contains case insensitive constraint. Matches any values that contain the given string case insensitive. */
  containsIgnoreCase?: InputMaybe<Scalars['String']>;
  /** Ends with constraint. Matches any values that end with the given string. */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['String']>;
  /** Equals case insensitive. Matches any values that matches the given string case insensitive. */
  eqIgnoreCase?: InputMaybe<Scalars['String']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['String']>;
  /** Not-equals case insensitive. Matches any values that don't match the given string case insensitive. */
  neqIgnoreCase?: InputMaybe<Scalars['String']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['String']>>;
  /** Doesn't contain constraint. Matches any values that don't contain the given string. */
  notContains?: InputMaybe<Scalars['String']>;
  /** Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive. */
  notContainsIgnoreCase?: InputMaybe<Scalars['String']>;
  /** Doesn't end with constraint. Matches any values that don't end with the given string. */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Doesn't start with constraint. Matches any values that don't start with the given string. */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Starts with constraint. Matches any values that start with the given string. */
  startsWith?: InputMaybe<Scalars['String']>;
};

/** Comparator for strings. */
export type StringComparator = {
  /** Contains constraint. Matches any values that contain the given string. */
  contains?: InputMaybe<Scalars['String']>;
  /** Contains case insensitive constraint. Matches any values that contain the given string case insensitive. */
  containsIgnoreCase?: InputMaybe<Scalars['String']>;
  /** Ends with constraint. Matches any values that end with the given string. */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['String']>;
  /** Equals case insensitive. Matches any values that matches the given string case insensitive. */
  eqIgnoreCase?: InputMaybe<Scalars['String']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['String']>;
  /** Not-equals case insensitive. Matches any values that don't match the given string case insensitive. */
  neqIgnoreCase?: InputMaybe<Scalars['String']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['String']>>;
  /** Doesn't contain constraint. Matches any values that don't contain the given string. */
  notContains?: InputMaybe<Scalars['String']>;
  /** Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive. */
  notContainsIgnoreCase?: InputMaybe<Scalars['String']>;
  /** Doesn't end with constraint. Matches any values that don't end with the given string. */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Doesn't start with constraint. Matches any values that don't start with the given string. */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Starts with constraint. Matches any values that start with the given string. */
  startsWith?: InputMaybe<Scalars['String']>;
};

export type TeamCreateInput = {
  /** Period after which closed and completed issues are automatically archived, in months. 0 means disabled. */
  autoArchivePeriod?: InputMaybe<Scalars['Float']>;
  /** Period after which issues are automatically closed, in months. */
  autoClosePeriod?: InputMaybe<Scalars['Float']>;
  /** The canceled workflow state which auto closed issues will be set to. */
  autoCloseStateId?: InputMaybe<Scalars['String']>;
  /** The color of the team. */
  color?: InputMaybe<Scalars['String']>;
  /** The cooldown time after each cycle in weeks. */
  cycleCooldownTime?: InputMaybe<Scalars['Int']>;
  /** The duration of each cycle in weeks. */
  cycleDuration?: InputMaybe<Scalars['Int']>;
  /** Auto assign completed issues to current active cycle setting. */
  cycleIssueAutoAssignCompleted?: InputMaybe<Scalars['Boolean']>;
  /** Auto assign started issues to current active cycle setting. */
  cycleIssueAutoAssignStarted?: InputMaybe<Scalars['Boolean']>;
  /** Only allow issues issues with cycles in Active Issues. */
  cycleLockToActive?: InputMaybe<Scalars['Boolean']>;
  /** The day of the week that a new cycle starts. */
  cycleStartDay?: InputMaybe<Scalars['Float']>;
  /** Whether the team uses cycles. */
  cyclesEnabled?: InputMaybe<Scalars['Boolean']>;
  /** What to use as an default estimate for unestimated issues. */
  defaultIssueEstimate?: InputMaybe<Scalars['Float']>;
  /** The identifier of the default template for members of this team. */
  defaultTemplateForMembersId?: InputMaybe<Scalars['String']>;
  /** The identifier of the default template for non-members of this team. */
  defaultTemplateForNonMembersId?: InputMaybe<Scalars['String']>;
  /** The description of the team. */
  description?: InputMaybe<Scalars['String']>;
  /** Whether to group recent issue history entries. */
  groupIssueHistory?: InputMaybe<Scalars['Boolean']>;
  /** The icon of the team. */
  icon?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** Whether to allow zeros in issues estimates. */
  issueEstimationAllowZero?: InputMaybe<Scalars['Boolean']>;
  /** Whether to add additional points to the estimate scale. */
  issueEstimationExtended?: InputMaybe<Scalars['Boolean']>;
  /** The issue estimation type to use. */
  issueEstimationType?: InputMaybe<Scalars['String']>;
  /** Whether issues without priority should be sorted first. */
  issueOrderingNoPriorityFirst?: InputMaybe<Scalars['Boolean']>;
  /** Whether to move issues to bottom of the column when changing state. */
  issueSortOrderDefaultToBottom?: InputMaybe<Scalars['Boolean']>;
  /** The key of the team. If not given, the key will be generated based on the name of the team. */
  key?: InputMaybe<Scalars['String']>;
  /** The workflow state into which issues are moved when they are marked as a duplicate of another issue. */
  markedAsDuplicateWorkflowStateId?: InputMaybe<Scalars['String']>;
  /** The name of the team. */
  name: Scalars['String'];
  /** The organization associated with the team. */
  organizationId?: InputMaybe<Scalars['String']>;
  /** Internal. Whether the team is private or not. */
  private?: InputMaybe<Scalars['Boolean']>;
  /** The timezone of the team. */
  timezone?: InputMaybe<Scalars['String']>;
  /** Whether triage mode is enabled for the team. */
  triageEnabled?: InputMaybe<Scalars['Boolean']>;
  /** How many upcoming cycles to create. */
  upcomingCycleCount?: InputMaybe<Scalars['Float']>;
};

/** Team filtering options. */
export type TeamFilter = {
  /** Compound filters, all of which need to be matched by the team. */
  and?: InputMaybe<Array<TeamFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Comparator for the team description. */
  description?: InputMaybe<NullableStringComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filters that the teams issues must satisfy. */
  issues?: InputMaybe<IssueCollectionFilter>;
  /** Comparator for the team key. */
  key?: InputMaybe<StringComparator>;
  /** Comparator for the team name. */
  name?: InputMaybe<StringComparator>;
  /** Compound filters, one of which need to be matched by the team. */
  or?: InputMaybe<Array<TeamFilter>>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

export type TeamMembershipCreateInput = {
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** Internal. Whether the user is the owner of the team. */
  owner?: InputMaybe<Scalars['Boolean']>;
  /** The position of the item in the users list. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** The identifier of the team associated with the membership. */
  teamId: Scalars['String'];
  /** The identifier of the user associated with the membership. */
  userId: Scalars['String'];
};

export type TeamMembershipUpdateInput = {
  /** Internal. Whether the user is the owner of the team. */
  owner?: InputMaybe<Scalars['Boolean']>;
  /** The position of the item in the users list. */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

export type TeamUpdateInput = {
  /** Period after which closed and completed issues are automatically archived, in months. */
  autoArchivePeriod?: InputMaybe<Scalars['Float']>;
  /** Period after which issues are automatically closed, in months. */
  autoClosePeriod?: InputMaybe<Scalars['Float']>;
  /** The canceled workflow state which auto closed issues will be set to. */
  autoCloseStateId?: InputMaybe<Scalars['String']>;
  /** The color of the team. */
  color?: InputMaybe<Scalars['String']>;
  /** The cooldown time after each cycle in weeks. */
  cycleCooldownTime?: InputMaybe<Scalars['Int']>;
  /** The duration of each cycle in weeks. */
  cycleDuration?: InputMaybe<Scalars['Int']>;
  /** Whether the first cycle should start in the current or the next week. */
  cycleEnabledStartWeek?: InputMaybe<Scalars['String']>;
  /** Auto assign completed issues to current active cycle setting. */
  cycleIssueAutoAssignCompleted?: InputMaybe<Scalars['Boolean']>;
  /** Auto assign started issues to current active cycle setting. */
  cycleIssueAutoAssignStarted?: InputMaybe<Scalars['Boolean']>;
  /** Only allow issues with cycles in Active Issues. */
  cycleLockToActive?: InputMaybe<Scalars['Boolean']>;
  /** The day of the week that a new cycle starts. */
  cycleStartDay?: InputMaybe<Scalars['Float']>;
  /** Whether the team uses cycles. */
  cyclesEnabled?: InputMaybe<Scalars['Boolean']>;
  /** What to use as an default estimate for unestimated issues. */
  defaultIssueEstimate?: InputMaybe<Scalars['Float']>;
  /** Default status for newly created issues. */
  defaultIssueStateId?: InputMaybe<Scalars['String']>;
  /** The identifier of the default template for members of this team. */
  defaultTemplateForMembersId?: InputMaybe<Scalars['String']>;
  /** The identifier of the default template for non-members of this team. */
  defaultTemplateForNonMembersId?: InputMaybe<Scalars['String']>;
  /** The description of the team. */
  description?: InputMaybe<Scalars['String']>;
  /** The workflow state into which issues are moved when a draft PR has been opened. */
  draftWorkflowStateId?: InputMaybe<Scalars['String']>;
  /** Whether to group recent issue history entries. */
  groupIssueHistory?: InputMaybe<Scalars['Boolean']>;
  /** The icon of the team. */
  icon?: InputMaybe<Scalars['String']>;
  /** Whether to allow zeros in issues estimates. */
  issueEstimationAllowZero?: InputMaybe<Scalars['Boolean']>;
  /** Whether to add additional points to the estimate scale. */
  issueEstimationExtended?: InputMaybe<Scalars['Boolean']>;
  /** The issue estimation type to use. */
  issueEstimationType?: InputMaybe<Scalars['String']>;
  /** Whether issues without priority should be sorted first. */
  issueOrderingNoPriorityFirst?: InputMaybe<Scalars['Boolean']>;
  /** Whether to move issues to bottom of the column when changing state. */
  issueSortOrderDefaultToBottom?: InputMaybe<Scalars['Boolean']>;
  /** The key of the team. */
  key?: InputMaybe<Scalars['String']>;
  /** The workflow state into which issues are moved when they are marked as a duplicate of another issue. */
  markedAsDuplicateWorkflowStateId?: InputMaybe<Scalars['String']>;
  /** The workflow state into which issues are moved when a PR has been merged. */
  mergeWorkflowStateId?: InputMaybe<Scalars['String']>;
  /** The name of the team. */
  name?: InputMaybe<Scalars['String']>;
  /** Whether the team is private or not. */
  private?: InputMaybe<Scalars['Boolean']>;
  /** The workflow state into which issues are moved when a review has been requested for the PR. */
  reviewWorkflowStateId?: InputMaybe<Scalars['String']>;
  /** Whether to send new issue comment notifications to Slack. */
  slackIssueComments?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send issue status update notifications to Slack. */
  slackIssueStatuses?: InputMaybe<Scalars['Boolean']>;
  /** Whether to send new issue notifications to Slack. */
  slackNewIssue?: InputMaybe<Scalars['Boolean']>;
  /** The workflow state into which issues are moved when a PR has been opened. */
  startWorkflowStateId?: InputMaybe<Scalars['String']>;
  /** The timezone of the team. */
  timezone?: InputMaybe<Scalars['String']>;
  /** Whether triage mode is enabled for the team. */
  triageEnabled?: InputMaybe<Scalars['Boolean']>;
  /** How many upcoming cycles to create. */
  upcomingCycleCount?: InputMaybe<Scalars['Float']>;
};

export type TemplateCreateInput = {
  /** The template description. */
  description?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The template name. */
  name: Scalars['String'];
  /** The identifier or key of the team associated with the template. If not given, the template will be shared across all teams. */
  teamId?: InputMaybe<Scalars['String']>;
  /** The template data as JSON encoded attributes of the type of entity, such as an issue. */
  templateData: Scalars['JSON'];
  /** The template type, e.g. 'issue'. */
  type: Scalars['String'];
};

export type TemplateUpdateInput = {
  /** The template description. */
  description?: InputMaybe<Scalars['String']>;
  /** The template name. */
  name?: InputMaybe<Scalars['String']>;
  /** The identifier or key of the team associated with the template. If set to null, the template will be shared across all teams. */
  teamId?: InputMaybe<Scalars['String']>;
  /** The template data as JSON encoded attributes of the type of entity, such as an issue. */
  templateData?: InputMaybe<Scalars['JSON']>;
};

/** Comparator for timeless dates. */
export type TimelessDateComparator = {
  /** Equals constraint. */
  eq?: InputMaybe<Scalars['TimelessDate']>;
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: InputMaybe<Scalars['TimelessDate']>;
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: InputMaybe<Scalars['TimelessDate']>;
  /** In-array constraint. */
  in?: InputMaybe<Array<Scalars['TimelessDate']>>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: InputMaybe<Scalars['TimelessDate']>;
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: InputMaybe<Scalars['TimelessDate']>;
  /** Not-equals constraint. */
  neq?: InputMaybe<Scalars['TimelessDate']>;
  /** Not-in-array constraint. */
  nin?: InputMaybe<Array<Scalars['TimelessDate']>>;
};

export type TokenUserAccountAuthInput = {
  /** The email which to login via the magic login code. */
  email: Scalars['String'];
  /** The identifiers of the teams to auto-join. */
  teamIdsToJoin?: InputMaybe<Array<Scalars['String']>>;
  /** The timezone of the user's browser. */
  timezone: Scalars['String'];
  /** The magic login code. */
  token: Scalars['String'];
};

export type UpdateOrganizationInput = {
  /** List of services that are allowed to be used for login. */
  allowedAuthServices?: InputMaybe<Array<Scalars['String']>>;
  /** How git branches are formatted. If null, default formatting will be used. */
  gitBranchFormat?: InputMaybe<Scalars['String']>;
  /** Whether the Git integration linkback messages should be sent for private repositories. */
  gitLinkbackMessagesEnabled?: InputMaybe<Scalars['Boolean']>;
  /** Whether the Git integration linkback messages should be sent for public repositories. */
  gitPublicLinkbackMessagesEnabled?: InputMaybe<Scalars['Boolean']>;
  /** Linear Preview feature flags */
  linearPreviewFlags?: InputMaybe<Scalars['JSONObject']>;
  /** The logo of the organization. */
  logoUrl?: InputMaybe<Scalars['String']>;
  /** The name of the organization. */
  name?: InputMaybe<Scalars['String']>;
  /** Whether the organization has opted for having to approve all OAuth applications for install. */
  oauthAppReview?: InputMaybe<Scalars['Boolean']>;
  /** The day at which project updates are sent. */
  projectUpdateRemindersDay?: InputMaybe<Day>;
  /** The hour at which project updates are sent. */
  projectUpdateRemindersHour?: InputMaybe<Scalars['Float']>;
  /** The frequency at which project updates are sent. */
  projectUpdatesReminderFrequency?: InputMaybe<ProjectUpdateReminderFrequency>;
  /** Whether the organization has opted for reduced customer support attachment information. */
  reducedPersonalInformation?: InputMaybe<Scalars['Boolean']>;
  /** Whether the organization is using roadmap. */
  roadmapEnabled?: InputMaybe<Scalars['Boolean']>;
  /** Internal. Whether SLA's have been enabled for the organization. */
  slaEnabled?: InputMaybe<Scalars['Boolean']>;
  /** The URL key of the organization. */
  urlKey?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  /** Whether the user account is active. */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Whether the user account has admin privileges. */
  admin?: InputMaybe<Scalars['Boolean']>;
  /** The avatar image URL of the user. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  /** The user description or a short bio. */
  description?: InputMaybe<Scalars['String']>;
  /** Reason for deactivation. */
  disableReason?: InputMaybe<Scalars['String']>;
  /** The display name of the user. */
  displayName?: InputMaybe<Scalars['String']>;
  /** The name of the user. */
  name?: InputMaybe<Scalars['String']>;
  /** The emoji part of the user status. */
  statusEmoji?: InputMaybe<Scalars['String']>;
  /** The label part of the user status. */
  statusLabel?: InputMaybe<Scalars['String']>;
  /** When the user status should be cleared. */
  statusUntilAt?: InputMaybe<Scalars['DateTime']>;
  /** The local timezone of the user. */
  timezone?: InputMaybe<Scalars['String']>;
};

/** User filtering options. */
export type UserCollectionFilter = {
  /** Comparator for the user's activity status. */
  active?: InputMaybe<BooleanComparator>;
  /** Comparator for the user's admin status. */
  admin?: InputMaybe<BooleanComparator>;
  /** Compound filters, all of which need to be matched by the user. */
  and?: InputMaybe<Array<UserCollectionFilter>>;
  /** Filters that the users assigned issues must satisfy. */
  assignedIssues?: InputMaybe<IssueCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Comparator for the user's display name. */
  displayName?: InputMaybe<StringComparator>;
  /** Comparator for the user's email. */
  email?: InputMaybe<StringComparator>;
  /** Filters that needs to be matched by all users. */
  every?: InputMaybe<UserFilter>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user. */
  isMe?: InputMaybe<BooleanComparator>;
  /** Comparator for the collection length. */
  length?: InputMaybe<NumberComparator>;
  /** Comparator for the user's name. */
  name?: InputMaybe<StringComparator>;
  /** Compound filters, one of which need to be matched by the user. */
  or?: InputMaybe<Array<UserCollectionFilter>>;
  /** Filters that needs to be matched by some users. */
  some?: InputMaybe<UserFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

/** User filtering options. */
export type UserFilter = {
  /** Comparator for the user's activity status. */
  active?: InputMaybe<BooleanComparator>;
  /** Comparator for the user's admin status. */
  admin?: InputMaybe<BooleanComparator>;
  /** Compound filters, all of which need to be matched by the user. */
  and?: InputMaybe<Array<UserFilter>>;
  /** Filters that the users assigned issues must satisfy. */
  assignedIssues?: InputMaybe<IssueCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Comparator for the user's display name. */
  displayName?: InputMaybe<StringComparator>;
  /** Comparator for the user's email. */
  email?: InputMaybe<StringComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user. */
  isMe?: InputMaybe<BooleanComparator>;
  /** Comparator for the user's name. */
  name?: InputMaybe<StringComparator>;
  /** Compound filters, one of which need to be matched by the user. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

/** The types of flags that the user can have. */
export type UserFlagType =
  | 'all'
  | 'analyticsWelcomeDismissed'
  | 'canPlaySnake'
  | 'canPlayTetris'
  | 'completedOnboarding'
  | 'cycleWelcomeDismissed'
  | 'desktopDownloadToastDismissed'
  | 'desktopInstalled'
  | 'dueDateShortcutMigration'
  | 'emptyActiveIssuesDismissed'
  | 'emptyBacklogDismissed'
  | 'emptyCustomViewsDismissed'
  | 'emptyMyIssuesDismissed'
  | 'figmaPromptDismissed'
  | 'importBannerDismissed'
  | 'insightsWelcomeDismissed'
  | 'issueLabelSuggestionUsed'
  | 'issueMovePromptCompleted'
  | 'joinTeamIntroductionDismissed'
  | 'listSelectionTip'
  | 'migrateThemePreference'
  | 'projectBacklogWelcomeDismissed'
  | 'projectUpdatesWelcomeDismissed'
  | 'projectWelcomeDismissed'
  | 'rewindBannerDismissed'
  | 'slackCommentReactionTipShown'
  | 'teamsPageIntroductionDismissed'
  | 'threadedCommentsNudgeIsSeen'
  | 'triageWelcomeDismissed';

/** Operations that can be applied to UserFlagType */
export type UserFlagUpdateOperation =
  | 'clear'
  | 'decr'
  | 'incr'
  | 'lock';

/** The different permission roles available to users on an organization */
export type UserRoleType =
  | 'admin'
  | 'guest'
  | 'user';

export type UserSettingsUpdateInput = {
  /** The user's notification preferences. */
  notificationPreferences?: InputMaybe<Scalars['JSONObject']>;
  /** The user's settings. */
  settings?: InputMaybe<Scalars['JSONObject']>;
  /** The types of emails the user has unsubscribed from. */
  unsubscribedFrom?: InputMaybe<Array<Scalars['String']>>;
};

export type ViewPreferencesCreateInput = {
  /** The custom view these view preferences are associated with. */
  customViewId?: InputMaybe<Scalars['String']>;
  /** The cycle these view preferences are associated with. */
  cycleId?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The label these view preferences are associated with. */
  labelId?: InputMaybe<Scalars['String']>;
  /** View preferences object. */
  preferences: Scalars['JSONObject'];
  /** The project these view preferences are associated with. */
  projectId?: InputMaybe<Scalars['String']>;
  /** The roadmap these view preferences are associated with. */
  roadmapId?: InputMaybe<Scalars['String']>;
  /** The team these view preferences are associated with. */
  teamId?: InputMaybe<Scalars['String']>;
  /** The type of view preferences (either user or organization level preferences). */
  type: ViewPreferencesType;
  /** The user profile these view preferences are associated with. */
  userId?: InputMaybe<Scalars['String']>;
  /** The view type of the view preferences are associated with. */
  viewType: ViewType;
};

/** The type of view preferences (either user or organization level preferences). */
export type ViewPreferencesType =
  | 'organization'
  | 'user';

export type ViewPreferencesUpdateInput = {
  /** View preferences. */
  preferences: Scalars['JSONObject'];
};

/** The client view this custom view is targeting. */
export type ViewType =
  | 'activeIssues'
  | 'allIssues'
  | 'archive'
  | 'backlog'
  | 'board'
  | 'completedCycle'
  | 'customRoadmap'
  | 'customView'
  | 'cycle'
  | 'inbox'
  | 'label'
  | 'myIssues'
  | 'myIssuesActivity'
  | 'myIssuesCreatedByMe'
  | 'myIssuesSubscribedTo'
  | 'myIssuesTouchedByMe'
  | 'project'
  | 'projects'
  | 'projectsAll'
  | 'projectsBacklog'
  | 'projectsClosed'
  | 'roadmap'
  | 'roadmapAll'
  | 'roadmapBacklog'
  | 'roadmapClosed'
  | 'search'
  | 'teams'
  | 'triage'
  | 'userProfile'
  | 'userProfileCreatedByUser';

export type WebhookCreateInput = {
  /** Whether this webhook is enabled for all public teams. */
  allPublicTeams?: InputMaybe<Scalars['Boolean']>;
  /** Whether this webhook is enabled. */
  enabled?: InputMaybe<Scalars['Boolean']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** Label for the webhook. */
  label?: InputMaybe<Scalars['String']>;
  /** List of resources the webhook should subscribe to. */
  resourceTypes: Array<Scalars['String']>;
  /** An optional secret token used to sign the webhook payload. */
  secret?: InputMaybe<Scalars['String']>;
  /** The identifier or key of the team associated with the Webhook. */
  teamId?: InputMaybe<Scalars['String']>;
  /** The URL that will be called on data changes. */
  url: Scalars['String'];
};

export type WebhookUpdateInput = {
  /** Whether this webhook is enabled. */
  enabled?: InputMaybe<Scalars['Boolean']>;
  /** Label for the webhook. */
  label?: InputMaybe<Scalars['String']>;
  /** List of resources the webhook should subscribe to. */
  resourceTypes?: InputMaybe<Array<Scalars['String']>>;
  /** An optional secret token used to sign the Webhook payload. */
  secret?: InputMaybe<Scalars['String']>;
  /** The URL that will be called on data changes. */
  url?: InputMaybe<Scalars['String']>;
};

/** A condition to match for the workflow to be triggered. */
export type WorkflowCondition = {
  /** Trigger the workflow when an issue matches the filter. Can only be used when the trigger type is `Issue`. */
  issueFilter?: InputMaybe<IssueFilter>;
  /** Triggers the workflow when a project matches the filter. Can only be used when the trigger type is `Project`. */
  projectFilter?: InputMaybe<ProjectFilter>;
};

export type WorkflowStateCreateInput = {
  /** The color of the state. */
  color: Scalars['String'];
  /** The description of the state. */
  description?: InputMaybe<Scalars['String']>;
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: InputMaybe<Scalars['String']>;
  /** The name of the state. */
  name: Scalars['String'];
  /** The position of the state. */
  position?: InputMaybe<Scalars['Float']>;
  /** The team associated with the state. */
  teamId: Scalars['String'];
  /** The workflow type. */
  type: Scalars['String'];
};

/** Workflow state filtering options. */
export type WorkflowStateFilter = {
  /** Compound filters, all of which need to be matched by the workflow state. */
  and?: InputMaybe<Array<WorkflowStateFilter>>;
  /** Comparator for the created at date. */
  createdAt?: InputMaybe<DateComparator>;
  /** Comparator for the workflow state description. */
  description?: InputMaybe<StringComparator>;
  /** Comparator for the identifier. */
  id?: InputMaybe<IdComparator>;
  /** Filters that the workflow states issues must satisfy. */
  issues?: InputMaybe<IssueCollectionFilter>;
  /** Comparator for the workflow state name. */
  name?: InputMaybe<StringComparator>;
  /** Compound filters, one of which need to be matched by the workflow state. */
  or?: InputMaybe<Array<WorkflowStateFilter>>;
  /** Comparator for the workflow state position. */
  position?: InputMaybe<NumberComparator>;
  /** Filters that the workflow states team must satisfy. */
  team?: InputMaybe<TeamFilter>;
  /** Comparator for the workflow state type. */
  type?: InputMaybe<StringComparator>;
  /** Comparator for the updated at date. */
  updatedAt?: InputMaybe<DateComparator>;
};

export type WorkflowStateUpdateInput = {
  /** The color of the state. */
  color?: InputMaybe<Scalars['String']>;
  /** The description of the state. */
  description?: InputMaybe<Scalars['String']>;
  /** The name of the state. */
  name?: InputMaybe<Scalars['String']>;
  /** The position of the state. */
  position?: InputMaybe<Scalars['Float']>;
};

export type WorkflowTrigger =
  | 'cron'
  | 'entityCreated'
  | 'entityCreatedOrUpdated'
  | 'entityRemoved'
  | 'entityUnarchived'
  | 'entityUpdated';

export type WorkflowTriggerType =
  | 'Issue'
  | 'Project';

export type WorkflowType =
  | 'custom'
  | 'recurringIssue'
  | 'sla';

export type ZendeskSettingsInput = {
  /** Whether a ticket should be automatically reopened when its linked Linear issue is cancelled. */
  automateTicketReopeningOnCancellation?: InputMaybe<Scalars['Boolean']>;
  /** Whether a ticket should be automatically reopened when a comment is posted on its linked Linear issue */
  automateTicketReopeningOnComment?: InputMaybe<Scalars['Boolean']>;
  /** Whether a ticket should be automatically reopened when its linked Linear issue is completed. */
  automateTicketReopeningOnCompletion?: InputMaybe<Scalars['Boolean']>;
  /** The ID of the Linear bot user. */
  botUserId?: InputMaybe<Scalars['String']>;
  /** Whether an internal message should be added when someone comments on an issue. */
  sendNoteOnComment?: InputMaybe<Scalars['Boolean']>;
  /** Whether an internal message should be added when a Linear issue changes status (for status types except completed or canceled). */
  sendNoteOnStatusChange?: InputMaybe<Scalars['Boolean']>;
  /** The subdomain of the Zendesk organization being connected. */
  subdomain: Scalars['String'];
  /** The URL of the connected Zendesk organization. */
  url: Scalars['String'];
};

export type FindTeamPrefixesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindTeamPrefixesQuery = { __typename?: 'Query', teams: { __typename?: 'TeamConnection', nodes: Array<{ __typename?: 'Team', id: string, key: string }> } };

export type IssueFragment = { __typename?: 'Issue', id: string, identifier: string, title: string, description?: string | null, url: string, team: { __typename?: 'Team', id: string, key: string } };

export type GetIssueByKeyQueryVariables = Exact<{
  filter: IssueFilter;
}>;


export type GetIssueByKeyQuery = { __typename?: 'Query', issues: { __typename?: 'IssueConnection', nodes: Array<{ __typename?: 'Issue', id: string, identifier: string, title: string, description?: string | null, url: string, team: { __typename?: 'Team', id: string, key: string } }> } };

export type FindIssuesByTitleQueryVariables = Exact<{
  teamFilter: TeamFilter;
  issueFilter: IssueFilter;
}>;


export type FindIssuesByTitleQuery = { __typename?: 'Query', teams: { __typename?: 'TeamConnection', nodes: Array<{ __typename?: 'Team', id: string, issues: { __typename?: 'IssueConnection', nodes: Array<{ __typename?: 'Issue', id: string, identifier: string, title: string, description?: string | null, url: string, team: { __typename?: 'Team', id: string, key: string } }> } }> } };
