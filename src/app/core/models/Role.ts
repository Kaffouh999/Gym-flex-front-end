export interface Role {
    id: number | undefined;
    name: string;
    description: string;
    analytics: boolean;
    membership: boolean;
    payments: boolean; // only if he has membership
    inventory: boolean;
    training: boolean;
    settings: boolean;
    preferences: boolean;
    manageWebSite: boolean;
    coach: boolean;
    blogs:boolean;
    store: boolean;
}
