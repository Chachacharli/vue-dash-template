# VUE-DASH-TEMPLATE

## Tabla de contenidos

- [VUE-DASH-TEMPLATE](#vue-dash-template)
  - [🚀 Descripción](#🚀-descripción)
  - [🛠️ Stack Tecnológico](#🛠️-stack-tecnológico)
  - [📂 Estructura del Proyecto](#📂-estructura-del-proyecto)
  - [🧪 Comandos para Desarrollo](#🧪-comandos-para-desarrollo)
  - [🔐 Autenticación OIDC](#🔐-autenticación-oidc)
    - [📁 Archivos clave:](#📁-archivos-clave:)
    - [✅ Flujo Implementado:](#✅-flujo-implementado:)
  - [🧭 Rutas protegidas](#🧭-rutas-protegidas)
  - [🧩 Cómo extender esta plantilla](#🧩-cómo-extender-esta-plantilla)


## 🚀 Descripción

Plantilla base moderna para construir dashboards y aplicaciones administrativas usando **Vue 3**, **TypeScript** y **Vite**. Incluye autenticación con **OIDC (OAuth 2.0 + PKCE)**, gestión de estado con **Pinia**, diseño con **Tailwind CSS**, y pruebas automatizadas con **Cypress**.

Ideal para proyectos empresariales, paneles de control, SPAs seguras y escalables desde el inicio.

---

## 🛠️ Stack Tecnológico

| Tecnología       | Descripción                                               |
|------------------|-----------------------------------------------------------|
| **Vue 3**        | Framework progresivo para construir interfaces de usuario.|
| **TypeScript**   | Superset de JavaScript con tipado estático.               |
| **Vite**         | Bundler ultrarrápido con soporte para HMR.                |
| **Pinia**        | Gestión de estado para Vue moderna, basada en Composition API. |
| **Vue Router**   | Enrutamiento dinámico y navegación SPA.                   |
| **Tailwind CSS** | Framework utilitario para estilos rápidos y personalizados. |
| **oidc-client-ts** | Cliente OIDC moderno con soporte para PKCE.             |
| **Cypress**      | Pruebas end-to-end potentes y fáciles de escribir.        |

---

## 📂 Estructura del Proyecto

```plaintext
    src/
    ├── assets/ # Recursos estáticos
    ├── components/ # Componentes reutilizables
    ├── layouts/ # Layouts principales
    ├── pages/ # Vistas y páginas del router
    ├── router/ # Configuración del enrutador
    ├── services/ # Servicios como JwtService, OidcService
    ├── stores/ # Pinia stores (gestión de estado)
    ├── styles/ # Archivos de estilo global
    ├── utils/ # Utilidades y helpers
```

---

## 🧪 Comandos para Desarrollo

| Comando                 | Descripción                                    |
|------------------------|------------------------------------------------|
| `npm run dev`          | Inicia el servidor de desarrollo               |
| `npm run build`        | Compila el proyecto para producción            |
| `npm run preview`      | Previsualiza la app en modo producción         |
| `npx cypress open`     | Abre la interfaz de Cypress                    |
| `npx cypress run`      | Ejecuta las pruebas E2E en modo headless       |

---

## 🔐 Autenticación OIDC

La autenticación está basada en el estándar **OpenID Connect** con el flujo de autorización **PKCE** (Proof Key for Code Exchange), usando la librería `oidc-client-ts`.

### 📁 Archivos clave:
- `src/services/OidcService.ts`: Encapsula toda la lógica de inicio/cierre de sesión, manejo de tokens, renovación silenciosa, etc.
- `src/router/index.ts`: Incluye rutas de callback como `/auth/callback` y middleware para proteger rutas.

### ✅ Flujo Implementado:
- Login por redirección (`signinRedirect`)
- Callback automático (`signinRedirectCallback`)
- Renovación automática de tokens (`automaticSilentRenew`)
- Logout con redirección (`signoutRedirect`)

Puedes configurar los endpoints y client ID en `oidcConfig.ts`.

---

## 🧭 Rutas protegidas

Ciertas vistas están protegidas con un guard de navegación que verifica si el usuario está autenticado. Si no lo está, se redirige automáticamente a la página de login.

```ts
router.beforeEach(async (to, _, next) => {
  const isLoggedIn = await OidcService.isLoggedIn()
  if (to.meta.requiresAuth && !isLoggedIn) {
    return OidcService.signinRedirect()
  }
  next()
})
```

## Sistema de Roles y Scopes
Esta plantilla incluye un sistema completo de permisos basado en los claims del usuario autenticado desde OIDC (oidc-client-ts). Se centraliza en un AuthProvider que provee los datos del usuario, y una authStore (Pinia) que sincroniza los claims como role, permissions, etc.

Las rutas pueden restringirse usando meta.roles o meta.requiresAuth.

Se puede validar acceso granular con un composable:

```ts
const { can, hasPermission } = usePermissions()

can(['admin']) // true si el usuario tiene el rol
hasPermission('user:delete') // true si tiene el scope
```
También puedes usar el componente <Can /> para mostrar u ocultar contenido según permisos.

```vue
<Can I="view" a="dashboard">
  <p>Contenido protegido para usuarios con permiso para ver el dashboard.</p>
</Can>
```

### Componente `<Can />`
Componente `<Can />`
Este componente permite mostrar u ocultar contenido basado en:

- Roles (props.roles)
- Permisos o scopes (props.permissions)

Archivo: `src/components/auth/Can.vue`
```vue
  <script setup lang="ts">
  import { usePermissions } from '@/composables/usePermissions'

  const props = defineProps<{
    roles?: string[] | string
    permissions?: string[] | string
  }>()

  const { can, hasPermission } = usePermissions()

  const isAllowed = computed(() => {
    if (props.roles) {
      const roles = Array.isArray(props.roles) ? props.roles : [props.roles]
      return can(roles)
    }

    if (props.permissions) {
      const perms = Array.isArray(props.permissions)
        ? props.permissions
        : [props.permissions]
      return perms.some((p) => hasPermission(p))
    }

    return false
  })
  </script>

  <template>
    <slot v-if="isAllowed" />
  </template>
```
Puedes usar `<Can />` para proteger fragmentos de interfaz según los roles o permisos del usuario.



## Loading Global Automático
Se incluye un wrapper RouterLoadingProvider que muestra un spinner mientras cambias de ruta, útil para transiciones suaves o indicaciones visuales globales.

Uso por defecto en App.vue:

```vue
  <!-- From App.vue -->
  <RouterLoadingProvider>
    <router-view />
  </RouterLoadingProvider>
```

Puedes reemplazar el loader visual o integrarlo dentro de cualquier layout personalizado.

