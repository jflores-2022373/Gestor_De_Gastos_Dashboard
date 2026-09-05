# SpendWise: Sistema Integral de Gestión Financiera Personal

SpendWise es una solución tecnológica completa y avanzada orientada al registro, estructuración, análisis y control absoluto de las finanzas personales. Diseñado bajo una arquitectura modular y moderna de alto rendimiento, este sistema permite a los usuarios gestionar sus recursos económicos con precisión quirúrgica, asegurando la confidencialidad de los datos mediante protocolos avanzados de autenticación y cifrado.

---

## 1. Arquitectura y Estructura del Sistema

El proyecto opera bajo un modelo de desarrollo estructurado en un entorno monorepositorio que separa rigurosamente la capa de presentación de la interfaz de usuario y la capa de servicios del servidor, garantizando escalabilidad, independencia de despliegue y un mantenimiento modular limpio:

```text
Gestor_De_Gastos_Dashboard/
│
├── backend/           # Capa de servicios, API REST, modelos y lógica de negocio
└── frontend/          # Capa de cliente, vistas interactivas y componentes de Angular

2. Tecnologías y Herramientas Utilizadas

El ecosistema tecnológico del proyecto se compone de herramientas modernas de desarrollo de software:

    Frontend: Angular (arquitectura basada en Standalone Components), TypeScript, HTML5 y CSS avanzado con diseño responsivo.

    Backend: Node.js y Express para la creación y gestión eficiente de la API RESTful.

    Base de Datos y Persistencia: Prisma ORM para la administración de modelos relacionales y no relacionales de manera segura.

    Gestor de Paquetes: pnpm para la optimización en la instalación de dependencias, resolución estricta de versiones y ejecución rápida de scripts de desarrollo.

3. Requisitos Previos del Entorno

Para asegurar un despliegue y funcionamiento óptimo en cualquier máquina local, es indispensable contar previamente con las siguientes herramientas instaladas y configuradas en el sistema operativo:

    Node.js: Entorno de ejecución de JavaScript (se recomienda estrictamente la versión LTS actual).

    pnpm: Gestor de paquetes de alto rendimiento (instalable globalmente mediante la terminal con el comando npm install -g pnpm).

    Git: Sistema de control de versiones para la clonación y seguimiento del repositorio.

4. Guía Exhaustiva de Instalación y Ejecución Paso a Paso

Siga detalladamente los comandos a continuación para clonar, configurar y poner en marcha todo el proyecto desde cero en su entorno local.
Paso 1: Clonación del Repositorio Oficial

Abra su terminal de comandos habitual y ejecute la clonación del repositorio en su directorio de trabajo local:
Bash

git clone [https://github.com/tu-usuario/Gestor_De_Gastos_Dashboard.git](https://github.com/tu-usuario/Gestor_De_Gastos_Dashboard.git)
cd Gestor_De_Gastos_Dashboard

Paso 2: Configuración y Despliegue del Servidor (Backend)

El servidor se encarga de procesar las peticiones HTTP, manejar la lógica de autenticación y conectar con el motor de base de datos a través de Prisma.

    Acceda al directorio del servidor:
    Bash

    cd backend

    Instale todas las dependencias del proyecto utilizando el gestor optimizado:
    Bash

    pnpm install

    Configure las variables de entorno creando o rellenando el archivo .env en la raíz de la carpeta backend con las credenciales de conexión a su base de datos.

    Genere los esquemas, migraciones y el cliente tipado del ORM Prisma:
    Bash

    pnpm prisma generate

    Ejecute las migraciones necesarias para sincronizar la base de datos:
    Bash

    pnpm prisma migrate dev

    Inicie el servidor backend en modo de desarrollo activo:
    Bash

    pnpm start

Paso 3: Configuración y Despliegue de la Interfaz (Frontend)

La aplicación cliente proporciona los paneles visuales, formularios de autenticación y dashboards interactivos para el usuario final.

    Abra una nueva ventana o pestaña independiente en su terminal y diríjase a la carpeta del cliente desde la raíz del proyecto:
    Bash

    cd frontend

    Instale las dependencias requeridas para la interfaz gráfica:
    Bash

    pnpm install

    Inicie el servidor de desarrollo de la aplicación cliente en Angular:
    Bash

    pnpm start

Una vez completado satisfactoriamente este proceso, abra su navegador web de preferencia e ingrese a la siguiente dirección local para interactuar con la plataforma:
http://localhost:4200/
5. Módulos y Componentes Principales del Sistema

    Módulo de Autenticación y Seguridad: Contiene las vistas de inicio de sesión (/login) y registro de cuentas (/register), diseñadas con un estilo visual moderno de dos columnas, tarjetas oscuras y elementos flotantes interactivos. Valida credenciales de forma cifrada.

    Dashboard Financiero Central: Panel analítico principal que agrupa métricas esenciales de ingresos, gastos totales y balances históricos mediante representaciones visuales claras.

    Módulo de Gestión de Transacciones: Vistas estructuradas enfocadas en permitir al usuario el alta, modificación y eliminación de registros financieros individuales de manera dinámica y en tiempo real.

6. Guía de Contribución y Flujo de Trabajo Git

Si planea realizar modificaciones colaborativas o escalar el proyecto, siga este flujo estándar para la gestión de ramas:

    Cree una rama nueva orientada a la característica que va a desarrollar:
    Bash

    git checkout -b feature/nombre-de-la-caracteristica

    Realice los cambios locales en el código y confirme sus avances:
    Bash

    git commit -m "Descripción detallada de la nueva característica implementada"

    Sube los cambios hacia el repositorio remoto correspondiente:
    Bash

    git push origin feature/nombre-de-la-caracteristica
