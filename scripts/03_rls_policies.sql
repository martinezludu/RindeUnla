-- RINDEUNLA Row Level Security Policies
-- Enable RLS and create security policies

-- Enable RLS on all tables
ALTER TABLE professors ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE professor_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Professors policies
CREATE POLICY "Professors are viewable by everyone" ON professors
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert professors" ON professors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update professors" ON professors
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Courses policies
CREATE POLICY "Courses are viewable by everyone" ON courses
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert courses" ON courses
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update courses" ON courses
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Professor-Courses policies
CREATE POLICY "Professor-courses are viewable by everyone" ON professor_courses
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert professor-courses" ON professor_courses
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update professor-courses" ON professor_courses
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Ratings policies
CREATE POLICY "Ratings are viewable by everyone" ON ratings
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own ratings" ON ratings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" ON ratings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings" ON ratings
    FOR DELETE USING (auth.uid() = user_id);
