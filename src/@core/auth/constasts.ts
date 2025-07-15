/**
 * Las constantes de configuración para el tiempo de inactividad del usuario.
 * El tiempo de inactividad se define en minutos y se utiliza para determinar cuándo un usuario es considerado inactivo.
 */
export const IDLE_CONFIG = {
  IDLE_TIME: 30,
  WARNING_TIME: 25,
  WHITE_LIST: ['/login', '/login-callback', '/logout-callback'],
}
