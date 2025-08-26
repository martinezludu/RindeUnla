-- RINDEUNLA Seed Data
-- Sample data for testing and development

-- Insert sample professors
INSERT INTO professors (name, department, bio) VALUES
('Dr. María González', 'Ingeniería en Sistemas', 'Doctora en Ciencias de la Computación con especialización en Inteligencia Artificial. 15 años de experiencia docente.'),
('Prof. Carlos Rodríguez', 'Matemática', 'Profesor titular de Análisis Matemático. Especialista en ecuaciones diferenciales y métodos numéricos.'),
('Dra. Ana Martínez', 'Ingeniería en Sistemas', 'Especialista en Bases de Datos y Sistemas Distribuidos. Investigadora en Big Data y Analytics.'),
('Prof. Luis Fernández', 'Física', 'Profesor de Física General y Mecánica Cuántica. Doctor en Física Teórica por la Universidad de Buenos Aires.'),
('Dra. Carmen López', 'Química', 'Doctora en Química Orgánica. Especialista en síntesis de compuestos farmacéuticos.');

-- Insert sample courses
INSERT INTO courses (name, code, department, description, credits) VALUES
('Programación I', 'SIS101', 'Ingeniería en Sistemas', 'Introducción a la programación usando Python. Conceptos básicos de algoritmos y estructuras de datos.', 6),
('Análisis Matemático I', 'MAT101', 'Matemática', 'Límites, derivadas e integrales. Fundamentos del cálculo diferencial e integral.', 8),
('Base de Datos', 'SIS201', 'Ingeniería en Sistemas', 'Diseño y implementación de bases de datos relacionales. SQL y normalización.', 6),
('Física I', 'FIS101', 'Física', 'Mecánica clásica, cinemática y dinámica. Leyes de Newton y conservación de energía.', 8),
('Química General', 'QUI101', 'Química', 'Principios fundamentales de química. Estructura atómica, enlaces químicos y reacciones.', 6),
('Algoritmos y Estructuras de Datos', 'SIS102', 'Ingeniería en Sistemas', 'Algoritmos de ordenamiento y búsqueda. Estructuras de datos avanzadas.', 6),
('Análisis Matemático II', 'MAT102', 'Matemática', 'Integrales múltiples, series y ecuaciones diferenciales ordinarias.', 8);

-- Link professors to courses
INSERT INTO professor_courses (professor_id, course_id, semester, year) VALUES
((SELECT id FROM professors WHERE name = 'Dr. María González'), (SELECT id FROM courses WHERE code = 'SIS101'), '1er Cuatrimestre', 2024),
((SELECT id FROM professors WHERE name = 'Dr. María González'), (SELECT id FROM courses WHERE code = 'SIS102'), '2do Cuatrimestre', 2024),
((SELECT id FROM professors WHERE name = 'Prof. Carlos Rodríguez'), (SELECT id FROM courses WHERE code = 'MAT101'), '1er Cuatrimestre', 2024),
((SELECT id FROM professors WHERE name = 'Prof. Carlos Rodríguez'), (SELECT id FROM courses WHERE code = 'MAT102'), '2do Cuatrimestre', 2024),
((SELECT id FROM professors WHERE name = 'Dra. Ana Martínez'), (SELECT id FROM courses WHERE code = 'SIS201'), '1er Cuatrimestre', 2024),
((SELECT id FROM professors WHERE name = 'Prof. Luis Fernández'), (SELECT id FROM courses WHERE code = 'FIS101'), '1er Cuatrimestre', 2024),
((SELECT id FROM professors WHERE name = 'Dra. Carmen López'), (SELECT id FROM courses WHERE code = 'QUI101'), '1er Cuatrimestre', 2024);
