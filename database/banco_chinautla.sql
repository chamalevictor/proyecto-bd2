-- Grupo 2
-- Banco Chinautla


-- Crear Cuentas
CREATE TABLE interes (
    id_interes NUMBER,
    descripcion VARCHAR2(20),
    taza NUMBER
);
ALTER TABLE interes MODIFY (id_interes NOT NULL ENABLE);
ALTER TABLE interes ADD CONSTRAINT pk_interes PRIMARY KEY (id_interes) ENABLE;



CREATE TABLE tipo_documento /* Boleta, Chequera, Libreta */( 
    id_tipo_documento NUMBER,
    descripcion VARCHAR2(32)
);
ALTER TABLE tipo_documento MODIFY (id_tipo_documento NOT NULL ENABLE);
ALTER TABLE tipo_documento ADD CONSTRAINT pk_tipo_documento PRIMARY KEY (id_tipo_documento) ENABLE;



CREATE TABLE documento (
    id_documento NUMBER,
    id_tipo_documento NUMBER,
    id_cuenta NUMBER,
    bloqueado BOOL
);
ALTER TABLE documento MODIFY (id_documento NOT NULL ENABLE);
ALTER TABLE documento ADD CONSTRAINT pk_documento PRIMARY KEY (id_documento) ENABLE;





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