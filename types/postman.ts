export interface BaseWorkspaceAttributes {
  id: string;
  type: string;
  name: string;
}

export interface Workspace extends BaseWorkspaceAttributes {
  collections: BaseCollectionAttributes[];
  description: string
  environments: BaseEnvironmentAttributes[];
  mocks: BaseMockAttributes[];
  monitors: BaseMonitorAttributes[];
}

export interface BaseCollectionAttributes {
  id: string;
  name: string;
  uid: string;
}


