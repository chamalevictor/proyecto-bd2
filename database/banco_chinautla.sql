-- Grupo 2
-- Banco Chinautla


-- Cliente
CREATE TABLE tipo_cliente(
    id_tipo_cliente NUMBER,
    descripcion VARCHAR2(32),
    identificador VARCHAR2(32)
);
ALTER TABLE tipo_cliente MODIFY (id_tipo_cliente NOT NULL ENABLE);
ALTER TABLE tipo_cliente ADD CONSTRAINT pk_t_cliente PRIMARY KEY (id_tipo_cliente) ENABLE;

CREATE TABLE cliente(
    id_cliente NUMBER,
    nombre VARCHAR2(128),
    id_tipo_cliente NUMBER,
    correo VARCHAR2(64),
    fecha_nac DATE,
    no_identificacion NUMBER,
);
ALTER TABLE cliente MODIFY (id_cliente NOT NULL ENABLE);
ALTER TABLE cliente ADD CONSTRAINT pk_cliente PRIMARY KEY (id_cliente);
ALTER TABLE cliente ADD CONSTRAINT fk_cliente_tipo FOREIGN KEY (id_tipo_cliente)
REFERENCES tipo_cliente (id_tipo_cliente) ENABLE;


-- Agencia y Caja
CREATE TABLE agencia (
    id_agencia NUMBER,
    nombre VARCHAR2(100),
    ubicación VARCHAR2(100),
    telefono NUMBER
);
ALTER TABLE agencia MODIFY (id_agencia NOT NULL ENABLE);
ALTER TABLE agencia ADD CONSTRAINT pk_agencia PRIMARY KEY (id_agencia) ENABLE;

CREATE TABLE caja (
    id_caja NUMBER,
    numero_caja NUMBER,
    id_agencia NUMBER
);
ALTER TABLE caja MODIFY (id_caja NOT NULL ENABLE);
ALTER TABLE caja ADD CONSTRAINT pk_caja PRIMARY KEY (id_caja) ENABLE;
ALTER TABLE caja ADD CONSTRAINT fk_agencia FOREIGN KEY (id_agencia) 
REFERENCES agencia (id_agencia) ENABLE;

-- Crear Cuentas
CREATE TABLE interes (
    id_interes NUMBER,
    descripcion VARCHAR2(20),
    taza NUMBER
);
ALTER TABLE interes MODIFY (id_interes NOT NULL ENABLE);
ALTER TABLE interes ADD CONSTRAINT pk_interes PRIMARY KEY (id_interes) ENABLE;


CREATE TABLE tipo_cuenta (
    id_tipo_cuenta NUMBER,
    descripcion VARCHAR2(32),
    id_interes NUMBER
);
ALTER TABLE tipo_cuenta MODIFY (id_tipo_cuenta NOT NULL ENABLE);
ALTER TABLE tipo_cuenta ADD CONSTRAINT pk_t_cuenta PRIMARY KEY (id_tipo_cuenta)
ALTER TABLE tipo_cuenta ADD CONSTRAINT fk_interes FOREIGN KEY (id_interes)
REFERENCES interes (id_interes) ENABLE;


CREATE TABLE cuenta (
    id_tipo_cuenta NUMBER,
    id_agencia NUMBER,
    correlativo NUMBER,
    aleatorio NUMBER,
    id_cliente NUMBER,
    fecha_apertura DATE,
    activa NUMBER(1), -- 0 false, 1 true
    firma_1 VARCHAR2(128),
    firma_2 VARCHAR2(128),
    firma_2 VARCHAR2(128),
);
ALTER TABLE cuenta MODIFY (id_tipo_cuenta, id_agencia, correlativo, aleatorio NOT NULL ENABLE);
ALTER TABLE cuenta ADD CONSTRAINT pk_cuenta PRIMARY KEY (id_tipo_cuenta, id_agencia, correlativo, aleatorio)
ALTER TABLE cuenta ADD CONSTRAINT fk_cuenta_t_cuenta FOREIGN KEY (id_tipo_cuenta) 
REFERENCES tipo_cuenta (id_tipo_cuenta) ENABLE;
ALTER TABLE cuenta ADD CONSTRAINT fk_cuenta_agencia FOREIGN KEY (id_agencia)
REFERENCES agencia (id_agencia) ENABLE;
ALTER TABLE cuenta ADD CONSTRAINT fk_cuenta_cliente FOREIGN KEY (id_cliente)
REFERENCES cliente (id_cliente) ENABLE;

