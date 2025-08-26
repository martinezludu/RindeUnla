# Changelog 📝

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere al [Versionado Semántico](https://semver.org/lang/es/).

## [v0.1.0] - 2025-08-26

### 🎉 Lanzamiento Inicial

Esta es la primera versión de RINDEUNLA, el sistema de calificación de profesores para la Universidad Nacional de Lanús.

### ✨ Agregado

#### 🔐 Sistema de Autenticación
- **Registro de usuarios** con validación completa
- **Inicio de sesión** seguro con Supabase Auth
- **Protección de rutas** mediante middleware
- **Contexto de autenticación** global para manejo de estado

#### 👨‍🏫 Gestión de Profesores
- **Listado completo** de profesores con búsqueda y filtros
- **Páginas individuales** de cada profesor con estadísticas detalladas
- **Sistema de calificación** con 5 criterios específicos:
  - 🎯 Claridad en las explicaciones
  - 📋 Organización del contenido
  - 🧠 Conocimiento de la materia
  - 😊 Amabilidad y trato
  - ⏰ Puntualidad
- **Comentarios y reseñas** de estudiantes
- **Estadísticas visuales** con gráficos interactivos

#### 📚 Gestión de Materias
- **Catálogo de materias** de UNLA
- **Páginas individuales** de cada materia
- **Listado de profesores** asociados por materia
- **Estadísticas de calificaciones** por materia

#### 🎯 Sistema de Calificaciones
- **Formulario intuitivo** para calificar profesores
- **Validación en tiempo real** con Zod
- **Prevención de duplicados** (un voto por estudiante por profesor-materia)
- **Cálculo automático** de promedios y estadísticas

#### 👨‍💼 Panel de Administración
- **Dashboard completo** con métricas del sistema
- **Gestión de profesores** (crear, editar, eliminar)
- **Gestión de materias** (crear, editar, eliminar)
- **Estadísticas avanzadas** del sistema
- **Protección por roles** (solo administradores)

#### 🎨 Interfaz de Usuario
- **Diseño moderno** con Tailwind CSS y Shadcn/ui
- **Totalmente responsivo** para desktop y móvil
- **Modo oscuro/claro** con preferencias del sistema
- **Animaciones suaves** y transiciones
- **Accesibilidad mejorada** con Radix UI
- **Iconografía consistente** con Lucide React

#### 🛠️ Tecnologías y Arquitectura
- **Next.js 15** con App Router
- **React 19** con TypeScript
- **Supabase** para backend (PostgreSQL + Auth)
- **Tailwind CSS 4** para estilos
- **React Hook Form + Zod** para formularios
- **Recharts** para visualización de datos
- **Row Level Security** configurado

#### 📊 Base de Datos
- **Tablas principales** creadas:
  - `users` - Usuarios del sistema
  - `professors` - Profesores de UNLA
  - `courses` - Materias disponibles
  - `professor_courses` - Relación profesores-materias
  - `ratings` - Calificaciones de estudiantes
- **Vistas optimizadas** para consultas frecuentes
- **Políticas RLS** para seguridad de datos
- **Datos de prueba** para desarrollo

#### 🔍 Funcionalidades de Búsqueda
- **Búsqueda de profesores** por nombre
- **Filtros avanzados** por materia y calificación
- **Loading states** optimizados
- **Paginación** eficiente

### 🔧 Configuración Técnica

#### 📦 Dependencias Principales
- Next.js 15.2.4
- React 19
- TypeScript 5
- Tailwind CSS 4.1.9
- Supabase (latest)
- Radix UI Components
- React Hook Form 7.60.0
- Zod 3.25.67
- Recharts 2.15.4
- Lucide React 0.454.0

#### 🚀 Scripts de Desarrollo
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting del código

#### 📁 Estructura de Archivos
- Arquitectura modular con separación clara de responsabilidades
- Componentes reutilizables organizados por funcionalidad
- Custom hooks para lógica compartida
- Contextos para manejo de estado global
- Scripts SQL organizados para setup de base de datos

### 🎯 Próximas Funcionalidades (Roadmap)

#### v0.2.0 - Funcionalidades Sociales
- [ ] Sistema de likes/dislikes en comentarios
- [ ] Reportes de contenido inapropiado
- [ ] Notificaciones en tiempo real
- [ ] Perfil de usuario mejorado

#### v0.3.0 - Analíticas Avanzadas
- [ ] Dashboard de analíticas para profesores
- [ ] Exportación de reportes
- [ ] Comparativas entre profesores
- [ ] Tendencias históricas

#### v0.4.0 - Funcionalidades Premium
- [ ] Sistema de favoritos
- [ ] Recomendaciones personalizadas
- [ ] API pública para desarrolladores
- [ ] Integración con sistema académico UNLA

### 🐛 Problemas Conocidos

#### Resolución Pendiente
- **Compatibilidad React 19**: Algunas dependencias requieren `--legacy-peer-deps` para instalación
- **Optimización móvil**: Algunos gráficos requieren ajustes en pantallas muy pequeñas

### 💡 Notas para Desarrolladores

#### Instalación
```bash
git clone https://github.com/martinezludu/RindeUnla.git
cd RindeUNLA
npm install --legacy-peer-deps
```

#### Variables de Entorno Requeridas
```bash
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

#### Setup de Base de Datos
1. Ejecutar `scripts/01_create_tables.sql`
2. Ejecutar `scripts/02_create_views.sql`
3. Ejecutar `scripts/03_rls_policies.sql`
4. Ejecutar `scripts/04_seed_data.sql`

---

## 🎉 Reconocimientos

- **Universidad Nacional de Lanús** por ser la institución que inspira este proyecto
- **Comunidad estudiantil de UNLA** por el feedback y apoyo
- **Open Source Community** por las herramientas increíbles que hacen posible este proyecto

---

**Formato del Changelog:**
- 🎉 **Agregado** para nuevas funcionalidades
- 🔧 **Cambiado** para cambios en funcionalidades existentes
- 🗑️ **Deprecado** para funcionalidades que serán removidas
- ❌ **Removido** para funcionalidades removidas
- 🐛 **Arreglado** para corrección de bugs
- 🔒 **Seguridad** para mejoras de seguridad

*Última actualización: 26 de agosto de 2025*
