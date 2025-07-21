# vue-dash-template

# 0.4.0 - 20/07/2025
### Resumen
Se agregó sistema de **permisos y scopes** basado en los claims del usuario autenticado, también se implementó un **wrapper de loading global** (`RouterLoadingProvider`) que muestra un overlay mientras cambian las rutas.

## Mejoras
- CT [272] Implementación del sistema de permisos y scopes basado en los claims del usuario
- CT [272] Implementación del wrapper de loading global (`RouterLoadingProvider`)

### Correcciones

## Obsoleto



## 0.3.0 - 15/07/2025

### Resumen
Se agrega un componente de IDLEProvider para manejar el estado de inactividad del usuario en la aplicación. Este componente permite detectar cuando el usuario está inactivo y ejecutar acciones específicas, como redirigir a una pantalla de bloqueo o cerrar sesión automáticamente después de un período de inactividad. Se implementa un silent-renew para la autenticación OIDC, lo que mejora la experiencia del usuario al mantener la sesión activa sin necesidad de volver a iniciar sesión manualmente.

### Correcciones
//

### Mejoras
- CT [271] Implementación del componente IDLEProvider para manejar el estado de inactividad del usuario.
- CT [271] Agregado un silent-renew para la autenticación OIDC.

### Obsoleto
//

## 0.2.0 - 15/07/2025

### Resumen
Se agrega la funcionalidad de inicio de sesión utilizando OIDC (OpenID Connect) para mejorar la seguridad y la experiencia del usuario.
No es necesario utilizarlo directamente, ya que se ha implementado un servicio de autenticación separado y es posible integrarlo fácilmente en cualquier componente de la aplicación o utilizar otro método de autenticación.
Tambien se agregan pantallas para procesar el inicio de sesión y cierre de sesión, así como una pantalla de inicio de sesión personalizada.

### Correcciones
//

### Mejoras
- CT [270] Implementación del servicio de autenticación OIDC.
- CT [270] Agregado el componente de pantalla de inicio de sesión personalizado.
- CT [270] Agregado un AuthProvider para manejar la autenticación en toda la aplicación.

### Obsoleto
//

## 0.1.0
### 21/12/2024

- CT [ADD] Start project !! 🚀