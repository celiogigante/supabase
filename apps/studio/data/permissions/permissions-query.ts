import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { get, handleError } from 'data/fetchers'
import { IS_PLATFORM } from 'lib/constants'
import { useProfile } from 'lib/profile'
import type { Permission, ResponseError } from 'types'
import { permissionKeys } from './keys'

export type PermissionsResponse = Permission[]

export async function getPermissions(signal?: AbortSignal) {
  const { data, error } = await get('/platform/profile/permissions', { signal })
  if (error) handleError(error)

  // [Joshen] TODO: Type this properly from the API
  return data as unknown as PermissionsResponse
}

export type PermissionsData = Awaited<ReturnType<typeof getPermissions>>
export type PermissionsError = ResponseError

export const usePermissionsQuery = <TData = PermissionsData>({
  enabled = true,
  ...options
}: UseQueryOptions<PermissionsData, PermissionsError, TData> = {}) => {
  const { profile } = useProfile()

  return useQuery<PermissionsData, PermissionsError, TData>(
    permissionKeys.list(),
    ({ signal }) => getPermissions(signal),
    {
      ...options,
      enabled: IS_PLATFORM && enabled && profile !== undefined,
      staleTime: 30 * 60 * 1000,
    }
  )
}
