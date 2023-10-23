CREATE TABLE public.translation_result
(
    source_text text NOT NULL,
    target_language character varying(5) NOT NULL,
    translated_text text,
    create_date date NOT NULL DEFAULT CURRENT_DATE,
    last_access_date date NOT NULL DEFAULT CURRENT_DATE
);

ALTER TABLE IF EXISTS public.translation_result
    OWNER to root;

CREATE INDEX idx_text_hash ON translation_result USING hash (md5(source_text));


CREATE TABLE public.category_cache
(
    source_text text NOT NULL,
    category_text text,
    create_date date NOT NULL DEFAULT CURRENT_DATE,
    last_access_date date NOT NULL DEFAULT CURRENT_DATE
);

ALTER TABLE IF EXISTS public.category_cache
    OWNER to root;

CREATE INDEX idx_category_text_hash ON category_cache USING hash (md5(source_text));


CREATE TABLE public.users
(
    user_id serial PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password_hash text NOT NULL,
    create_date date NOT NULL DEFAULT CURRENT_DATE,
    last_access_date date NOT NULL DEFAULT CURRENT_DATE
);

ALTER TABLE IF EXISTS public.users
    OWNER to root;

CREATE INDEX idx_username_hash ON users USING hash (md5(username));