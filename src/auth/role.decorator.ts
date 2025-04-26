import { SetMetadata } from "@nestjs/common"
import { roles } from "./role.enum"


export const RoleGuard_KEY = 'roleguard'
export const ROLE_GUARD = ((...role: roles[]) => SetMetadata(RoleGuard_KEY, role))
