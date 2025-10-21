# Guía de Contribución para Herramientas-UCV

¡Gracias por tu interés en contribuir a nuestro proyecto! [cite_start]Esta guía define las normas y flujos de trabajo para colaborar de forma ordenada en la "App web para el manejo de incidencias informáticas en la universidad César Vallejo"[cite: 10].

## Tabla de Contenidos

1.  [Gestión del Proyecto (Issues, Milestones, Tableros)](#1-gestión-del-proyecto)
2.  [Convención de Nombres de Ramas](#2-convención-de-nombres-de-ramas)
3.  [Formato de Mensajes de Commit](#3-formato-de-mensajes-de-commit)
4.  [Flujo de Trabajo (Fork y Pull Request)](#4-flujo-de-trabajo-con-forks-y-upstream)
5.  [Procedimiento de Pull Requests y Revisiones](#5-procedimiento-para-pull-requests-prs-y-revisiones)
6.  [Reglas de Colaboración (Branch y Tag Rules)](#6-reglas-de-colaboración)

---

## 1. Gestión del Proyecto

Usamos las herramientas de GitHub para organizar nuestro trabajo:

* [cite_start]**Issues (Incidencias):** Todos los "Requerimientos del Software" [cite: 537][cite_start], ya sean nuevas características (ej. "RF1-El aplicativo permite el acceso..." [cite: 288][cite_start]) o bugs, deben ser registrados como un Issue[cite: 286].
* [cite_start]**Milestones (Hitos):** Agrupamos los issues en Milestones que corresponden a las versiones del proyecto[cite: 271, 274]. [cite_start]Estos hitos se nombran como "Release v1.0", "Release v2.0", etc.[cite: 299, 311, 312, 313, 315].
* [cite_start]**Tableros de Proyecto (Project Boards):** El progreso de los issues (tareas por hacer y hechas) se visualiza en nuestro tablero de proyecto "PROJECT UCV"[cite: 691, 712].

## 2. Convención de Nombres de Ramas

Para mantener el repositorio organizado, todas las ramas nuevas deben seguir la siguiente convención de nomenclatura:

`tipo/descripcion-corta-en-kebab-case`

[cite_start]Basado en los ejemplos del proyecto (ej. `feature/cambiosModelController` [cite: 824, 834, 849]), los **tipos** más comunes son:

* **`feature/`**: Para una nueva característica (ej. `feature/agregar-login`).
* **`fix/`**: Para la corrección de un error (ej. `fix/corregir-error-formulario`).
* **`docs/`**: Para cambios exclusivos en la documentación.

## 3. Formato de Mensajes de Commit

Aunque no seguimos un estándar estricto, por favor usa mensajes de commit claros, descriptivos y en español. El mensaje debe explicar *qué* hace el commit.

* **MAL:** `git commit -m "arreglos"`
* **BIEN:** `git commit -m "Corregir validación en formulario de login"`
* [cite_start]**BIEN:** `git commit -m "Implementar RF7 y RF8 para gestión de personal"` (basado en [cite: 660, 738])
* [cite_start]**BIEN:** `git commit -m "Cambios en ModelController"` [cite: 826]

## 4. Flujo de Trabajo con Forks y Upstream

Para contribuir, debes seguir el flujo "Fork y Pull Request". El repositorio principal se llama `upstream` y tu copia personal (fork) se llama `origin`.

1.  [cite_start]**Hacer Fork:** Crea un "Fork" del repositorio `Organizacion-UCV/Herramientas-UCV` a tu propia cuenta de GitHub[cite: 752, 767].
2.  **Clonar tu Fork:** Clona *tu fork* a tu máquina local (reemplaza `TU_USUARIO` y el nombre de tu fork si lo cambiaste).
    ```bash
    # [cite_start]Ejemplo de clonación del fork [cite: 776]
    git clone [https://github.com/TU_USUARIO/Herramientas-UCV.git](https://github.com/TU_USUARIO/Herramientas-UCV.git)
    cd Herramientas-UCV
    ```
3.  **Configurar Upstream:** Añade el repositorio original (`Organizacion-UCV`) como un "remote" llamado `upstream` para poder sincronizar cambios.
    ```bash
    # [cite_start]Comando exacto usado en el proyecto [cite: 809, 817]
    git remote add upstream [https://github.com/Organizacion-UCV/Herramientas-UCV.git](https://github.com/Organizacion-UCV/Herramientas-UCV.git)
    
    # Verifica que tengas 'origin' (tu fork) y 'upstream' (el original)
    git remote -v
    ```
4.  **Sincronizar:** Antes de empezar a trabajar, asegúrate de tener la última versión de la rama `main` del proyecto original.
    ```bash
    git fetch upstream
    git checkout main
    git rebase upstream/main
    git push origin main
    ```
5.  **Crear tu Rama:** Crea tu nueva rama de trabajo localmente, siguiendo la convención del punto 2.
    ```bash
    # Ejemplo: git checkout -b feature/mi-nueva-caracteristica
    git checkout -b feature/cambiosModelController
    ```
6.  **Trabajar (Commit y Push):** Haz tus cambios, añádelos y haz commit.
    ```bash
    git add .
    git commit -m "Descripción de mis cambios"
    
    # [cite_start]Sube tu rama a TU FORK (origin) [cite: 834]
    git push origin feature/cambiosModelController
    ```
7.  **Crear Pull Request:** Ve a GitHub. [cite_start]Verás una notificación para crear un "Pull Request"[cite: 855, 860].
    * [cite_start]Asegúrate de que el PR sea desde tu rama (`TU_USUARIO:feature/cambiosModelController`) [cite: 888] [cite_start]hacia la rama `main` del repositorio base (`Organizacion-UCV:main`)[cite: 886, 887].
    * [cite_start]Añade un título y una descripción clara[cite: 891, 895, 913].

## 5. Procedimiento para Pull Requests (PRs) y Revisiones

1.  [cite_start]**Creación del PR:** Al abrir tu Pull Request[cite: 902], enlaza el Issue que estás resolviendo en la descripción (ej. "Resuelve #16").
2.  **Revisión Requerida:** Todos los PRs deben ser revisados antes de ser fusionados. [cite_start]El sistema mostrará "Review required"[cite: 918].
3.  [cite_start]**Revisión Cruzada:** Se necesita al menos **una (1) aprobación** de un miembro del equipo (revisor) para poder hacer merge[cite: 919, 923].
4.  [cite_start]**Aprobación:** El revisor analizará el código y, si todo es correcto, dejará un comentario (ej. "Aprobado" [cite: 564, 637][cite_start]) y aprobará el PR formalmente[cite: 569].
5.  **Atender Comentarios:** Si el revisor solicita cambios, debes hacerlos en tu misma rama local, hacer commit y volver a hacer `push`. El PR se actualizará automáticamente.
6.  [cite_start]**Merge:** Una vez aprobado y con todas las comprobaciones en verde, un mantenedor del proyecto (ej. `Rodríguez Santa Cruz, André Martín` [cite: 112][cite_start]) fusionará el PR a la rama `main`[cite: 683, 685].

## 6. Reglas de Colaboración

### Reglas de Ramas (Branch Rules)

* [cite_start]La rama `main` es una rama protegida[cite: 440, 476, 455].
* **No se permite hacer `push` directo a `main`**.
* [cite_start]Todo cambio debe integrarse obligatoriamente mediante un Pull Request[cite: 503].
* [cite_start]Se requiere al menos **una (1) aprobación** para hacer merge, como se detalla en el punto anterior[cite: 506, 919, 923].
* [cite_start]El sistema bloqueará la fusión ("Merging is blocked") si no se cumplen estas reglas[cite: 641, 920].

### Reglas de Etiquetado (Tag Rules)

* Usamos tags de Git para marcar las versiones estables del proyecto.
* [cite_start]Los nombres de los tags deben coincidir con los Milestones definidos en la gestión del proyecto (ej. `v1.0`, `v2.0`)[cite: 299, 308, 313].
* La creación de tags solo debe hacerse desde la rama `main` al momento de un lanzamiento.

### Estructura general:
```
Herramientas-UCV/
 ├── backend/
 │   ├── src/main/java/com/ucv/incidencias/
 │   ├── src/main/resources/
 │   └── pom.xml
 ├── frontend/
 │   ├── src/
 │   ├── public/
 │   └── package.json
 ├── docs/
 │   └── CONTRIBUTING.md
 └── README.md
```