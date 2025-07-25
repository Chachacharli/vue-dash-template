# vue-dash-template

## 0.7.0 - 25/07/2025
### Resumen
Se agregan los graficos por defecto para el dashboard, permitiendo a los usuarios visualizar datos de manera efectiva. Estos gráficos son personalizables y se pueden integrar fácilmente en diferentes secciones del dashboard. Solo se integra BAR, LINE y SCATTER, pero se pueden agregar más tipos de gráficos según las necesidades del proyecto. (Utilizando la librería `vue-chartjs`)

## Mejoras
- CT [277] Implementación de gráficos por defecto para el dashboard:
    - Gráfico de barras (`BarChart`)
    - Gráfico de líneas (`LineChart`)
    - Gráfico de dispersión (`ScatterChart`)

## Correcciones 
 - CT [277] Se corrige un problema de renderizado en los gráficos cuando se actualizan los datos dinámicamente.

## Obsoleto


## 0.6.0 - 22/07/2025
### Resumen
Se agrega una serie de hooks para mejorar la experiencia de desarrollo y facilitar la integración de nuevas funcionalidades. Estos hooks permiten a los desarrolladores personalizar el comportamiento de la aplicación en diferentes etapas del ciclo de vida del componente.

## Mejoras
- CT [274] Implementación de hooks para mejorar la experiencia de desarrollo y facilitar la integración de nuevas funcionalidades:
    - `useDrag`: Permite manejar el arrastre de elementos en la interfaz de usuario.
    - `useSwipe`: Facilita la detección de gestos de deslizamiento en dispositivos táctiles.
    - `useFetch`: Simplifica la realización de peticiones HTTP y el manejo de estados de carga y error.
    - `useDebounce`: Implementa una función de debounce para optimizar el rendimiento de eventos que se disparan con frecuencia.
    - `useIDLE`: Proporciona un mecanismo para detectar la inactividad del usuario y ejecutar acciones específicas, como redirigir a una pantalla de bloqueo o cerrar sesión automáticamente.
    - `useTheme`: Permite gestionar el tema de la aplicación, incluyendo la implementación del dark mode y el hidratador de tema para mantener la preferencia del usuario entre sesiones.
  - CT [274] Se agrega un componente `DashSwipeContainer` que utiliza el hook `useSwipe` para manejar gestos de deslizamiento en la interfaz de usuario con animaciones.

### Correcciones

## Obsoleto

## 0.5.0 - 21/07/2025
### Resumen
Se agrega el darkmode a la aplicación, permitiendo a los usuarios cambiar entre el modo claro y oscuro. Se implementa el hidratador de tema para mantener la preferencia del usuario entre sesiones.

## Mejoras
- CT [273] Implementación del dakrmode en la aplicación.

### Correcciones

## Obsoleto

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