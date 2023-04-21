-- Seeding

-- Tabla para Roles de Usuario
-- Secuencia de Roles

CREATE SEQUENCE rol_seq
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    MAXVALUE 1000
    NOCYCLE
    CACHE 2;
commit;

-- Inserts
INSERT INTO rol VALUES (rol_seq.nextval, 'Administrador');
INSERT INTO rol VALUES (rol_seq.nextval, 'Gerencia');
INSERT INTO rol VALUES (rol_seq.nextval, 'Supervisor');
INSERT INTO rol VALUES (rol_seq.nextval, 'Representante de Servicio al Cliente');
INSERT INTO rol VALUES (rol_seq.nextval, 'Cajero');
commit;

select * from rol;
-- Modulos
-- Secuencia para ids de Modulos

CREATE SEQUENCE modulo_seq
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    MAXVALUE 1000
    NOCYCLE
    CACHE 2;
commit;





-- TODO: Modificar usuarios y cuentas agregando un campo para saber si estan activos o no.



