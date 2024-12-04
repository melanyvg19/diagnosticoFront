export const rolesPermissions = {
  ADMIN: {
    canEdit: true,
    canDelete: true,
    canViewResults: false
  },
  CLIENTE: {
    canEdit: false,
    canDelete: false,
    canViewResults: true
  },
  SUPERVISOR: {
    canEdit: false,
    canDelete: false,
    canViewResults: false
  }
}

export const hasPermission = (role, permission) => {
  return rolesPermissions[role]?.[permission] || false
}

export const ROLES = {
  ADMIN: 'ADMIN',
  CLIENTE: 'CLIENTE',
  SUPERVISOR: 'SUPERVISOR'
}

export const PERMISSIONS = {
  canEdit: 'canEdit',
  canDelete: 'canDelete',
  canViewResults: 'canViewResults'
}
