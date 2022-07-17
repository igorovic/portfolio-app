export interface Permission {
  permission: string;
  status: string;
}

interface Paging {
  cursors: {
    before: string;
    after: string;
  };
}

export interface PermissionsResponse {
  data: Permission[];
}

export interface FacebookRerequestQueryParams extends Record<string, string> {
  client_id: string;
  redirect_uri: string;
  auth_type: "rerequest";
  scope: string;
}

export interface FacebookAccount {
  id: string;
  instagram_business_account?: {
    id: string;
  };
  access_token: string;
  category: string;
  category_list: Array<{ id: string; name: string }>;
  name: string;
  tasks: string[];
}

export interface FacebookAccountResponse {
  data: FacebookAccount[];
  paging: Paging;
}
