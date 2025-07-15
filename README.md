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

## 🧩 Cómo extender esta plantilla

✅ Agrega roles/permisos usando Pinia o middleware en el router.

📦 Integra llamadas API protegidas usando JwtService + Axios interceptors.

🔐 Usa scopes de autorización y claims personalizados desde el ID Token.

📊 Incorpora librerías como Chart.js, VueUse, o Vue Query para dashboards.