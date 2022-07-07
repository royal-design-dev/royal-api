export enum Roles {
  None = 1 << 0,
  Designer = 1 << 1,
  DesignerPremium = 1 << 2,
  Admin = Designer | DesignerPremium,
}
