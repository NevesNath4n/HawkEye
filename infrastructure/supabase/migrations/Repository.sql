CREATE TABLE repository (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    repositoryId INT NOT NULL,
    organization_id INT NOT NULL,
    ignore TEXT NULL,
    FOREIGN KEY (organization_id) REFERENCES organization(id)
);