-- Grupo 2
-- Banco Chinautla


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





CREATE TABLE tipo_documento /* Boleta, Chequera, Libreta prueba para ronald */( 
    id_tipo_documento NUMBER,
    descripcion VARCHAR2(32)
);
ALTER TABLE tipo_documento MODIFY (id_tipo_documento NOT NULL ENABLE);
ALTER TABLE tipo_documento ADD CONSTRAINT pk_tipo_documento PRIMARY KEY (id_tipo_documento) ENABLE;



CREATE TABLE documento (
    id_documento NUMBER,
    id_tipo_documento NUMBER,
    id_cuenta NUMBER,
    bloqueado NUMBER(1) -- 0 false, 1 true.
);
ALTER TABLE documento MODIFY (id_documento NOT NULL ENABLE);
ALTER TABLE documento ADD CONSTRAINT pk_documento PRIMARY KEY (id_documento) ENABLE;
ALTER TABLE documento ADD CONSTRAINT fk_t_documento FOREIGN KEY (id_tipo_documento)
REFERENCES tipo_documento (id_tipo_documento) ENABLE;

CREATE TABLE tipo_operacion (
    id_tipo_operacion NUMBER,
    descripcion VARCHAR2(32),
);




CREATE TABLE ();





-- EStados de cuenta por rango de fechas y cuenta
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