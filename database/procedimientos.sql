
-- PL\SQL

-- Alterar el fomato de fecha
ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD';
ALTER SESSION SET NLS_DATE_LANGUAGE = 'SPANISH';

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



    select * from usuario;