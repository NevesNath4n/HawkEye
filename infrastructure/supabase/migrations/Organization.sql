CREATE TABLE organization (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    key text NOT NULL,
    url text NOT NULL,
    apiKey text NOT NULL
);