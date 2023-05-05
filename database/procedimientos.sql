
-- PL\SQL

-- Alterar el fomato de fecha
ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD';
ALTER SESSION SET NLS_DATE_LANGUAGE = 'SPANISH';

CREATE OR REPLACE TRIGGER CHANGE_DATE_FORMAT
AFTER LOGON ON DATABASE
CALL DBMS_SESSION.SET_NLS('NLS_DATE_FORMAT','"YYYY-MM-DD"');
CALL DBMS_SESSION.SET_NLS('NLS_DATE_LANGUAGE','"SPANISH"');
/

-- Crear un usuario nuevo y asignar rol
CREATE
OR REPLACE PROCEDURE CREAR_USUARIO(
nombre_usuario VARCHAR2,
apellido_usuario VARCHAR2,
correo_usuario VARCHAR2,
rol_usuario NUMBER,
fecha_nac_usuario VARCHAR2,
token VARCHAR2,
msg OUT VARCHAR2,
exito OUT NUMBER)
AS
    usuario_existente EXCEPTION;
    nuevo_usuario
NUMBER;
BEGIN
SELECT COUNT(*)
INTO nuevo_usuario
FROM usuario
WHERE correo = correo_usuario;

-- Verificar si el usuario ya existe
IF
(nuevo_usuario = 1)
    THEN
        RAISE usuario_existente;

-- Si no existe, lo registra
ELSE
        INSERT INTO usuario
        VALUES (usuario_seq.nextval, nombre_usuario, apellido_usuario, correo_usuario, rol_usuario, 0, token, TO_DATE(fecha_nac_usuario, 'YYYY-MM-DD'));
commit;
msg := 'Se ha registrado el nuevo usuario con exito';
        exito := 1;
END IF;

EXCEPTION
    WHEN usuario_existente THEN
        msg := 'El usuario ya se encuentra registrado';
        exito:= 0;

WHEN OTHERS THEN
        msg := SQLERRM;
END;
/

-- Confirmar Usuario
CREATE OR REPLACE PROCEDURE CONFIRMAR_USUARIO(contrasena_usuario VARCHAR, token VARCHAR2, msg OUT VARCHAR2, exito OUT NUMBER)
AS
usuario_no_existe EXCEPTION;
usuario_existe NUMBER;

BEGIN
    SELECT COUNT(*) INTO usuario_existe FROM usuario WHERE contrasena = token;

    -- Verificar si el usuario existe
IF
(usuario_existe = 0)
    THEN
        RAISE usuario_no_existe;

-- Si existe existe, lo confirma
ELSE
        UPDATE USUARIO SET contrasena = contrasena_usuario, activo = 1 WHERE contrasena = token;
commit;
msg := 'Se ha confirmado la cuenta con exito';
        exito := 1;
END IF;

    EXCEPTION
    WHEN usuario_no_existe THEN
        msg := 'El usuario no se encuentra registrado';
        exito:= 0;

WHEN OTHERS THEN
        msg := 'Error: ' || SQLERRM;
                        
END;
/



-- Autenticar Usuario
CREATE OR REPLACE PROCEDURE AUTENTICAR_USUARIO(
correo_usuario VARCHAR2,
id_de_usuario OUT NUMBER,
contrasena OUT VARCHAR2,
nombre_usuario OUT VARCHAR2,
rol_usuario OUT NUMBER,
msg OUT VARCHAR2,
exito OUT NUMBER)
AS
    usuario_no_existe EXCEPTION;
    usuario_no_activo EXCEPTION;
    usuario_record usuario%ROWTYPE;

BEGIN

    SELECT * INTO usuario_record FROM usuario WHERE correo = correo_usuario;

 -- Verificar si el usuario esta activo

IF usuario_record.correo IS NULL THEN
        RAISE usuario_no_existe;
ELSIF
(usuario_record.activo = 0)
    THEN
        RAISE usuario_no_activo;

-- Si existe existe, devuelve el password
ELSE
        id_de_usuario := usuario_record.id_usuario;
        contrasena := usuario_record.contrasena;
        nombre_usuario := usuario_record.nombre;
        rol_usuario := usuario_record.id_rol;
        msg := 'Se ha autenticado con exito';
        exito := 1;
END IF;

    EXCEPTION
    WHEN usuario_no_activo THEN
            msg := 'La cuenta no se encuentra activa';
        exito:= 0;
    WHEN usuario_no_existe THEN
            msg := 'No existe una cuenta creada para este usuario';
        exito:= 0;
    WHEN NO_DATA_FOUND THEN
            msg := 'No existe una cuenta creada para este usuario';
        exito:= 0;
WHEN OTHERS THEN
        msg := 'Error: ' || SQLERRM;
END;
/


-- Crear Agencia
CREATE OR REPLACE PROCEDURE CREAR_AGENCIA (nombre_agencia VARCHAR2, ubicacion_agencia VARCHAR2, telefono_agencia NUMBER, msg OUT VARCHAR2, exito OUT NUMBER)
AS
BEGIN
    SAVEPOINT inicio;
    INSERT INTO agencia VALUES (agencia_seq.nextval, nombre_agencia, ubicacion_agencia, telefono_agencia);
    commit;
        msg := 'Agencia creada exitosamente';
        exito := 1;


