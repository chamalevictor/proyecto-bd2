-- Grupo 2
-- Banco Chinautla


CREATE TABLE interes (
    id_interes NUMBER,
    descripcion VARCHAR2(20),
    taza NUMBER
);

/* Ejemplo de alter table:
ALTER TABLE CONTINENTE MODIFY (CODIGO NOT NULL ENABLE);
ALTER TABLE CONTINENTE ADD CONSTRAINT PK_CONTINENTE PRIMARY KEY (CODIGO) ENABLE;
*/

CREATE TABLE documento (
    id_documento NUMBER,
);

CREATE TABLE tipo_cuenta (
    id_tipo_cuenta NUMBER,
    descripcion VARCHAR2(32),
    id_documento NUMBER,
    id_interes NUMBER
);

CREATE TABLE tipo_operacion (
    id_tipo_operacion NUMBER,
    descripcion VARCHAR2(32),
);


CREATE TABLE ();
CREATE TABLE ();
CREATE TABLE ();
CREATE TABLE ();