-- Documentos
CREATE TABLE tipo_documento /* Boleta, Cheque, Libreta */( 
    id_tipo_documento NUMBER,
    descripcion VARCHAR2(32)
);
ALTER TABLE tipo_documento MODIFY (id_tipo_documento NOT NULL ENABLE);
ALTER TABLE tipo_documento ADD CONSTRAINT pk_tipo_documento PRIMARY KEY (id_tipo_documento) ENABLE;


CREATE TABLE chequera (
    id_chequera NUMBER,
    bloqueado NUMBER(1) -- 0 false, 1 true.
);
ALTER TABLE chequera MODIFY (id_chequera NOT NULL ENABLE);
ALTER TABLE chequera ADD CONSTRAINT pk_chequera PRIMARY KEY (id_chequera) ENABLE;


CREATE TABLE documento (
    id_documento NUMBER,
    id_tipo_documento NUMBER,
    id_tipo_cuenta NUMBER,
    id_agencia NUMBER,
    id_correlativo NUMBER,
    id_aleatorio NUMBER,
    id_chequera NUMBER,
    bloqueado NUMBER(1) -- 0 false, 1 true.
);
ALTER TABLE documento MODIFY (id_documento NOT NULL ENABLE);
ALTER TABLE documento ADD CONSTRAINT pk_documento PRIMARY KEY (id_documento) ENABLE;
ALTER TABLE documento ADD CONSTRAINT fk_t_documento FOREIGN KEY (id_tipo_documento)
REFERENCES tipo_documento (id_tipo_documento) ENABLE;
ALTER TABLE documento ADD CONSTRAINT fk_t_cuenta FOREIGN KEY (id_tipo_cuenta)
REFERENCES cuenta (id_tipo_cuenta) ENABLE;
ALTER TABLE documento ADD CONSTRAINT fk_c_agencia FOREIGN KEY (id_agencia)
REFERENCES cuenta (id_agencia) ENABLE;
ALTER TABLE documento ADD CONSTRAINT fk_correlativo FOREIGN KEY (id_correlativo) 
REFERENCES cuenta (correlativo) ENABLE;
ALTER TABLE documento ADD CONSTRAINT fk_aleatorio FOREIGN KEY (id_aleatorio) 
REFERENCES cuenta (aleatorio) ENABLE;
ALTER TABLE documento ADD CONSTRAINT fk_chequera FOREIGN KEY (id_chequera) 
REFERENCES chequera (id_chequera) ENABLE;



-- Usuarios, permisos y modulos.
CREATE TABLE modulo (
    id_modulo NUMBER,
    descripcion VARCHAR2(32)
);
ALTER TABLE modulo MODIFY (id_modulo NOT NULL ENABLE) ;
ALTER TABLE modulo ADD CONSTRAINT pk_modulo PRIMARY KEY (id_modulo) ENABLE;


CREATE TABLE permiso (
    id_permiso NUMBER,
    descripcion VARCHAR2(32)
);
ALTER TABLE permiso MODIFY (id_permiso NOT NULL ENABLE);
ALTER TABLE permiso ADD CONSTRAINT pk_permiso PRIMARY KEY (id_permiso) ENABLE;

CREATE TABLE permiso_modulo (
    id_permiso NUMBER,
    id_modulo NUMBER
);
ALTER TABLE permiso_modulo MODIFY (id_permiso NOT NULL, id_modulo NOT NULL ENABLE);
ALTER TABLE permiso_modulo ADD CONSTRAINT pk_permiso_modulo PRIMARY KEY (id_permiso, id_modulo) ENABLE;
ALTER TABLE permiso_modulo ADD CONSTRAINT fk_pm_permiso FOREIGN KEY (id_permiso) 
REFERENCES permiso (id_permiso) ENABLE;
ALTER TABLE permiso_modulo ADD CONSTRAINT fk_pm_modulo FOREIGN KEY (id_modulo)
REFERENCES modulo (id_modulo) ENABLE;


CREATE TABLE rol (
    id_rol NUMBER,
    descripcion VARCHAR2(32)
);
ALTER TABLE rol MODIFY (id_rol NOT NULL ENABLE);
ALTER TABLE rol ADD CONSTRAINT pk_rol PRIMARY KEY (id_rol) ENABLE;