EXCEPTION
    WHEN OTHERS THEN
    ROLLBACK TO inicio;
        msg := 'Ocurrio un problema creando la agencia';
        exito := 0;
    RAISE;
END;


-- Ingresando las primeras 2 agencias
declare
    msg VARCHAR2(100);
    exito NUMBER;
    begin
    CREAR_AGENCIA('Central', '4 Av. 5-64 Zona 1, Guatemala', 22550000, msg, exito);
    CREAR_AGENCIA('Portales', 'Km. 5 Carretera al Atlantico CC. Portales', 24240000, msg, exito);
    DBMS_OUTPUT.PUT_LINE(msg);
end;



-- Crear Caja
CREATE OR REPLACE PROCEDURE CREAR_CAJA (id_agencia_caja NUMBER, msg OUT VARCHAR2, exito OUT NUMBER)
AS
    actual NUMBER;

BEGIN
    SAVEPOINT inicio_caja;
    SELECT COUNT(*) INTO actual FROM caja WHERE id_agencia = id_agencia_caja;
    INSERT INTO caja VALUES (caja_seq.nextval, actual+1, id_agencia_caja);
    commit;
    msg := 'Se ha creado la caja número: ' || TO_CHAR(actual+1);
    exito := 1;

EXCEPTION
    WHEN OTHERS THEN
    ROLLBACK TO inicio_caja;
        msg := 'Ocurrio un problema creando la agencia';
        exito := 0;
    RAISE;
END;





CREATE OR REPLACE PROCEDURE CREAR_CLIENTE(
id_cliente_nuevo NUMBER,
nombre_cliente VARCHAR2,
tipo_cliente VARCHAR2,
correo_cliente VARCHAR2,
fecha_nac_cliente VARCHAR2,
msg OUT VARCHAR2,
exito OUT NUMBER)
AS
    cliente_existe_exception EXCEPTION;
    cliente_existe NUMBER;

BEGIN
    SAVEPOINT inicio;
    SELECT COUNT(*) INTO cliente_existe FROM cliente WHERE no_identificacion = id_cliente_nuevo;

    IF cliente_existe = 1 THEN
        RAISE cliente_existe_exception;

    ELSE

        INSERT INTO cliente VALUES(cliente_seq.nextval, nombre_cliente, tipo_cliente, correo_cliente, TO_DATE(fecha_nac_cliente, 'YYYY-MM-DD'), id_cliente_nuevo);
        COMMIT;
        msg := 'Cliente registrado exitosamente';
        exito := 1;
    END IF;

EXCEPTION
    WHEN cliente_existe_exception THEN
        msg := 'El usuario ya se encuentra registrado';
        exito:= 0;
    WHEN OTHERS THEN
    ROLLBACK TO inicio;
    RAISE;

    END;


-- Crear una cuenta para clientes
CREATE OR REPLACE PROCEDURE CREAR_CUENTA(
cliente NUMBER,
tipo_cuenta NUMBER,
agencia NUMBER,
firma1_cuenta VARCHAR2,
firma2_cuenta VARCHAR2,
firma3_cuenta VARCHAR2,
msg OUT VARCHAR2,
exito OUT NUMBER)
AS

    cliente_no_existe EXCEPTION;
    cliente_existente NUMBER;
    random NUMBER := ROUND(dbms_random.value(0,9));

BEGIN

    SAVEPOINT inicio_crear_cuenta;

    SELECT COUNT(*) INTO cliente_existente FROM cliente WHERE id_cliente = cliente;

    IF cliente_existente = 0 THEN
        RAISE cliente_no_existe;
    ELSE
        INSERT INTO cuenta
        VALUES (
                tipo_cuenta,
                agencia,
                ((SELECT COUNT(*) FROM cuenta WHERE id_tipo_cuenta = tipo_cuenta AND id_agencia = agencia)+1),
                random,
                cliente,
                SYSDATE,
                0,
                firma1_cuenta,
                firma2_cuenta,
                firma3_cuenta);
        commit;
        msg := 'La cuenta se ha creado exitosamente';
        exito:= 1;
    END IF;

    EXCEPTION
    WHEN cliente_no_existe THEN
        msg := 'No se encuentran registros del cliente';
        exito:= 0;
    WHEN OTHERS THEN
    ROLLBACK TO inicio_crear_cuenta;
    RAISE;
END;








-- template de pruebas
declare
    msg VARCHAR2(100);
    exito NUMBER;
    begin
        CREAR_CUENTA(
            4,
            1,
            2,
            'Firma 1',
            'Firma 2',
            'Firma 3',
            msg,
            exito
            );
        DBMS_OUTPUT.PUT_LINE(msg);
    end;







declare
    msg VARCHAR2(100);
    exito NUMBER;
    begin

    end;

select * from cuenta;

commit;    -- Template
CREATE OR REPLACE PROCEDURE (msg OUT, exito OUT NUMBER)
AS
BEGIN
END;


    select * from cuenta;