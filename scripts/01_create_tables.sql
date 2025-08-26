-- RINDEUNLA Database Schema
-- Create tables for professor rating system

-- Professors table
CREATE TABLE IF NOT EXISTS professors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    university VARCHAR(255) DEFAULT 'UNLA',
    bio TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    department VARCHAR(255),
    description TEXT,
    credits INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(code)
);

-- Professor-Course relationship table
CREATE TABLE IF NOT EXISTS professor_courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    professor_id UUID REFERENCES professors(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    semester VARCHAR(50),
    year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(professor_id, course_id, semester, year)
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    professor_id UUID REFERENCES professors(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Rating criteria (1-5 scale)
    clarity INTEGER CHECK (clarity >= 1 AND clarity <= 5),
    organization INTEGER CHECK (organization >= 1 AND organization <= 5),
    expertise INTEGER CHECK (expertise >= 1 AND expertise <= 5),
    friendliness INTEGER CHECK (friendliness >= 1 AND friendliness <= 5),
    punctuality INTEGER CHECK (punctuality >= 1 AND punctuality <= 5),
    
    -- Overall rating (calculated average)
    overall_rating DECIMAL(3,2) GENERATED ALWAYS AS (
        (clarity + organization + expertise + friendliness + punctuality) / 5.0
    ) STORED,
    
    -- Optional fields
    comment TEXT,
    difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 5),
    would_recommend BOOLEAN,
    semester VARCHAR(50),
    year INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one rating per user per professor per course
    UNIQUE(professor_id, course_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ratings_professor_id ON ratings(professor_id);
CREATE INDEX IF NOT EXISTS idx_ratings_course_id ON ratings(course_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_professor_courses_professor_id ON professor_courses(professor_id);
CREATE INDEX IF NOT EXISTS idx_professor_courses_course_id ON professor_courses(course_id);