CREATE TABLE rol_permiso (
    id_rol NUMBER,
    id_permiso NUMBER,
);
ALTER TABLE rol_permiso MODIFY (id_rol NOT NULL, id_permiso NOT NULL ENABLE);
ALTER TABLE rol_permiso ADD CONSTRAINT pk_rp PRIMARY KEY (id_rol, id_permiso) ENABLE;
ALTER TABLE rol_permiso ADD CONSTRAINT fk_rp_rol FOREIGN KEY (id_rol)
REFERENCES rol (id_rol);
ALTER TABLE rol_permiso ADD CONSTRAINT fk_rp_permiso FOREIGN KEY (id_permiso)
REFERENCES permiso (id_permiso) ENABLE;


CREATE TABLE usuario (
    id_usuario NUMBER,
    nombre VARCHAR2(32),
    apellido VARCHAR2(32),
    correo VARCHAR2(64),
    id_rol NUMBER
);
ALTER TABLE usuario MODIFY (id_usuario NOT NULL ENABLE);
ALTER TABLE usuario ADD CONSTRAINT pk_usuario PRIMARY KEY (id_usuario) ENABLE;
ALTER TABLE usuario ADD CONSTRAINT fk_u_rol FOREIGN KEY (id_rol) 
REFERENCES rol (id_rol) ENABLE;


-- Operacion y estado.
CREATE TABLE estado (
    id_estado NUMBER, 
    descripcion VARCHAR2(32)
);
ALTER TABLE estado MODIFY (id_estado NOT NULL ENABLE);
ALTER TABLE estado ADD CONSTRAINT pk_estado PRIMARY KEY (id_estado) ENABLE;

CREATE TABLE tipo_operacion (
    id_tipo_operacion NUMBER,
    descripcion
);
ALTER TABLE tipo_operacion MODIFY (id_tipo_operacion NOT NULL ENABLE);
ALTER TABLE tipo_operacion ADD CONSTRAINT pk_tipo_operacion PRIMARY KEY (id_tipo_operacion) ENABLE;



CREATE TABLE operacion (
    id_operacion NUMBER,
    fecha DATE,
    id_tipo_operacion NUMBER,
    id_documento NUMBER,
    id_estado NUMBER,
    id_usuario NUMBER,
    id_caja NUMBER,
    descripcion VARCHAR2(64),
    monto NUMBER
);
ALTER TABLE operacion MODIFY (id_operacion NOT NULL ENABLE);
ALTER TABLE operacion ADD CONSTRAINT pk_operacion PRIMARY KEY (id_operacion) ENABLE;
ALTER TABLE operacion ADD CONSTRAINT fk_o_t_operacion FOREIGN KEY (id_tipo_operacion) 
REFERENCES tipo_operacion (id_tipo_operacion) ENABLE;
ALTER TABLE operacion ADD CONSTRAINT fk_o_documento FOREIGN KEY (id_documento)
REFERENCES documento (id_documento) ENABLE;
ALTER TABLE operacion ADD CONSTRAINT fk_o_estado FOREIGN KEY (id_estado)
REFERENCES estado (id_estado) ENABLE;
ALTER TABLE operacion ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario)
REFERENCES usuario (id_usuario) ENABLE;
ALTER TABLE operacion ADD CONSTRAINT fk_caja FOREIGN KEY (id_caja)
REFERENCES caja (id_caja) ENABLE;


-- Pago de planillas
CREATE TABLE planilla (
    id_planilla NUMBER,
    monto_inicial NUMBER,
    id_tipo_cuenta NUMBER,
    id_agencia NUMBER,
    id_correlativo NUMBER,
    id_aleatorio NUMBER,
    fecha_hora DATE
);
ALTER TABLE planilla MODIFY (id_planilla NOT NULL ENABLE);
ALTER TABLE planilla ADD CONSTRAINT pk_planilla PRIMARY KEY (id_planilla) ENABLE;
ALTER TABLE planilla ADD CONSTRAINT fk_p_t_cuenta FOREIGN KEY (id_tipo_cuenta) 
REFERENCES cuenta (id_tipo_cuenta) ENABLE;
ALTER TABLE planilla ADD CONSTRAINT fk_p_agencia FOREIGN KEY (id_agencia)
REFERENCES cuenta (id_agencia) ENABLE;
ALTER TABLE planilla ADD CONSTRAINT fk_p_correlativo FOREIGN KEY (id_correlativo)
REFERENCES cuenta (correlativo) ENABLE;
ALTER TABLE planilla ADD CONSTRAINT fk_p_aleatorio FOREIGN KEY (id_aleatorio)
REFERENCES cuenta (aleatorio) ENABLE;


