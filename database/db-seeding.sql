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

-- Inserts
INSERT INTO rol VALUES (rol_seq.nextval, 'Administrador');
INSERT INTO rol VALUES (rol_seq.nextval, 'Gerencia');
INSERT INTO rol VALUES (rol_seq.nextval, 'Supervisor');
INSERT INTO rol VALUES (rol_seq.nextval, 'Representante de Servicio al Cliente');
INSERT INTO rol VALUES (rol_seq.nextval, 'Cajero');
commit;


-- Modulos
-- Secuencia para ids de Modulos

CREATE SEQUENCE modulo_seq
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    MAXVALUE 1000
    NOCYCLE
    CACHE 2;

INSERT INTO modulo VALUES (modulo_seq.nextval, 'Administracion_Usuarios');
INSERT INTO modulo VALUES (modulo_seq.nextval, 'Administracion_Agencias');
INSERT INTO modulo VALUES (modulo_seq.nextval, 'Servicio_Al_cliente');
INSERT INTO modulo VALUES (modulo_seq.nextval, 'Operaciones');
INSERT INTO modulo VALUES (modulo_seq.nextval, 'Reportes');
commit;

-- Permisos
-- Secuencia de id Permisos
CREATE SEQUENCE permiso_seq
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    MAXVALUE 100
    NOCYCLE
    CACHE 2;

INSERT INTO permiso VALUES (permiso_seq.nextval, 'Administrador de sistema');
INSERT INTO permiso VALUES (permiso_seq.nextval, 'Gerencia');
INSERT INTO permiso VALUES (permiso_seq.nextval, 'Supervisor');
INSERT INTO permiso VALUES (permiso_seq.nextval, 'Servicio al cliente');
INSERT INTO permiso VALUES (permiso_seq.nextval, 'Operaciones');
commit;

-- Permisos para Modulos
INSERT INTO permiso_modulo VALUES (1,1);
INSERT INTO permiso_modulo VALUES (2,2);
INSERT INTO permiso_modulo VALUES (2,5);
INSERT INTO permiso_modulo VALUES (3,5);
INSERT INTO permiso_modulo VALUES (3,3);
INSERT INTO permiso_modulo VALUES (3,4);
INSERT INTO permiso_modulo VALUES (4,3);
INSERT INTO permiso_modulo VALUES (5,4);
commit;

-- Asociar Permisos de cada Rol
INSERT INTO rol_permiso VALUES (1, 1);
INSERT INTO rol_permiso VALUES (2, 2);
INSERT INTO rol_permiso VALUES (3, 3);
INSERT INTO rol_permiso VALUES (4, 4);
INSERT INTO rol_permiso VALUES (5, 5);
commit;

-- Tipo Cliente
INSERT INTO tipo_cliente VALUES (1, 'Individual', 'DPI');
INSERT INTO tipo_cliente VALUES (2, 'Comercial', 'Patente de Comercio');
commit;

-- Tipo Documento
INSERT INTO tipo_documento VALUES (1, 'Boleta');
INSERT INTO tipo_documento VALUES (2, 'Cheque');
INSERT INTO tipo_documento VALUES (3, 'Libreta');
commit;

-- Intereses
INSERT INTO interes VALUES (1, 'Intereses de Ahorros', 0.03);
INSERT INTO interes VALUES (2, 'Intereses Monetarios', 0.015);
commit;

-- Tipos de Cuenta
INSERT INTO tipo_cuenta VALUES (1, 'Ahorro', 1);
INSERT INTO tipo_cuenta VALUES (2, 'Monetaria', 2);
commit;

-- Tipos de Operaciones
INSERT INTO tipo_operacion VALUES (1, 'Retiro');
INSERT INTO tipo_operacion VALUES (2, 'Deposito');
commit;

-- Estados de una Operacion
-- Secuencia de id de Estado
CREATE SEQUENCE estado_seq
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    MAXVALUE 100
    NOCYCLE
    CACHE 2;

INSERT INTO estado VALUES (estado_seq.nextval, 'Exitosa');
INSERT INTO estado VALUES (estado_seq.nextval, 'Fallida');
INSERT INTO estado VALUES (estado_seq.nextval, 'Interrumpida');
commit;


-- Secuencia ids de usuarios
CREATE SEQUENCE usuario_seq
    INCREMENT BY 1
    START WITH 2
    MINVALUE 1
    MAXVALUE 2000
    NOCYCLE
    CACHE 2;

-- Secuencia ids de agencias
CREATE SEQUENCE agencia_seq
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    MAXVALUE 100
    NOCYCLE
    CACHE 2;

-- Secuencia ids de cajas
CREATE SEQUENCE caja_seq
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    MAXVALUE 500
    NOCYCLE
    CACHE 2;


-- Secuencia ids de cajas
CREATE SEQUENCE caja_seq
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    MAXVALUE 500
    NOCYCLE
    CACHE 2;


