-- RINDEUNLA Database Views
-- Create views for aggregated data and statistics

-- Professor summary view with aggregated ratings
CREATE OR REPLACE VIEW professor_summary AS
SELECT 
    p.id,
    p.name,
    p.department,
    p.university,
    p.bio,
    p.image_url,
    COUNT(r.id) as total_ratings,
    ROUND(AVG(r.clarity), 2) as avg_clarity,
    ROUND(AVG(r.organization), 2) as avg_organization,
    ROUND(AVG(r.expertise), 2) as avg_expertise,
    ROUND(AVG(r.friendliness), 2) as avg_friendliness,
    ROUND(AVG(r.punctuality), 2) as avg_punctuality,
    ROUND(AVG(r.overall_rating), 2) as avg_overall_rating,
    ROUND(AVG(r.difficulty), 2) as avg_difficulty,
    ROUND(
        (COUNT(CASE WHEN r.would_recommend = true THEN 1 END) * 100.0) / 
        NULLIF(COUNT(CASE WHEN r.would_recommend IS NOT NULL THEN 1 END), 0), 
        1
    ) as recommendation_percentage,
    p.created_at,
    p.updated_at
FROM professors p
LEFT JOIN ratings r ON p.id = r.professor_id
GROUP BY p.id, p.name, p.department, p.university, p.bio, p.image_url, p.created_at, p.updated_at;

-- Course summary view with aggregated ratings
CREATE OR REPLACE VIEW course_summary AS
SELECT 
    c.id,
    c.name,
    c.code,
    c.department,
    c.description,
    c.credits,
    COUNT(r.id) as total_ratings,
    ROUND(AVG(r.clarity), 2) as avg_clarity,
    ROUND(AVG(r.organization), 2) as avg_organization,
    ROUND(AVG(r.expertise), 2) as avg_expertise,
    ROUND(AVG(r.friendliness), 2) as avg_friendliness,
    ROUND(AVG(r.punctuality), 2) as avg_punctuality,
    ROUND(AVG(r.overall_rating), 2) as avg_overall_rating,
    ROUND(AVG(r.difficulty), 2) as avg_difficulty,
    ROUND(
        (COUNT(CASE WHEN r.would_recommend = true THEN 1 END) * 100.0) / 
        NULLIF(COUNT(CASE WHEN r.would_recommend IS NOT NULL THEN 1 END), 0), 
        1
    ) as recommendation_percentage,
    c.created_at,
    c.updated_at
FROM courses c
LEFT JOIN ratings r ON c.id = r.course_id
GROUP BY c.id, c.name, c.code, c.department, c.description, c.credits, c.created_at, c.updated_at;

-- Professor-Course combination view with ratings
CREATE OR REPLACE VIEW professor_course_ratings AS
SELECT 
    pc.id as professor_course_id,
    p.id as professor_id,
    p.name as professor_name,
    c.id as course_id,
    c.name as course_name,
    c.code as course_code,
    pc.semester,
    pc.year,
    COUNT(r.id) as total_ratings,
    ROUND(AVG(r.clarity), 2) as avg_clarity,
    ROUND(AVG(r.organization), 2) as avg_organization,
    ROUND(AVG(r.expertise), 2) as avg_expertise,
    ROUND(AVG(r.friendliness), 2) as avg_friendliness,
    ROUND(AVG(r.punctuality), 2) as avg_punctuality,
    ROUND(AVG(r.overall_rating), 2) as avg_overall_rating,
    ROUND(AVG(r.difficulty), 2) as avg_difficulty,
    ROUND(
        (COUNT(CASE WHEN r.would_recommend = true THEN 1 END) * 100.0) / 
        NULLIF(COUNT(CASE WHEN r.would_recommend IS NOT NULL THEN 1 END), 0), 
        1
    ) as recommendation_percentage
FROM professor_courses pc
JOIN professors p ON pc.professor_id = p.id
JOIN courses c ON pc.course_id = c.id
LEFT JOIN ratings r ON pc.professor_id = r.professor_id AND pc.course_id = r.course_id
GROUP BY pc.id, p.id, p.name, c.id, c.name, c.code, pc.semester, pc.year;