CREATE TABLE planilla_operacion (
    id_planilla NUMBER,
    id_operacion NUMBER
);
ALTER TABLE planilla_operacion MODIFY (id_planilla NOT NULL, id_operacion NOT NULL ENABLE);
ALTER TABLE planilla_operacion ADD CONSTRAINT pk_planilla_operacion PRIMARY KEY (id_planilla, id_operacion) ENABLE;
ALTER TABLE planilla_operacion ADD CONSTRAINT fk_planilla FOREIGN KEY (id_planilla) 
REFERENCES planilla (id_planilla) ENABLE;
ALTER TABLE planilla_operacion ADD CONSTRAINT fk_operacion FOREIGN KEY (id_operacion)
REFERENCES operacion (id_operacion) ENABLE;


CREATE TABLE bitacora (
    id_registro NUMBER,
    fecha DATE,
    id_usuario NUMBER,
    id_tipo_operacion NUMBER,
    id_modulo NUMBER,
    id_agencia NUMBER,
    id_caja NUMBER
);
ALTER TABLE bitacora MODIFY (id_registro NOT NULL ENABLE);
ALTER TABLE bitacora ADD CONSTRAINT pk_bitacora PRIMARY KEY (id_registro) ENABLE;
ALTER TABLE bitacora ADD CONSTRAINT fk_b_usuario FOREIGN KEY (id_usuario)
REFERENCES usuario (id_usuario) ENABLE;
ALTER TABLE bitacora ADD CONSTRAINT fk_b_t_operacion FOREIGN KEY (id_tipo_operacion)
REFERENCES tipo_operacion (id_tipo_operacion) ENABLE;
ALTER TABLE bitacora ADD CONSTRAINT fk_b_modulo FOREIGN KEY (id_modulo) 
REFERENCES modulo (id_modulo) ENABLE;
ALTER TABLE bitacora ADD CONSTRAINT fk_b_agencia FOREIGN KEY (id_agencia)
REFERENCES agencia (id_agencia) ENABLE;
ALTER TABLE bitacora ADD CONSTRAINT fk_b_caja FOREIGN KEY (id_caja)
REFERENCES caja (id_caja) ENABLE;



-- Estados de cuenta por rango de fechas y cuenta
SELECT 
op.fecha, t_op.descripcion, t_do.descripcion, op.id_documento, es.descripcion, op.id_cheque, op.descripcion, op.monto
FROM
operacion op
INNER JOIN
tipo_operacion t_op
ON 
t_op.id_tipo_operacion = op.id_tipo_operacion
INNER JOIN
tipo_documento t_do
ON 
t_do.id_tipo_documento = op.id_tipo_documento
INNER JOIN
estado es
ON 
es.id_estado = op.id_estado
WHERE
op.id_cuenta = $1;




-- Resumen de cuentas por agencia: No. Cuenta, tipo, nombre, estatus, saldo disponible y en reserva.
SELECT
cu.id_cuenta, t_cu.descripcion, cl.nombre, cu.activa, (SELECT SUM(op.ammount)
        FROM operacion op
        WHERE cu.id_cuenta = op.id_cuenta
       )
FROM cuenta cu
INNER JOIN tipo_cuenta t_cu
ON  t_cu.id_tipo_cuenta = cu.id_tipo_cuenta
INNER JOIN cliente cl
ON cl.id_cliente = cu.id_cliente
WHERE cu.id_agencia = $1;


-- Resumen de pago de planilla: Fecha y hora, cuenta de origen, monto inicial, monto final.
SELECT 
pl.fecha_hora, 
FROM
INNER JOIN
ON
WHERE


-- Detalle pago de planilla: cuenta origen, cuenta destino, monto pagando, descripcion si algo no sale bien


-- Estadisticas de operaciones por agencia: fecha de operacion, tipo de operacion (credito/debito) y monto total.


-- pendientes
