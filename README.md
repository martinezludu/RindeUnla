# 🎓 RINDEUNLA

**Sistema de Calificación de Profesores - Universidad Nacional de Lanús**

Una plataforma moderna y completa donde los estudiantes de la Universidad Nacional de Lanús (UNLA) pueden compartir sus experiencias académicas, calificar profesores y ayudar a otros estudiantes a tomar mejores decisiones sobre sus cursadas.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-latest-green?style=flat-square&logo=supabase)

## 🚀 Características

### Para Estudiantes
- **🔍 Búsqueda avanzada** de profesores y materias
- **⭐ Sistema de calificación completo** con 5 criterios específicos:
  - Claridad en las explicaciones
  - Organización del contenido
  - Conocimiento de la materia
  - Amabilidad y trato
  - Puntualidad
- **💬 Comentarios y reseñas** detalladas
- **📊 Estadísticas visuales** de cada profesor
- **🔐 Autenticación segura** con Supabase

### Para Administradores
- **👨‍💼 Panel de administración** completo
- **📚 Gestión de materias** y profesores
- **📈 Estadísticas del sistema**
- **🛡️ Moderación de contenido**

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Validación**: Zod, React Hook Form
- **Íconos**: Lucide React
- **Gráficos**: Recharts
- **Notificaciones**: Sonner

## 📦 Instalación

### Prerrequisitos
- Node.js 18 o superior
- npm o pnpm
- Cuenta en Supabase

### Configuración del proyecto

1. **Cloná el repositorio**
   ```bash
   git clone https://github.com/martinezludu/RindeUnla.git
   cd RindeUNLA
   ```

2. **Instalá las dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configurá las variables de entorno**
   
   Creá un archivo `.env.local` en la raíz del proyecto:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

4. **Configurá la base de datos**
   
   Ejecutá los scripts SQL que están en la carpeta `scripts/` en tu proyecto de Supabase:
   - `01_create_tables.sql` - Crea las tablas principales
   - `02_create_views.sql` - Crea las vistas necesarias
   - `03_rls_policies.sql` - Configura las políticas de seguridad
   - `04_seed_data.sql` - Datos de ejemplo

5. **Iniciá el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
RindeUNLA/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel de administración
│   ├── api/               # API Routes
│   ├── course/            # Páginas de materias
│   ├── courses/           # Listado de materias
│   ├── dashboard/         # Dashboard del usuario
│   ├── login/             # Página de login
│   ├── professor/         # Páginas de profesores
│   ├── professors/        # Listado de profesores
│   ├── rate/              # Sistema de calificación
│   └── signup/            # Página de registro
├── components/            # Componentes reutilizables
│   ├── admin/            # Componentes del admin
│   ├── auth/             # Componentes de autenticación
│   ├── course/           # Componentes de materias
│   ├── professor/        # Componentes de profesores
│   ├── rating/           # Componentes de calificación
│   └── ui/               # Componentes de UI (shadcn/ui)
├── contexts/             # React Contexts
├── hooks/                # Custom Hooks
├── lib/                  # Utilidades y configuración
├── scripts/              # Scripts SQL para la DB
└── styles/               # Estilos globales
```

## 🎨 Diseño y UX

- **Diseño responsivo** que funciona en desktop y móvil
- **Modo oscuro/claro** con soporte de preferencias del sistema
- **Interfaz intuitiva** pensada para estudiantes universitarios
- **Animaciones suaves** con Tailwind CSS Animate
- **Accesibilidad** mejorada con Radix UI

## 🔒 Seguridad

- **Row Level Security (RLS)** configurado en Supabase
- **Autenticación JWT** con Supabase Auth
- **Validación de datos** tanto en cliente como servidor
- **Sanitización** de inputs del usuario

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si querés colaborar:

1. Forkeá el proyecto
2. Creá una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Hacé commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Pusheá a la rama (`git push origin feature/AmazingFeature`)
5. Abrí un Pull Request

### Guías de Contribución

- Usá TypeScript para todo el código
- Seguí las convenciones de nombres existentes
- Escribí tests para nuevas funcionalidades
- Documentá cambios importantes en el CHANGELOG.md

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Mirá el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Lautaro Martinez**
- GitHub: [@martinezludu](https://github.com/martinezludu)

## 🙏 Reconocimientos

- Universidad Nacional de Lanús (UNLA)
- Comunidad estudiantil de UNLA
- [Shadcn/ui](https://ui.shadcn.com/) por los componentes de UI
- [Supabase](https://supabase.com/) por el backend como servicio
- [Vercel](https://vercel.com/) por el hosting y deployment

---

**¿Tenés alguna pregunta o sugerencia?** ¡No dudes en abrir un issue o contactarme!

*Hecho con 💙 para la comunidad estudiantil de UNLA*
