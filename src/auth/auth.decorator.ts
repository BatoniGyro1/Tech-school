import { SetMetadata } from "@nestjs/common"

export const AUTH_GUARD_KEY = 'SICXE'
export const isPublic = (() => SetMetadata(AUTH_GUARD_KEY, true));