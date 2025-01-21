#  X-FIT Web

##  🎖️ - Objetivo
Crear una aplicación web que aporte al gimnasio un sistema de administración.

##  🛠️ - Herramientas necesarias


##  🧩 - Instalar Repositorio

1. Clonar Repositorio.

```bash

git  clone  https://github.com/garibcatastrofe/x-fit-web.git

```

2. Moverse a la carpeta del repositorio.

```bash

cd  ./x-fit-web

```

4. Instalar dependencias.

```bash

npm  install

```

# Estrategia para la Gestión de Ramas en Git

Una buena estrategia para gestionar las ramas en Git es clave para mantener un flujo de trabajo ordenado y facilitar la colaboración en equipos de desarrollo. Aquí te explicamos una estrategia recomendada que sigue las mejores prácticas.

## 1. Rama Principal (`main` o `production`)

- **Propósito**: Esta es la rama estable que siempre debe tener código que funcione correctamente en producción.
- **Reglas**:
  - No se debe trabajar directamente en `main`.
  - Solo se debe hacer `merge` de otras ramas después de pasar pruebas o revisiones.
  - Cada commit en `main` debe ser código funcional y listo para producción.

## 2. Rama de Desarrollo (`development`)

- **Propósito**: Aquí se integran las funcionalidades en desarrollo antes de ser fusionadas con la rama principal.
- **Reglas**:
  - Toda la integración de nuevas características o mejoras se realiza en `develop`.
  - La rama `develop` debe contener las últimas características que se están desarrollando y debe estar siempre en un estado funcional, aunque aún no en producción.

## 3. Ramas de Características (`feature/*`)

- **Propósito**: Crear nuevas características o funcionalidades para el proyecto.
- **Reglas**:
  - Se crean a partir de `develop`.
  - Se deben nombrar con un prefijo `feature/` seguido de una breve descripción (ejemplo: `feature/login-form`).
  - Una vez terminada la característica, se realiza un `merge` de la rama `feature/*` en `develop`.
  - Se deben eliminar después de hacer el `merge`.

## 4. Ramas de Corrección de Errores (`fix/*`)

- **Propósito**: Arreglar bugs o problemas en el código.
- **Reglas**:
  - Se crean a partir de `develop` (si el bug afecta solo a desarrollo) o de `main` (si el bug está en producción).
  - Se deben nombrar con un prefijo `fix/` seguido de una breve descripción del problema (ejemplo: `fix/crash-on-login`).
  - Después de solucionar el bug, se hace `merge` en `develop` o en `main` si se necesita un hotfix urgente.

## 5. Ramas de Lanzamiento (`release/*`)

- **Propósito**: Preparar el código para una nueva versión de producción.
- **Reglas**:
  - Se crean a partir de `develop` cuando se considera que se está listo para un nuevo lanzamiento.
  - Se nombran como `release/vX.X.X` (por ejemplo: `release/v1.2.0`).
  - Aquí se realizan pruebas finales, correcciones menores y ajustes de última hora.
  - Después de hacer el release, se fusiona de nuevo en `develop` (para mantener cualquier cambio en la rama de desarrollo) y en `main` (para marcar la nueva versión estable).

## 6. Ramas de Hotfix (`hotfix/*`)

- **Propósito**: Corregir errores críticos en producción de manera rápida.
- **Reglas**:
  - Se crean a partir de `main` cuando se detecta un bug en producción.
  - Se nombran como `hotfix/*` seguido de una breve descripción (ejemplo: `hotfix/crash-on-login`).
  - Después de solucionar el problema, se fusionan en `main` (para actualizar la producción) y en `develop` (para que el cambio se refleje también en la rama de desarrollo).

## 7. Flujo de Trabajo Común

- **Desarrollo Continuo**:
  - Crea ramas `feature/*` desde `develop` para desarrollar nuevas características.
  - Realiza pruebas y revisiones en estas ramas, luego haz `merge` en `develop`.
- **Preparación para Producción**:
  - Cuando las nuevas características estén listas y aprobadas, crea una rama `release/*` desde `develop` para preparar la nueva versión.
  - Realiza pruebas finales y luego fusiona la rama `release/*` en `main` y `develop`.
- **Corrección de Errores Urgentes**:
  - Si hay un bug crítico en producción, crea una rama `hotfix/*` desde `main`, corrige el error, y haz `merge` tanto en `main` como en `develop`.

## 8. Revisión y Clean-up

- **Eliminar ramas**: Después de fusionar cualquier rama de características, corrección de errores o lanzamiento, es importante eliminar la rama para mantener limpio el repositorio.
- **Revisión de Pull Requests**: Siempre usa Pull Requests (PR) para integrar cambios en las ramas principales (`develop`, `main`), lo cual facilita la revisión de código y la gestión de conflictos.

## Resumen de Flujo de Trabajo:

1. **`main`**: Siempre debe ser código estable y listo para producción.
2. **`develop`**: Código en desarrollo y en integración de nuevas características.
3. **`feature/*`**: Para nuevas características y mejoras.
4. **`release/*`**: Para preparar la siguiente versión de producción.
5. **`hotfix/*`**: Para corregir errores críticos en producción.

---

Siguiendo esta estrategia, tu equipo podrá gestionar de manera eficiente las ramas en Git, minimizando los conflictos y asegurando un flujo de trabajo claro y organizado.


##  🚧 - Como hacer un commit

  

Estas son las reglas para subir un commit, asegurense de seguirlas correctamente para asegurarnos de que el proyecto no se rompa en ningun momento.

  

```

Estas reglas es tan basadas en Conventional Commits

```

1. **Crear tu rama**
Antes de subir un commit asegurate de estar en tu propia rama. Antes de esta seccion hay otra que explica como crear las ramas
2. **Estructura del Mensaje del Commit**
- El mensaje debe seguir esta estructura básica:
	```
	<tipo>(<alcance>): descripcion
	```
	Donde:

-   **tipo**: Describe la naturaleza del cambio (ejemplo: `feat`, `fix`, `chore`).
-   **alcance** (opcional): Especifica la parte del proyecto que se ve afectada (ejemplo: `ui`, `api`).
-   **descripción**: Explica brevemente el cambio realizado.
3. **Tipos Comunes de Commits**

-   `feat`: Se utiliza cuando agregas una nueva característica.
-   `fix`: Para solucionar un bug o error.
-   `docs`: Cambios en la documentación.
-   `style`: Cambios en el estilo (formato, espacio, etc.) que no afectan el comportamiento.
-   `refactor`: Refactorización del código sin cambiar su comportamiento.
-   `test`: Añadir o modificar pruebas.
-   `chore`: Cambios en tareas de mantenimiento como configuración, actualizaciones, etc.
4. **Mensajes Claros y Descriptivos**

-   Asegúrate de que el mensaje del commit sea fácil de entender, sin ser demasiado largo ni vago.

**Ejemplos de commit:**

-   `feat(ui): agregar barra de navegación`
-   `fix(api): corregir error en la autenticación`
-   `chore(config): actualizar dependencias`

Recuerda seguir estas reglas para mantener un historial de commits claro y coherente.

##  🤓💻 - Colaboradores

-  [Angel Gonzalez](https://github.com/angeljpeg)
-  [Garib Flores](https://github.com/garibcatastrofe)
-  [Ivan Lopez](https://github.com/angeljpeg)
