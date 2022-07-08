import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'role';

export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);

export const hasRole = (checkRole: Role, userRole: Role) =>
  (userRole & checkRole) === checkRole;
